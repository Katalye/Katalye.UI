import "./minion-job-details.scss";
import { bindable, autoinject, computedFrom } from "aurelia-framework";
import { Mediator } from "../../../../../services/mediator";
import { GetMinionJob } from "../../../../../services/queries/get-minion-job";

@autoinject
export class MinionJobDetails {

    public loading: boolean = true;
    public mediator: Mediator;

    @bindable({ changeHandler: "refresh" })
    public jid: string;

    @bindable({ changeHandler: "refresh" })
    public minionId: string;

    public job: GetMinionJob.Result;

    @computedFrom("job.function")
    public get type() {
        if (!this.job) {
            return "default";
        }
        switch (this.job.function) {
            case "state.highstate":
            case "state.apply":
                return "state";
            default:
                return "default";
        }
    }

    public constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public async refresh() {
        this.loading = true;
        if (this.minionId && this.jid) {
            this.job = await this.mediator
                .for(GetMinionJob.Request)
                .handle<GetMinionJob.Result>({
                    id: this.minionId,
                    jid: this.jid
                });
        }
        this.loading = false;
    }
}
