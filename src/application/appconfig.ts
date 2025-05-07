

export class AppConfig {
    
    static ENV_DEV:string = "development";
    static ENV_PROD:string = "production";
    static MODE_TEST:string = "TEST";
    
    public static  readonly KEY_USERID:string="userId";

    public static getParamUserId(value: number): string {
        return `${AppConfig.KEY_USERID}=${value.toString()}`;
    }

    
    
}