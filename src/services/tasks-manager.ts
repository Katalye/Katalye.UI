import { autoinject } from "aurelia-framework";
import { GetTask } from "./queries/tasks/get-task";
import { Mediator } from "./mediator";
import { EventServer } from "./event-server";
import { IEvent } from "../infrastructure/hub-forwarder";

@autoinject
export class TasksManager {
    private mediator: Mediator;
    private eventServer: EventServer;
    public processingTasksCount: number;
    public tasks: Task[] = [];

    public constructor(mediator: Mediator, eventServer: EventServer) {
        this.mediator = mediator;
        this.eventServer = eventServer;
    }

    public async attached() {
        this.eventServer.subscribe(/v1:tasks:.*/, (event: IEvent) => {
            this.upsertTask(event.data.taskId);
        });
    }

    public async detached() {
        this.eventServer.dispose();
    }

    public async upsertTask(taskId: string) {
        let task = await this.mediator
            .for(GetTask.Request)
            .handle<GetTask.Result>({
                id: taskId
            });
        let existingTask = this.tasks.find(x => x.id == taskId);
        if (existingTask == null) {
            this.tasks.push(task);
        } else {
            Object.assign(existingTask, task);
        }

        this.refreshStats();
    }

    private refreshStats() {
        let uncompletedTasks = this.tasks.filter(x => x.status == "Processing" || x.status == "Queued");
        this.processingTasksCount = uncompletedTasks.length;
    }
}

export class Task {
    public id: string;
    public tag: string;
    public metadata: any;
    public status: string;
    public startedOn: string;
}
