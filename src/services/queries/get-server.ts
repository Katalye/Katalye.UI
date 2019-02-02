import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetServer {

    export class Request extends BaseRequest<Result> {
    }

    export class Result {
        public apiVersion: string;
        public appliedMigrations: string[];
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            return this.client
                .withPath(`/api/v1/server`)
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
