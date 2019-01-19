import { createFullOverrideContext } from "aurelia-templating-resources";

export class IteratorStrategy {
    public instanceChanged(repeat: any, items: any): void {
        let removePromise = repeat.viewSlot.removeAll(true);
        if (removePromise instanceof Promise) {
            removePromise.then(() => this._standardProcessItems(repeat, items));
            return;
        }
        this._standardProcessItems(repeat, items);
    }

    public _standardProcessItems(repeat: any, items: any) {
        let index = 0;
        for (let [key, value] of items) {
            let overrideContext = createFullOverrideContext(repeat, value, index, undefined, key);
            let view = repeat.viewFactory.create();
            view.bind(overrideContext.bindingContext, overrideContext);
            repeat.viewSlot.add(view);
            ++index;
        }
    }

    // tslint:disable-next-line:no-empty
    public instanceMutated(repeat: any, items: any, changes: any): void {
    }

    // tslint:disable-next-line:no-empty
    public getCollectionObserver(observerLocator: any, items: any): any {
    }
}
