import { TasksManager } from "./services/tasks-manager";
import "whatwg-fetch";
import { PLATFORM, Aurelia } from "aurelia-framework";
import { HubForwarder } from "./infrastructure/hub-forwarder";

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature(PLATFORM.moduleName("resources/index"));

    aurelia.container.registerSingleton(TasksManager);
    aurelia.container.registerSingleton(HubForwarder);

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName("app"));
}
