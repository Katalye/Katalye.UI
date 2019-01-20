import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler } from "./../mediator";
import { autoinject } from "aurelia-framework";

export namespace GetMinionJob {

    export class Request extends BaseRequest<Result> {
        public id: string;
        public jid: string;
    }

    export class Result {
        public arguments: string[];
        public createdOn: string;
        public creationEventExists: boolean;
        public function: string;
        public jid: string;
        public minions: string[];
        public missingMinions: string[];
        public returnData: any;
        public returnedOn: string;
        public success: boolean;
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
                .withPath(`/api/v1/minions/${request.id}/jobs/${request.jid}`)
                .withMethod("GET")
                .fetch<Result>();

            response.arguments = (response.arguments || []).filter(x => x);

            return response;
        }
    }
}
