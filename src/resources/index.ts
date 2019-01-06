import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName("./components/page-container/page-container"),
        PLATFORM.moduleName("./components/page-control/page-control"),
        PLATFORM.moduleName("./components/breadcrumbs/breadcrumbs"),
        PLATFORM.moduleName("./components/pagination/pagination"),
        PLATFORM.moduleName("./components/os-icon/os-icon"),
        PLATFORM.moduleName("./components/type-ahead-select/type-ahead-select"),
        PLATFORM.moduleName("./converters/date-time"),
        PLATFORM.moduleName("./converters/string"),
        PLATFORM.moduleName("./converters/arrays"),
    ]);
}
