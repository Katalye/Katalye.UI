import "./pagination.scss";
import { bindable, computedFrom, bindingMode } from "aurelia-framework";

export class Pagination {

    @bindable
    public count: number;

    @bindable
    public pages: number;

    @bindable({
        defaultBindingMode: bindingMode.twoWay,
    })
    public page: number;

    @computedFrom("page", "pages")
    public get hasNext() {
        return this.page < this.pages;
    }

    @computedFrom("page")
    public get hasPrevious() {
        return this.page > 1;
    }

    public next() {
        this.page++;
    }
    public previous() {
        this.page--;
    }
}
