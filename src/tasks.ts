import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { autoinject } from "aurelia-framework";

@autoinject
export class Tasks {

    private ea: EventAggregator;
    private subscription: Subscription;
    public open: boolean = false;

    public constructor(ea: EventAggregator) {
        this.ea = ea;
    }

    public attached() {
        this.subscription = this.ea.subscribe("katalye:tasks:toggle", () => this.toggle());
    }

    public dettached() {
        this.subscription.dispose();
    }

    public toggle() {
        this.open = !this.open;
    }
}
