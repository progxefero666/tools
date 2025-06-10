
export class cu {


    static cok(message: string) {console.log("OK");}
    static cerr(){alert("error");}
    
    static sep(): void {
        console.log(".......................");
    }

    static cs(message: string): void {
        console.log(message);
    }
    
    static c(name: string,value: string|number): void {
        console.log(name.concat(": ").concat(String(value)));
    }

}