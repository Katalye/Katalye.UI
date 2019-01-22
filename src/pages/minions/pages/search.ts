import { Mediator } from "./../../../services/mediator";
import { autoinject, bindable } from "aurelia-framework";
import { GetMinions } from "../../../services/queries/get-minions";
import { Router } from "aurelia-router";

@autoinject
export class Search {

    private mediator: Mediator;
    private router: Router;

    @bindable({ changeHandler: "refresh" })
    public page: number = 1;

    @bindable({ changeHandler: "refresh" })
    public os: string;

    @bindable({ changeHandler: "refresh" })
    public ipv4: string;

    @bindable({ changeHandler: "refresh" })
    public master: string;

    @bindable({ changeHandler: "refresh" })
    public minionId: string;

    public minions: GetMinions.Result;
    public selectedValue: string;

    public constructor(mediator: Mediator, router: Router) {
        this.mediator = mediator;
        this.router = router;
    }

    public activate(params: Partial<Search>) {
        Object.assign(this, params);
    }

    public async attached() {
        await this.refresh();
    }

    public async refresh() {
        this.minions = await this.mediator
            .for(GetMinions.Request)
            .handle<GetMinions.Result>({
                page: this.page,
                grainSearch: [
                    { Key: "os", Value: this.os },
                    { Key: "ipv4", Value: this.ipv4 },
                    { Key: "master", Value: this.master },
                    { Key: "id", Value: this.minionId },
                ]
            });
    }

    public async routeToMinion(minionId: string) {
        await this.router.navigateToRoute("minion", { minionId });
    }
}
