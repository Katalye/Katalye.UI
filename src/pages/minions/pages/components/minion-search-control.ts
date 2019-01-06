import { autoinject, bindable, bindingMode } from "aurelia-framework";
import { Mediator } from "../../../../services/mediator";
import { GetSearchGrainValues } from "../../../../services/queries/get-search-grain-values";

@autoinject
export class MinionSearchControl {

    private mediator: Mediator;
    private element: Element;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public os: string;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public ipv4: string;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public master: string;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public minionId: string;

    public constructor(mediator: Mediator, element: Element) {
        this.mediator = mediator;
        this.element = element;
    }

    public async getOsValues(query: string) {
        let result = await this.mediator
            .for(GetSearchGrainValues.Request)
            .handle<GetSearchGrainValues.Result>({
                path: "os",
                search: query
            });
        return result.values;
    }

    public async getIpv4Values(query: string) {
        let result = await this.mediator
            .for(GetSearchGrainValues.Request)
            .handle<GetSearchGrainValues.Result>({
                path: "ipv4",
                search: query
            });
        return result.values;
    }

    public async getMasterValues(query: string) {
        let result = await this.mediator
            .for(GetSearchGrainValues.Request)
            .handle<GetSearchGrainValues.Result>({
                path: "master",
                search: query
            });
        return result.values;
    }

    public async getMinionIdValues(query: string) {
        let result = await this.mediator
            .for(GetSearchGrainValues.Request)
            .handle<GetSearchGrainValues.Result>({
                path: "id",
                search: query
            });
        return result.values;
    }

    public refresh() {
        this.element.dispatchEvent(new Event("refresh"));
    }
}
