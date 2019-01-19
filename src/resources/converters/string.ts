import yaml from "js-yaml";

export class JoinValueConverter {
    public toView(value: string[], separator: string = ", ") {
        return (value || []).join(separator);
    }
}

export class DefaultValueConverter {
    public toView(value: string[], defaultValue: string = "-") {
        return value || defaultValue;
    }
}

export class YamlValueConverter {
    public toView(value: any) {
        if (!value) {
            return "";
        }
        return yaml.safeDump(value);
    }
}

export class SaltCommandValueConverter {
    public toView(value: any) {
        if (!value) {
            return "";
        }

        let command = [];

        if (value.creationEventExists) {
            command.push("salt");
            let targetType = this.targetTypeToCommand(value.targetType);
            command.push(targetType);
            let target = (value.targets as [] || []).join(",");
            command.push(`"${target}"`);
            let func = value.function;
            command.push(func);
            let functionArguments = (value.arguments as []).join(" ");
            command.push(functionArguments);
        } else {
            command.push("salt-call");
            let func = value.function;
            command.push(func);
            let functionArguments = (value.arguments as []).join(" ");
            command.push(functionArguments);
        }

        return command.filter(x => x).join(" ");
    }

    public targetTypeToCommand(type: string) {
        switch (type) {
            case "grain":
                return "-G";
            case "pcre":
                return "-E";
            case "list":
                return "-L";
            case "compound":
                return "-C";
            case "glob":
                return "";
            default:
                return "ERROR_TARGET";
        }
    }
}
