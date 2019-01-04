import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject
export class Minion {
    public router: Router;
    public minionId: string;

    public constructor(router: Router) {
        this.router = router;
    }

    public attached() {
        this.router.currentInstruction.config.title = this.minionId;
    }

    public activate(params: any) {
        params = params || {};
        this.minionId = params.minionId;
    }
}
