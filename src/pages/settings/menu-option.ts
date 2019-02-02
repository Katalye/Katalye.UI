import { bindable } from "aurelia-framework";

export class MenuOption {
    @bindable
    public nav: any;

    @bindable
    public first: boolean;
}
