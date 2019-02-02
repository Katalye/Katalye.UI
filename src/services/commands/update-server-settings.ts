import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace UpdateServerSettings {

    export class Request extends BaseRequest<Result> {
    }

    export class Result {
        public settings: Map<string, Setting>;
    }

    export class Setting {
        public key: string;
        public value: string;
        public version: number;
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            return this.client
                .withPath(`/api/v1/server/settings`)
                .withMethod("PUT")
                .fetch<Result>(request);
        }
    }
}
