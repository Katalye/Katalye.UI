import { Router, NavigationInstruction } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import _clone from "lodash.clone";

// https://github.com/istrau2/aurelia-crumbs

@autoinject
export class Breadcrumbs {

    private router: Router;
    private eventAggregator: EventAggregator;
    private subscription: Subscription;
    public instructions: NavigationInstruction[];

    public constructor(router: Router, eventAggregator: EventAggregator) {
        this.router = router;
        this.eventAggregator = eventAggregator;
    }

    public attached() {
        this.subscription = this.eventAggregator.subscribe("router:navigation:success", this.refresh.bind(this));
        this.refresh();
    }

    public detached() {
        this.subscription.dispose();
    }

    /**
     * Refresh the rendered widget
     */
    public refresh() {
        const parentInstructions = this.getParentInstructions(this.router.currentInstruction);
        this.instructions = parentInstructions
            .slice(0, parentInstructions.length - 1)
            .concat(this.router.currentInstruction.getAllInstructions())
            .filter(instruction => instruction.config.breadcrumb && instruction.config.title);
    }

    public navigateToRoute(instruction: NavigationInstruction) {
        const params = _clone(instruction.params);
        delete params.childRoute;
        instruction.router.navigateToRoute(instruction.config.name, params);
    }

    public getParentInstructions(instruction: NavigationInstruction): NavigationInstruction[] {
        return instruction.parentInstruction
            ? this.getParentInstructions(instruction.parentInstruction).concat([instruction])
            : [instruction];
    }
}
