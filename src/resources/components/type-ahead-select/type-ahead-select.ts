import "./type-ahead-select.scss";
import jQuery from "jquery";
import "corejs-typeahead";
import { autoinject, bindable, bindingMode } from "aurelia-framework";

@autoinject
export class TypeAheadSelect {

    public self: Element;
    public element: HTMLElement;

    @bindable
    public query: (obj: { query: string }) => Promise<string[]>;

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
        jQuery(this.element).typeahead(
            {
                hint: true,
                highlight: true,
                minLength: 0
            },
            {
                name: "test",
                source: this.getSourceFunction(),
                limit: 10,
            }
        );
    }

    public getSourceFunction() {
        let self = this;
        return function call(this: any, query: string, _: (matches: string[]) => void, asyncCallback: (matches: string[]) => void) {
            self.invokeQuery(query)
                .then((result) => {
                    asyncCallback(result);
                });
        };
    }

    public async invokeQuery(query: string) {
        if (!this.query) {
            return [];
        }
        let result = await this.query({
            query
        });
        return result;
    }
}
