import "./minions.scss";
import { autoinject, PLATFORM } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject
export class Minions {

    private router: Router;

    public configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.map([
            {
                route: [""],
                name: "search",
                moduleId: PLATFORM.moduleName("./pages/search"),
                title: "Search",
                settings: {
                    icon: "fas fa-server"
                }
            },
            {
                route: [":minionId"],
                name: "minion",
                moduleId: PLATFORM.moduleName("./pages/minion/minion"),
                breadcrumb: true
            },
        ]);
    }
}
