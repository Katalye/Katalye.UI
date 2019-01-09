import moment from "moment";

export class DateFormatValueConverter {
    public toView(value: string, format: string = "l LT") {
        return moment(value).format(format);
    }
}

export class TimeAgoValueConverter {
    public toView(value: string, withoutSuffix: boolean) {
        return moment(value).fromNow(withoutSuffix);
    }
}

export class DurationValueConverter {
    public toView(value: number, format: string = "mm:ss.SSS") {
        return moment.utc(value).format(format);
    }
}
