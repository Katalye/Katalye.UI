import "./infrastructure/styling/bootstrap";
import "./infrastructure/styling/fontawesome";
import "./app.scss";
import { autoinject, PLATFORM } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject()
export class App {

    private router: Router;

    public configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.title = "Katalye";
        config.map([
            {
                route: [""],
                redirect: "minions"
            },
            {
                route: ["minions"],
                name: "minions",
                moduleId: PLATFORM.moduleName("./pages/minions/minions"),
                nav: true,
                title: "Minions",
                settings: {
                    icon: "fas fa-server"
                }
            },
            {
                route: ["jobs"],
                name: "jobs",
                moduleId: PLATFORM.moduleName("./pages/not-found/not-found"),
                nav: true,
                title: "Jobs",
                settings: {
                    icon: "fas fa-truck",
                }
            },
            {
                route: ["reports"],
                name: "reports",
                moduleId: PLATFORM.moduleName("./pages/not-found/not-found"),
                nav: true,
                title: "Reports",
                settings: {
                    icon: "fas fa-book",
                }
            },
        ]);

        config.mapUnknownRoutes(PLATFORM.moduleName("./pages/not-found/not-found"));
    }
}
