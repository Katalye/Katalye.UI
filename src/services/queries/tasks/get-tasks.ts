import { autoinject } from "aurelia-framework";
import { BaseRequest, IPagedRequest, IPagedResult, IRequestHandler } from "../../mediator";
import { KatalyeClient } from "../../../infrastructure/katalye-client";

export namespace GetTasks {

    export class Request extends BaseRequest<Result> implements IPagedRequest {
        public status: string[];
        public page: number;
        public size: number;
    }

    export class Result implements IPagedResult<Model> {
        public pages: number;
        public page: number;
        public size: number;
        public count: number;
        public result: Model[];
    }

    export class Model {
        public id: string;
        public tag: string;
        public metadata: any;
        public status: string;
        public startedOn: string;
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            return this.client
                .withPath(`/api/v1/tasks`)
                .withMethod("GET")
                .withQuery(request)
                .fetch<Result>();
        }
    }
}
