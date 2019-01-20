import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler, IPagedRequest, IPagedResult } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetMinionJobs {

    export class Request extends BaseRequest<Result> implements IPagedRequest {
        public page: number;
        public size: number;
        public id: string;
    }

    export class Result implements IPagedResult<Model> {
        public pages: number;
        public page: number;
        public size: number;
        public count: number;
        public result: Model[];
    }

    export class Model {
        public jid: string;
        public function: string;
        public success: boolean;
        public returnedOn: boolean;
        public arguments: string[];
        public createdOn: string;
        public creationEventExists: boolean;
        public targetType: string;
        public targets: string;
        public user: string;
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        public client: KatalyeClient;

        public constructor(client: KatalyeClient) {
            this.client = client;
        }

        public async handle(request: Request): Promise<Result> {
            let response = await this.client
                .withPath(`/api/v1/minions/${request.id}/jobs`)
                .withMethod("GET")
                .withQuery({
                    page: request.page,
                    size: request.size,
                })
                .fetch<Result>();

            for (let r of response.result) {
                r.arguments = (r.arguments || []).filter(x => x);
            }

            return response;
        }
    }
}
