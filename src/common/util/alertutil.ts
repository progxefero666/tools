
export class oh {

    static readonly ok: string = "OK";
    static readonly error: string = "error";
    static readonly eventfired: string = "event fired";
    static readonly useeffect: string = "useEffect";

    static readonly process_success: string = "proc success";
    static readonly process_error: string = "proc error";

    
    static f(name: string,value: string|number): void {

        alert(name.concat(": ").concat(String(value)));
    }

    static fm(message: string): void {
        alert(message);
    }

    static fef(message: string): void {
        alert(oh.eventfired);
    }
    static fok(message: string): void {
        alert(oh.ok);
    }
    static ferr(): void {
        alert(oh.error);
    }

    static fue(): void {
        alert(oh.useeffect);
    }

    static fps(): void {
        alert(oh.process_success);
    }

    static fpe(): void {
        alert(oh.process_error);
    }
    
}//end class