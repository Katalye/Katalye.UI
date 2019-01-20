import moment from "moment";

export class DateFormatValueConverter {
    public toView(value: string, format: string = "l LT") {
        if (!value) {
            return null;
        }
        return moment(value).format(format);
    }
}

export class TimeAgoValueConverter {
    public toView(value: string, withoutSuffix: boolean) {
        if (!value) {
            return null;
        }
        return moment(value).fromNow(withoutSuffix);
    }
}

export class DurationValueConverter {
    public toView(value: number, format: string = "mm:ss.SSS") {
        if (!value) {
            return null;
        }
        return moment.utc(value).format(format);
    }
}
