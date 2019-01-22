import "./minion.scss";
import { Mediator } from "./../../../../services/mediator";
import { autoinject, computedFrom, PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { GetMinion } from "../../../../services/queries/get-minion";
import { GetMinionJobs } from "../../../../services/queries/get-minion-jobs";

@autoinject
export class Minion {

    public router: Router;
    public mediator: Mediator;
    public minionId: string;

    public minion: GetMinion.Result;
    public jobCount: number;

    public constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public async activate(params: any) {
        params = params || {};
        this.minionId = params.minionId;
    }

    public async attached() {
        this.router.parent.currentInstruction.config.title = this.minionId;
        let jobTask = this.mediator
            .for(GetMinionJobs.Request)
            .handle<GetMinionJobs.Result>({
                id: this.minionId,
                size: 1
            });

        this.minion = await this.mediator
            .for(GetMinion.Request)
            .handle<GetMinion.Result>({
                id: this.minionId
            });

        await jobTask.then(x => this.jobCount = x.count);
    }

    @computedFrom("minion", "minion.grains")
    public get grainsCount() {
        if (this.minion && this.minion.grains) {
            return Object.keys(this.minion.grains).length;
        }
        return 0;
    }

    public configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.map([
            {
                route: [""],
                redirect: "jobs"
            },
            {
                route: ["jobs/:jobId?"],
                name: "minion-jobs",
                moduleId: PLATFORM.moduleName("./minion-jobs"),
                title: "Jobs",
                breadcrumb: true,
                settings: {
                }
            },
            {
                route: ["grains"],
                name: "minion-grains",
                moduleId: PLATFORM.moduleName("./minion-grains"),
                title: "Grains",
                breadcrumb: true,
                settings: {
                }
            },
        ]);
    }

    @computedFrom("router.currentInstruction.config.name")
    public get currentRoute() {
        return this.router.currentInstruction.config.name;
    }
}
