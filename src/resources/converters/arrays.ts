export class RemoveValueConverter {
    public toView(value: string[], removeRegex: string) {
        let regex = new RegExp(removeRegex);
        return (value || []).filter(x => !regex.test(x));
    }
}

export class RemoveBlankValueConverter {
    public toView(value: string[]) {
        return (value || []).filter(x => x);
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

export class AnyValueConverter {
    public toView(value: string[]) {
        let result = value != null && value.length != 0;
        return result;
    }
}

export class NoneValueConverter {
    public toView(value: string[]) {
        let result = value == null || value.length == 0;
        return result;
    }
}

export class ObjectKeysValueConverter {
    /// https://stackoverflow.com/a/43139653/2001966
    public toView(obj: any) {
        // Create a temporary array to populate with object keys
        let temp = [];

        // A basic for..in loop to get object properties
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...in
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                temp.push(obj[prop]);
            }
        }

        return temp;
    }
}
