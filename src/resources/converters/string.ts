export class JoinValueConverter {
    public toView(value: string[], separator: string = ", ") {
        return (value || []).join(separator);
    }
}
