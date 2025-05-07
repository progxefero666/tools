

export class JsonUtil {

    public static JSON_EMPTY = {};

    
    public static getArrayString(collection:string[]): string {
        let str = JSON.stringify(collection);
        return str;
    }

    public static getStringArray(arraystr:string): string[] {
        return JSON.parse(arraystr as string);        
    }

}//end class