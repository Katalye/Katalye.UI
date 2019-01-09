import "./blade.scss";
import { bindable, bindingMode } from "aurelia-framework";

export class Blade {

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public open: boolean;

    public close() {
        this.open = false;
    }

    public stopPropagation(event: Event) {
        event.stopPropagation();
    }
}
