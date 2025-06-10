

export class IdHelper {

    public static getRandomInt(): number {
        const min = 1;
        const max = 100000; 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}//end class