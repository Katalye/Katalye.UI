import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler, IPagedResult, IPagedRequest } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetJobMinions {

    export class Request extends BaseRequest<Result> implements IPagedRequest {
        public jid: string;
        public page: number;
        public size: number;
    }

    export class Result implements IPagedResult<Model> {
        public pages: number;
        public page: number;
        public size: number;
        public count: number;
        public result: Model[];
    }

    export class Model {
        public minionId: string;
        public returnedAt: string;
        public success: boolean;
        public returnCode: number;
        public successCount: number;
        public failedCount: number;
        public changedCount: number;
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public handle(request: Request): Promise<Result> {
            return this.client
                .withPath("api/v1/jobs")
                .withMethod("GET")
                .withQuery({
                    page: request.page,
                    size: request.size,
                    jid: request.jid
                })
                .fetch<Result>();
        }
    }
}
