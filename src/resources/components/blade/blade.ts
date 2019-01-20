import "./blade.scss";
import { bindable, bindingMode } from "aurelia-framework";

export class Blade {

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public open: boolean;

    public element: HTMLElement;

    public close(event: Event) {
        let targetMatches = event.target == this.element;
        if (targetMatches) {
            this.open = false;
        }
    }
}
