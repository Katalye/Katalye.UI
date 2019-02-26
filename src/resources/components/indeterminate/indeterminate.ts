import "./indeterminate.scss";
import { bindable } from "aurelia-framework";

export class Indeterminate {
    @bindable
    public running: boolean = false;
}
