export class RemoveValueConverter {
    public toView(value: string[], removeRegex: string) {
        let regex = new RegExp(removeRegex);
        return (value || []).filter(x => !regex.test(x));
    }
}

export class ChunkValueConverter {
    public toView(value: string[], size: number) {
        value = value || [];
        let result = [];
        while (value.length > 0) {
            let batch = value.splice(0, size);
            result.push(batch);
        }
        return result;
    }
}

export class BatchValueConverter {
    public toView(value: string[], count: number) {
        value = value || [];
        let result = [];
        let chunkSize = Math.ceil(value.length / count);
        while (value.length > 0 && chunkSize) {
            let batch = value.splice(0, chunkSize);
            result.push(batch);
        }
        return result;
    }
}
