import "./settings.scss";
import { RouterConfiguration, Router } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class Settings {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.map([
            {
                route: [""],
                redirect: "katalye"
            },
            {
                route: ["profile"],
                name: "settings-profile",
                moduleId: PLATFORM.moduleName("./sections/profile"),
                title: "Profile",
                breadcrumb: true,
                nav: true,
                settings: {
                    icon: "fas fa-user",
                    description: "Configure your user settings",
                    type: "user"
                }
            },
            {
                route: ["katalye"],
                name: "settings-katalye",
                moduleId: PLATFORM.moduleName("./sections/katalye"),
                title: "Katalye",
                breadcrumb: true,
                nav: true,
                settings: {
                    icon: "fas fa-server",
                    description: "Configure Katalye server settings",
                    type: "admin"
                }
            },
            {
                route: ["salt"],
                name: "settings-salt",
                moduleId: PLATFORM.moduleName("./sections/salt"),
                title: "Salt",
                breadcrumb: true,
                nav: true,
                settings: {
                    icon: "fas fa-cloud",
                    description: "Configure connecting to the Salt API",
                    type: "admin"
                }
            },
            {
                route: ["users"],
                name: "settings-users",
                moduleId: PLATFORM.moduleName("./sections/users"),
                title: "Users",
                breadcrumb: true,
                nav: true,
                settings: {
                    icon: "fas fa-users",
                    description: "Configure which users can access the server",
                    type: "admin"
                }
            },
            {
                route: ["notifications"],
                name: "settings-notifications",
                moduleId: PLATFORM.moduleName("./sections/notifications"),
                title: "Notifications",
                breadcrumb: true,
                nav: true,
                settings: {
                    icon: "fas fa-bell",
                    description: "Configure user notification settings",
                    type: "admin"
                }
            },
        ]);
    }
}
