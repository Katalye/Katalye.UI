import "./os-icon.scss";
import { bindable, computedFrom } from "aurelia-framework";

export class OsIcon {

    @bindable
    public os: string;

    @computedFrom("os")
    public get iconClass() {
        let os = this.os.toLowerCase();
        if (os == "windows") {
            return "fo-win10";
        }
        if (os == "ubuntu") {
            return "fo-ubuntu";
        }
        return "far fa-question-circle";
    }
}
