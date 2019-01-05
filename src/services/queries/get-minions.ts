import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler, IPagedResult } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetMinions {

    export class Request extends BaseRequest<Result> {

    }

    export class Result implements IPagedResult<Model> {
        public page: number;
        public size: number;
        public count: number;
        public result: any[];
    }

    export class Model {
        public id: string;
        public lastAuthenticated: string;
        public lastSeen: string;
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            return this.client
                .withPath("api/v1/minions")
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
