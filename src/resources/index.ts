import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName("./components/page-container/page-container"),
        PLATFORM.moduleName("./components/page-control/page-control"),
        PLATFORM.moduleName("./components/breadcrumbs/breadcrumbs"),
    ]);
}
