import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetSearchGrainValues {

    export class Request extends BaseRequest<Result> {
        public path: string;
        public search: string;
    }

    export class Result {
        public values: string[];
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            return this.client
                .withPath("api/v1/minions/_search-grain-values")
                .withQuery({
                    path: request.path,
                    search: request.search
                })
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
