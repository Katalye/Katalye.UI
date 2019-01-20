import { autoinject, bindable, observable } from "aurelia-framework";
import { GetJobMinions } from "../../../services/queries/get-job-minions";
import { Router } from "aurelia-router";
import { Mediator } from "../../../services/mediator";
import { GetJob } from "../../../services/queries/get-job";

@autoinject
export class JobMinions {

    private router: Router;
    private mediator: Mediator;

    @bindable
    public jobId: string;

    @observable
    public page: number;

    public loading: boolean = true;
    public listLoading: boolean = true;

    public jobMinions: GetJobMinions.Result;
    public job: GetJob.Result;

    public constructor(router: Router, mediator: Mediator) {
        this.router = router;
        this.mediator = mediator;
    }

    public async jobIdChanged() {
        this.page = 1;
        if (this.jobId) {
            this.loading = true;
            this.job = await this.mediator
                .for(GetJob.Request)
                .handle<GetJob.Result>({
                    jid: this.jobId
                });
            this.loading = false;
        }
        await this.refresh();
    }

    public async pageChanged() {
        this.refresh();
    }

    private async refresh() {
        if (this.jobId) {
            this.listLoading = true;
            this.jobMinions = await this.mediator
                .for(GetJobMinions.Request)
                .handle<GetJobMinions.Result>({
                    page: this.page,
                    jid: this.jobId
                });
            this.listLoading = false;
        }
    }
}
