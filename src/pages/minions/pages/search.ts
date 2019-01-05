import { Mediator } from "./../../../services/mediator";
import { autoinject, bindable } from "aurelia-framework";
import { GetMinions } from "../../../services/queries/get-minions";

@autoinject
export class Search {

    @bindable
    public page: number = 1;

    private mediator: Mediator;
    public minions: GetMinions.Result;

    public constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public activate(params: Partial<Search>) {
        Object.assign(this, params);
    }

    public async attached() {
        await this.refresh();
    }

    public async pageChanged() {
        await this.refresh();
    }

    public async refresh() {
        this.minions = await this.mediator
            .for(GetMinions.Request)
            .handle<GetMinions.Result>({
                page: this.page
            });
    }
}
