import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetSearchGrains {

    export class Request extends BaseRequest<Result> {
        public search: Array<{ Key: string, Value: string }>;
    }

    export class Result {
        public grainPaths: string[];
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            let keyValues = (request.search || []).map(x => `${x.Key},${x.Value}`);
            return this.client
                .withPath("/api/v1/minions/_search-grains")
                .withQuery({
                    search: keyValues
                })
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
