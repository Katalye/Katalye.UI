import { autoinject } from "aurelia-framework";
import { GetTasks } from "./queries/tasks/get-tasks";
import { GetTask } from "./queries/tasks/get-task";
import { Mediator } from "./mediator";
import { EventAggregator } from "aurelia-event-aggregator";

@autoinject
export class TasksManager {
    private mediator: Mediator;
    private ea: EventAggregator;
    private tasks: Task[] = [];
    public processingTasksCount: number;

    private processes: Process[] = [
        new Process(60 * 1000, () => this.fetchNewTasks()),
        new Process(10 * 1000, () => this.updateExistingTasks()),
    ];

    public constructor(mediator: Mediator, ea: EventAggregator) {
        this.mediator = mediator;
        this.ea = ea;
    }

    public async attached() {
        for (let process of this.processes) {
            await process.start();
        }
        this.ea.subscribe("katalye:tasks:discovered", (event: any) => this.fetchNewTask(event));
    }

    public async detached() {
        for (let process of this.processes) {
            process.stop();
        }
    }

    private async fetchNewTasks() {
        let tasks = await this.mediator
            .for(GetTasks.Request)
            .handle<GetTasks.Result>({});

        for (let task of tasks.result) {
            let missing = this.tasks.find(x => x.id == task.id) == null;
            if (missing) {
                this.tasks.push(task);
            }
        }

        this.refreshStats();
    }

    public async fetchNewTask(taskId: string) {
        let task = await this.mediator
            .for(GetTask.Request)
            .handle<GetTask.Result>({
                id: taskId
            });
        let missing = this.tasks.find(x => x.id == task.id) == null;
        if (missing) {
            this.tasks.push(task);
        }

        this.refreshStats();
    }

    private async updateExistingTasks() {

        let uncompletedTasks = this.tasks.filter(x => x.status == "Processing" || x.status == "Queued");
        let promises = uncompletedTasks.map(async task => {
            let result = await this.mediator
                .for(GetTask.Request)
                .handle<GetTask.Result>({
                    id: task.id
                });

            Object.assign(task, result);
        });

        await Promise.all(promises);

        this.refreshStats();
    }

    private refreshStats() {
        let uncompletedTasks = this.tasks.filter(x => x.status == "Processing" || x.status == "Queued");
        this.processingTasksCount = uncompletedTasks.length;
    }
}

class Process {
    public interval: number;
    public handler: () => Promise<void>;
    private intervalId: number;
    public constructor(interval: number, handler: () => Promise<void>) {
        this.interval = interval;
        this.handler = handler;
    }

    public async start() {
        await this.handler();
        this.intervalId = setInterval(this.handler, this.interval);
    }

    public stop() {
        clearInterval(this.intervalId);
    }
}

export class Task {
    public id: string;
    public tag: string;
    public metadata: any;
    public status: string;
    public startedOn: string;
}
