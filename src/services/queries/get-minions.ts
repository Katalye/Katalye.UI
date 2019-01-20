import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler, IPagedResult, IPagedRequest } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetMinions {

    export class Request extends BaseRequest<Result> implements IPagedRequest {
        public page: number;
        public size: number;
        public grainSearch: Array<{ Key: string, Value: string }>;
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
        public lastAuthenticated: string;
        public lastSeen: string;
        public ipV4Addresses: string[];
        public master: string[];
        public os: string[];
        public saltMinionVersion: string[];
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            let keyValues = (request.grainSearch || [])
                .filter(x => x.Value)
                .map(x => `${x.Key},${x.Value}`);
            return this.client
                .withPath("/api/v1/minions")
                .withQuery({
                    page: request.page,
                    size: request.size,
                    grainSearch: keyValues
                })
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
