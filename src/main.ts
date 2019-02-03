import { TasksManager } from "./services/tasks-manager";
import "whatwg-fetch";
import { PLATFORM, Aurelia } from "aurelia-framework";

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature(PLATFORM.moduleName("resources/index"));

    await aurelia.container.registerSingleton(TasksManager);

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName("app"));
}
