import { bindable, computedFrom } from "aurelia-framework";
import { GetMinionJob } from "../../../../../services/queries/get-minion-job";

export class StateDetails {
    @bindable
    public job: GetMinionJob.Result;

    @computedFrom("job.returnData")
    public get data() {
        let result: StateProgress[] = [];

        for (let key in this.job.returnData) {
            if (this.job.returnData.hasOwnProperty(key)) {
                let value = this.job.returnData[key];

                let splitKey = key.split("_|");
                let id = splitKey[1].substr(1);
                let name = splitKey[2].substr(1);
                let functionModule = splitKey[0];
                let functionMethod = splitKey[3].substr(1);

                result.push(
                    {
                        id: value.__id__ || id,
                        function: `${functionModule}.${functionMethod}`,
                        changes: value.changes,
                        hasChanges: !!value.changes && Object.keys(value.changes).length != 0,
                        comment: value.comment,
                        duration: value.duration,
                        name: value.name || name,
                        result: value.result,
                        startTime: value.start_time,
                        runNumber: value.__run_num__,
                        sls: value.__sls__,
                        original: {
                            value,
                            key
                        }
                    }
                );
            }
        }

        return result.sort((a, b) => 0 - (a.runNumber < b.runNumber ? 1 : -1));
    }
}

export class StateProgress {
    public id: string;
    public function: string;
    public changes: any;
    public hasChanges: boolean;
    public comment: string;
    public duration: number;
    public name: string;
    public result: boolean;
    public startTime: string;
    public runNumber: number;
    public sls: string;
    public original: any;
}
