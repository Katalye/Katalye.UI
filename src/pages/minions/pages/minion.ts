import "./minion.scss";
import { Mediator } from "./../../../services/mediator";
import { autoinject, bindable, observable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { GetMinion } from "../../../services/queries/get-minion";
import { GetMinionJobs } from "../../../services/queries/get-minion-jobs";

@autoinject
export class Minion {

    public router: Router;
    public mediator: Mediator;
    public minionId: string;

    public minion: GetMinion.Result;

    @observable
    public jobPage: number = 1;
    public jobs: GetMinionJobs.Result;

    @observable
    public selectedJobId: string;

    @observable
    public open: boolean = false;

    public constructor(router: Router, mediator: Mediator) {
        this.router = router;
        this.mediator = mediator;
    }

    public async activate(params: any) {
        params = params || {};
        this.minionId = params.minionId;
        this.selectedJobId = params.jobId;

        if (params.jobId) {
            this.selectJob(params.jobId);
        }

        this.minion = await this.mediator
            .for(GetMinion.Request)
            .handle<GetMinion.Result>({
                id: this.minionId
            });
    }

    public async attached() {
        this.router.currentInstruction.config.title = this.minionId;

        await this.jobPageChanged(); // TODO Lazy
    }

    public async jobPageChanged() {
        this.jobs = await this.mediator
            .for(GetMinionJobs.Request)
            .handle<GetMinionJobs.Result>({
                id: this.minionId,
                page: this.jobPage
            });
    }

    public async selectJob(jid: string) {
        this.selectedJobId = jid;
    }

    public async selectedJobIdChanged() {
        await this.router.navigateToRoute("minion", { minionId: this.minionId, jobId: this.selectedJobId }, { replace: true });
        this.open = !!this.selectedJobId;
    }

    public async openChanged() {
        if (!this.open) {
            this.selectedJobId = null;
        }
    }
}
