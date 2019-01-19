import { autoinject } from "aurelia-framework";
import { observable } from "aurelia-binding";
import { GetMinionJobs } from "../../../../services/queries/get-minion-jobs";
import { Router } from "aurelia-router";
import { Mediator } from "../../../../services/mediator";

@autoinject
export class MinionJobs {

    public router: Router;
    public mediator: Mediator;

    public minionId: string;

    @observable
    public jobPage: number = 1;
    @observable
    public jobs: GetMinionJobs.Result;

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
        this.minionId = params.minionId;
        if (params.jobId) {
            this.selectJob(params.jobId);
        }
    }

    public async attached() {
        await this.jobPageChanged(); // TODO Lazy
    }

    public async jobPageChanged() {
        if (this.mediator) {
            this.jobs = await this.mediator
                .for(GetMinionJobs.Request)
                .handle<GetMinionJobs.Result>({
                    id: this.minionId,
                    page: this.jobPage
                });
        }
    }

    public async selectJob(jid: string) {
        this.selectedJobId = jid;
    }

    public async openChanged() {
        if (!this.open) {
            this.selectedJobId = null;
        }
    }

    public async selectedJobIdChanged() {
        if (this.router) {
            await this.router.navigateToRoute("minion-jobs", { jobId: this.selectedJobId }, { replace: true });
            this.open = !!this.selectedJobId;
        }
    }
}
