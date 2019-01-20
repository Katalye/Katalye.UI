import { autoinject, bindable, observable } from "aurelia-framework";
import { GetJobMinions } from "../../../services/queries/get-job-minions";
import { Router } from "aurelia-router";
import { Mediator } from "../../../services/mediator";

@autoinject
export class JobMinions {

    private router: Router;
    private mediator: Mediator;

    @bindable
    public jobId: string;

    @observable
    public page: number;

    public jobMinions: GetJobMinions.Result;

    public constructor(router: Router, mediator: Mediator) {
        this.router = router;
        this.mediator = mediator;
    }

    public async jobIdChanged() {
        this.page = 1;
        this.refresh();
    }

    public async pageChanged() {
        this.refresh();
    }

    private async refresh() {
        if (this.jobId) {
            this.jobMinions = await this.mediator
                .for(GetJobMinions.Request)
                .handle<GetJobMinions.Result>({
                    page: this.page,
                    jid: this.jobId
                });
        }
    }
}
