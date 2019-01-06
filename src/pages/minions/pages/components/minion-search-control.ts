import { autoinject } from "aurelia-framework";
import { Mediator } from "../../../../services/mediator";
import { GetSearchGrains } from "../../../../services/queries/get-search-grains";
import { GetSearchGrainValues } from "../../../../services/queries/get-search-grain-values";

@autoinject
export class MinionSearchControl {

    private mediator: Mediator;
    public grains: GetSearchGrains.Result;
    public selectedValue: string;

    public constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public async GetOsValues(query: string) {
        let result = await this.mediator
            .for(GetSearchGrainValues.Request)
            .handle<GetSearchGrainValues.Result>({
                path: "os",
                search: query
            });
        return result.values;
    }
}
