import "./minion.scss";
import { Mediator } from "./../../../services/mediator";
import { autoinject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { GetMinion } from "../../../services/queries/get-minion";
import { GetMinionJobs } from "../../../services/queries/get-minion-jobs";
import { GetMinionJob } from "../../../services/queries/get-minion-job";

@autoinject
export class Minion {

    public router: Router;
    public mediator: Mediator;
    public minionId: string;

    public minion: GetMinion.Result;

    @bindable
    public jobPage: number = 1;
    public jobs: GetMinionJobs.Result;

    @bindable
    public selectedJobId: string;
    public selectedJob: GetMinionJob.Result;

    public open: boolean;

    public constructor(router: Router, mediator: Mediator) {
        this.router = router;
        this.mediator = mediator;
    }

    public async activate(params: any) {
        params = params || {};
        this.minionId = params.minionId;

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

        if (!this.selectedJobId && this.jobs.result.length > 0) {
            this.selectedJobId = this.jobs.result[0].jid;
        }
    }

    public selectJob(jid: string) {
        this.open = true;
        this.selectedJobId = jid;
    }

    public async selectedJobIdChanged() {
        this.selectedJob = await this.mediator
            .for(GetMinionJob.Request)
            .handle<GetMinionJob.Result>({
                id: this.minionId,
                jid: this.selectedJobId
            });
    }
}
