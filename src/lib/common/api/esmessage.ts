

export class ESMessage {
    public value: string = "0";
    public process: string = "init";
    public error?: string |null=null;

    constructor(process: string, value: string, error?: string) {
        this.process = process;
        this.value = value;
        if (error) {
            this.error = error;
        }
    }

    public getJsonString(): string {
        return JSON.stringify({
            value: this.value,
            process: this.process,
            ...(this.error && { error: this.error })
        });
    }

}//end class