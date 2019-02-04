import "./blade.scss";
import { bindable, bindingMode } from "aurelia-framework";

export class Blade {

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public open: boolean;

    @bindable
    public width: number = 60;

    @bindable
    public zIndex: number = 10;

    public element: HTMLElement;

    public close(event: Event) {
        let targetMatches = event == null || event.target == this.element;
        if (targetMatches) {
            this.open = false;
        }
    }
}
