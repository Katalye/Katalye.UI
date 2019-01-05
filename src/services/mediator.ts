import { autoinject, Container } from "aurelia-framework";
import { Logger, getLogger } from "aurelia-logging";

export class BaseRequest<TResponse> {
    protected hidden: boolean;
}

export interface IRequestHandler<TRequest extends BaseRequest<TResponse>, TResponse> {
    handle(request: TRequest): Promise<TResponse>;
}

@autoinject
export class Mediator {

    private readonly logger: Logger = getLogger("mediator");

    private modules: { name: string, module: string, handler: any, request: any }[];
    private container: Container;

    public constructor(container: Container) {

        this.container = container;

        let modules = this.scan();
        this.modules = modules;
    }

    private scan() {

        this.logger.debug("Begining scan for mediator handlers.");

        let context = require.context("./", true, /.ts$/);

        let modules = context.keys().filter(x => !x.endsWith("mediator.ts")).map(moduleId => {

            let module = context(moduleId);

            let namespaces = [];
            // tslint:disable-next-line:forin
            for (let propertyName in module) {
                namespaces.push(propertyName);
            }

            if (namespaces.length != 1) {
                this.logger.warn(`No single namespace was detected within module '${moduleId}', will skip for discovery.`);
                return null;
            }

            let name = namespaces[0];
            let namespace = module[name];

            if (namespace instanceof Function) {
                this.logger.warn(`The only member called ${name} of module ${moduleId} does not appear to be a namespace, will skip for discovery.`);
                return null;
            }
            if (!("Handler" in namespace)) {
                this.logger.warn(`A class called Handler could not be found within namespace ${name} for module ${moduleId}, will skip for discovery.`);
                return null;
            }
            if (!("Request" in namespace)) {
                this.logger.warn(`A class called Request could not be found within namespace ${name} for module ${moduleId}, will skip for discovery.`);
                return null;
            }

            this.logger.debug(`Discovered ${name}.Handler within ${moduleId}.`);

            return { name, module: moduleId, handler: namespace.Handler, request: namespace.Request };
        }).filter(x => x != null);

        this.logger.debug(`Scan completed, ${modules.length} handlers were discovered.`, modules);

        return modules;
    }

    public for<TRequest extends BaseRequest<TResponse>, TResponse>(request: new () => TRequest): Handler<TRequest, TResponse> {

        let modules = this.modules.filter(x => request === x.request);
        if (modules.length == 0) {
            this.logger.warn(`Could not find handler for requested type.`);
            throw new Error(`Could not find handler mapping.`);
        }
        if (modules.length > 1) {
            this.logger.warn(`Discovered multiple handlers for request type, this will throw in the future.`);
        }

        let module = modules[0];

        this.logger.debug(`Resolved handler ${module.name}.`);

        let handler: IRequestHandler<TRequest, TResponse> = this.container.get(module.handler);
        return new Handler(module.name, handler);
    }
}

export class Handler<TRequest extends BaseRequest<TResponse>, TResponse> {

    private readonly logger: Logger = getLogger("mediator-handler");
    private handler: IRequestHandler<TRequest, TResponse>;
    private handlerName: string;

    public constructor(handlerName: string, handler: IRequestHandler<TRequest, TResponse>) {
        this.handlerName = handlerName;
        this.handler = handler;
    }

    public async handle<T>(request: Partial<TRequest>): Promise<T & TResponse> {
        this.logger.debug(`Executing handler ${this.handlerName}.`);
        let result;
        try {
            result = await (this.handler.handle(request as TRequest) as Promise<T & TResponse>);
            this.logger.debug(`Handler ${this.handlerName} executed successfully.`, result);
        } catch (error) {
            this.logger.error(`Handler ${this.handlerName} executed with failure.`, error);
            throw error;
        }
        return result;
    }
}

export interface IPagedRequest {
    page: number;
    size: number;
}

export interface IPagedResult<T> {
    page: number;
    size: number;
    count: number;
    pages: number;
    result: T[];
}
