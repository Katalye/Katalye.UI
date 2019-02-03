import { TasksManager } from "./../services/tasks-manager";
import { autoinject } from "aurelia-framework";

@autoinject
export class Tasks {

    public manager: TasksManager;

    public constructor(taskManager: TasksManager) {
        this.manager = taskManager;
    }
}
