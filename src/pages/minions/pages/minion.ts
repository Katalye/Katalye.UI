import "./minion.scss";
import { Mediator } from "./../../../services/mediator";
import { autoinject, bindable } from "aurelia-framework";
import { Router } from "aurelia-router";
import { GetMinion } from "../../../services/queries/get-minion";
import { GetMinionJobs } from "../../../services/queries/get-minion-jobs";

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
    public selectedJob: GetMinionJobs.Model;

    public open: boolean = false;

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

    public selectJob(jid: string, index: number) {
        this.open = true;
        this.selectedJobId = jid;
        this.selectedJob = this.jobs.result[index];
    }
}
