import { GetMinionJob } from "../../../../../services/queries/get-minion-job";
import { bindable } from "aurelia-framework";

export class DefaultDetails {
    @bindable
    public job: GetMinionJob.Result;
}
