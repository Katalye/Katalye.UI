import jQuery from "jquery";
import "select2";
import { autoinject, bindable, bindingMode } from "aurelia-framework";

@autoinject
export class TypeAheadSelect {

    public self: Element;
    public element: HTMLElement;

    @bindable
    public values: string[];

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public selectedValue: string;

    public constructor(self: Element) {
        this.self = self;
    }

    public attached() {
        jQuery(this.element)
            .select2({
                theme: "bootstrap4",
                width: "100%"
            })
            .on("select2:select", () => {
                this.element.dispatchEvent(new Event("change"));
            });
    }
}
