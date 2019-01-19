import { autoinject, observable } from "aurelia-framework";
import { Mediator } from "../../../../services/mediator";
import { GetMinion } from "../../../../services/queries/get-minion";

@autoinject
export class MinionGrains {

    public mediator: Mediator;
    public minionId: string;

    @observable
    public minion: GetMinion.Result;

    public constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public activate(params: any) {
        params = params || {};
        this.minionId = params.minionId;
    }

    public async attached() {
        this.minion = await this.mediator
            .for(GetMinion.Request)
            .handle<GetMinion.Result>({
                id: this.minionId
            });
    }
}
