import { autoinject, buildQueryString } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { getLogger } from "aurelia-logging";



@autoinject
export class KatalyeClient {

    private logger = getLogger("KatalyeClient");

    private client: HttpClient;
    private method: string = "GET";
    private path: string;
    private query: string;

    public constructor(client: HttpClient) {
        this.client = client;
        this.client.configure(config => {
            config
                .withBaseUrl("api/")
                .withInterceptor({
                    request: request => {
                        this.logger.info(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response: response => {
                        this.logger.info(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
        });
    }

    public withPath(path: string) {
        this.path = path;
        return this;
    }

    public withMethod(method: "POST" | "GET" | "PUT" | "DELETE") {
        this.method = method;
        return this;
    }

    public withQuery(obj: any) {
        this.query = buildQueryString(obj, true);
        return this;
    }

    public async fetch<T>(body?: any): Promise<T> {

        let finalPath = this.path;
        if (this.query) {
            finalPath += "?" + this.query;
        }
        let request = new Request(finalPath, {
            method: this.method,
            body: JSON.stringify(body)
        });
        let result = await this.client.fetch(request);

        if (result.status == 404) {
            return null;
        }
        if (!result.ok) {
            throw new Error(`Server responded with a non-success status code of ${result.status}.`);
        }

        let json = await result.json();
        return json;
    }
}
