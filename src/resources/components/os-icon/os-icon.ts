import "./os-icon.scss";
import { bindable, computedFrom } from "aurelia-framework";

export class OsIcon {

    @bindable
    public os: string;

    @computedFrom("os")
    public get iconClass() {
        // TODO https://github.com/saltstack/salt/blob/develop/salt/grains/core.py#L1586
        let os = this.os.toLowerCase();
        if (os == "windows") {
            return "fo-win10";
        }
        if (os == "ubuntu") {
            return "fo-ubuntu";
        }
        if (os == "centos") {
            return "fo-centos";
        }
        return "far fa-question-circle";
    }
}
