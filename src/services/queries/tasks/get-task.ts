import { autoinject } from "aurelia-framework";
import { BaseRequest, IRequestHandler } from "../../mediator";
import { KatalyeClient } from "../../../infrastructure/katalye-client";

export namespace GetTask {

    export class Request extends BaseRequest<Result> {
        public id: string;
    }

    export class Result {
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
                .withPath(`/api/v1/tasks/${request.id}`)
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
