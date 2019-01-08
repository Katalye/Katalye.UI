import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetMinion {

    export class Request extends BaseRequest<Result> {
        public id: string;
    }

    export class Result {
        public id: string;
        public lastAuthentication: string;
        public lastSeen: string;
        public grains: Map<string, string[]>;
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            return this.client
                .withPath(`api/v1/minions/${request.id}`)
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
