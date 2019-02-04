import { KatalyeClient } from "./../../infrastructure/katalye-client";
import { BaseRequest, IRequestHandler } from "./../mediator";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

export namespace RefreshMinionGrains {

    export class Request extends BaseRequest<Result> {
        public id: string;
    }

    export class Result {
        public taskId: string;
    }

    @autoinject
    export class Handler implements IRequestHandler<Request, Result> {

        private client: KatalyeClient;
        private ea: EventAggregator;

        public constructor(client: KatalyeClient, ea: EventAggregator) {
            this.client = client;
            this.ea = ea;
        }

        public async handle(request: Request): Promise<Result> {
            let result = await this.client
                .withPath(`/api/v1/minions/${request.id}/grains/refresh`)
                .withMethod("POST")
                .fetch<Result>(request);

            this.ea.publish("katalye:tasks:discovered", result.taskId);

            return result;
        }
    }
}
