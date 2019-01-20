import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler, IPagedResult, IPagedRequest } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetJob {

    export class Request extends BaseRequest<Result> {
        public jid: string;
    }

    export class Result {
        public jid: string;
        public function: string;
        public arguments: string[];
        public seenAt: string;
        public completedCount: number;
        public succeededCount: number;
        public hasCreationEvent: string;
        public user: string;
        public targets: string[];
        public minions: string[];
        public missingMinions: string[];
        public targetType: string;
        public createdOn: string;
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            return this.client
                .withPath(`/api/v1/jobs/${request.jid}`)
                .withMethod("GET")
                .fetch<Result>();
        }
    }
}
