import { Mediator } from "./../../../services/mediator";
import { autoinject } from "aurelia-framework";
import { GetMinions } from "../../../services/queries/get-minions";

@autoinject
export class Search {

    private mediator: Mediator;
    public minions: GetMinions.Result;

    public constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public async attached() {
        this.minions = await this.mediator
            .for(GetMinions.Request)
            .handle<GetMinions.Result>({});
    }
}
