import "./tray-tasks.scss";

import { TasksManager } from "./../services/tasks-manager";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

@autoinject
export class TrayTasks {

    public manager: TasksManager;
    private ea: EventAggregator;

    public constructor(taskManager: TasksManager, ea: EventAggregator) {
        this.manager = taskManager;
        this.ea = ea;
    }

    public toggle() {
        this.ea.publish("katalye:tasks:toggle");
    }
}
