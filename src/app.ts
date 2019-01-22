import "./infrastructure/styling/bootstrap";
import "./infrastructure/styling/fontawesome";
import "./app.scss";
import { autoinject, PLATFORM } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject()
export class App {

    public sidebarOpen: boolean = false;

    private router: Router;

    public toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }

    public configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.title = "Katalye";
        config.map([
            {
                route: [""],
                redirect: "minions"
            },
            {
                route: ["overview"],
                name: "overview",
                moduleId: PLATFORM.moduleName("./pages/overview/overview"),
                nav: true,
                title: "Overview",
                breadcrumb: true,
                settings: {
                    icon: "fas fa-server"
                }
            },
            {
                route: ["minions"],
                name: "minions",
                moduleId: PLATFORM.moduleName("./pages/minions/minions"),
                nav: true,
                title: "Minions",
                breadcrumb: true,
                settings: {
                    icon: "fas fa-server"
                }
            },
            {
                route: ["jobs"],
                name: "jobs",
                moduleId: PLATFORM.moduleName("./pages/jobs/jobs"),
                nav: true,
                title: "Jobs",
                breadcrumb: true,
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
                breadcrumb: true,
                settings: {
                    icon: "fas fa-book",
                }
            },
            {
                route: ["settings"],
                name: "settings",
                moduleId: PLATFORM.moduleName("./pages/settings/settings"),
                title: "Settings",
                breadcrumb: true
            }
        ]);

        config.options.pushState = true;

        config.mapUnknownRoutes(PLATFORM.moduleName("./pages/not-found/not-found"));
    }
}
