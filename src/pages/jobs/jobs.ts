import "./jobs.scss";
import { autoinject, observable } from "aurelia-framework";
import { Mediator } from "../../services/mediator";
import { GetJobs } from "../../services/queries/get-jobs";
import { Router } from "aurelia-router";

@autoinject
export class Jobs {

    private router: Router;
    private mediator: Mediator;

    public jobs: GetJobs.Result;
    @observable
    public page: number;

    @observable
    public selectedJobId: string;
    @observable
    public open: boolean = false;

    public constructor(router: Router, mediator: Mediator) {
        this.router = router;
        this.mediator = mediator;
    }

    public activate(params: any) {
        params = params || {};
        if (params.jobId) {
            this.selectJob(params.jobId);
        }
    }

    public async attached() {
        this.page = 1;
    }

    public async pageChanged() {
        this.jobs = await this.mediator
            .for(GetJobs.Request)
            .handle<GetJobs.Result>({
                page: this.page
            });
    }

    public selectJob(jid: string) {
        this.selectedJobId = jid;
    }

    public async selectedJobIdChanged() {
        if (this.router) {
            await this.router.navigateToRoute("jobs", { jobId: this.selectedJobId }, { replace: true });
            this.open = !!this.selectedJobId;
        }
    }

    public async openChanged() {
        if (!this.open) {
            this.selectedJobId = null;
        }
    }
}
