import { autoinject, observable } from "aurelia-framework";
import { Mediator } from "../../services/mediator";
import { GetJobs } from "../../services/queries/get-jobs";
import { Router } from "aurelia-router";
import { GetJobMinions } from "../../services/queries/get-job-minions";

@autoinject
export class Jobs {

    private router: Router;
    private mediator: Mediator;

    public jobs: GetJobs.Result;
    @observable
    public page: number;

    public jobMinions: GetJobMinions.Result;
    @observable
    public minionsPage: number;

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

    public async minionsPageChanged() {
        if (this.selectedJobId) {
            this.jobMinions = await this.mediator
                .for(GetJobMinions.Request)
                .handle<GetJobMinions.Result>({
                    page: this.minionsPage,
                    jid: this.selectedJobId
                });
        }
    }

    public selectJob(jid: string) {
        this.selectedJobId = jid;
        this.minionsPage = 1;
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
            this.minionsPage = 0;
        }
    }
}
