import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetServerSettings {

    export class Request extends BaseRequest<Result> {
    }

    export class Result {
        public settings: Map<string, Setting>;
    }

    export class Setting {
        public key: string;
        public effectiveValue: string;
        public dbValue?: string;
        public provider: string;
        public version?: number;
        public lastUpdated: string;
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
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
