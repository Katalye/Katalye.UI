import { Mediator } from "../../services/mediator";
import { GetServerSettings } from "../../services/queries/get-server-settings";
import { UpdateServerSettings } from "../../services/commands/update-server-settings";

export abstract class Section {
    private mediator: Mediator;
    public settings: Map<string, GetServerSettings.Setting>;

    public constructor(mediator: Mediator) {
        this.mediator = mediator;
    }

    public async activate() {
        await this.revert();
    }

    public async revert() {
        let result = await this.mediator
            .for(GetServerSettings.Request)
            .handle<GetServerSettings.Result>({});
        this.settings = result.settings;
    }

    public async apply() {
        let result: any = {};
        for (let key in this.settings) {
            if (this.settings.hasOwnProperty(key)) {
                let setting = (this.settings as any)[key] as GetServerSettings.Setting;
                if (setting.dbValue) {
                    result[key] = {
                        key: setting.key,
                        value: setting.dbValue,
                        version: setting.version
                    };
                }
            }
        }
        await this.mediator
            .for(UpdateServerSettings.Request)
            .handle<UpdateServerSettings.Result>({
                settings: result
            });
        await this.revert();
    }
}
