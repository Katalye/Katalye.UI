import { autoinject } from "aurelia-framework";
import { Section } from "../section";
import { Mediator } from "../../../services/mediator";

@autoinject
export class SaltSettings extends Section {

    public constructor(mediator: Mediator) {
        super(mediator);
    }
}
