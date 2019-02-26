import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { IEvent } from "../infrastructure/hub-forwarder";
import { autoinject } from "aurelia-framework";

@autoinject
export class EventServer {

    private ea: EventAggregator;
    private subscriptions: Subscription[] = [];

    public constructor(ea: EventAggregator) {
        this.ea = ea;
    }

    public subscribe(regex: RegExp, callback: (event: IEvent) => void) {
        let subscription = this.ea.subscribe("katalye:hub:event", (event: IEvent) => {
            if (regex.test(event.path)) {
                callback(event);
            }
        });
        this.subscriptions.push(subscription);
    }

    public dispose() {
        for (let subscription of this.subscriptions) {
            subscription.dispose();
        }
    }
}
