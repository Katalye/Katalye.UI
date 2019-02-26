import { getLogger } from "aurelia-logging";
import * as signalR from "@aspnet/signalr";
import { EventAggregator } from "aurelia-event-aggregator";
import { autoinject } from "aurelia-framework";

const logger = getLogger("SignalrForwarder");

@autoinject
export class HubForwarder {

    private ea: EventAggregator;

    public constructor(ea: EventAggregator) {
        this.ea = ea;
    }

    public async start() {
        let connected = await this.startConnection();
        while (!connected) {
            logger.info("Waiting 5 seconds to attempt to connect again.");
            await this.sleep(5000);
            connected = await this.startConnection();
        }
    }

    private async startConnection() {
        try {
            this.ea.publish("katalye:hub:connecting");
            let connection = this.createConnection();
            await connection.start();
            this.ea.publish("katalye:hub:connected");
            return true;
        } catch (error) {
            logger.error("Failed to start connection.", error);
            this.ea.publish("katalye:hub:failed");
            return false;
        }
    }

    private createConnection() {
        const connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Debug)
            .withUrl("/hub/v1/events")
            .build();
        connection.onclose(async (error) => {
            logger.error("Connection closed.", error);
            await this.start();
        });
        connection.on("publish", (path, data) => {
            this.handleEvent(path, data);
        });
        return connection;
    }

    private handleEvent(path: string, data: any) {
        logger.info(`Recieved event ${path}, publishing to aggregator.`);
        let event: IEvent = {
            path,
            data
        };
        this.ea.publish("katalye:hub:event", event);
    }

    private sleep(timeout: number) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), timeout);
        });
    }
}

export interface IEvent {
    path: string;
    data: { [index: string]: string; };
}
