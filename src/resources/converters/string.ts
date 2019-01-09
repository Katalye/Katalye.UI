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
