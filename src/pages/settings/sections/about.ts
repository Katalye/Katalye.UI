import { autoinject } from "aurelia-framework";
import { Mediator } from "../../../services/mediator";
import { GetServer } from "../../../services/queries/get-server";

@autoinject
export class About {
    private mediator: Mediator;
    public about: GetServer.Result;

    public constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public async activate() {
        this.about = await this.mediator
            .for(GetServer.Request)
            .handle<GetServer.Result>({});
    }

}
