import { AppConfig } from "@/lib/arquitect/app/appconfig";


/**
 * class AppServerConfig.getAppRootFolder()
 */
export default class AppServerConfig {

    static OPERATION_FAILED:number = 0;

    static DEV_ROOTUSERFOLDER: string = "C:\\claude\\apps_data\\toolsusers"; 
    static PROD_ROOTUSERFOLDER:string ="C:/claude/apps_data/toolsusers";

    static DEV_APPROOTFOLDER: string = "C:\\claude\\apps_data\\toolsdata"; 
    static PROD_APPROOTFOLDER:string ="C:/claude/apps_data/toolsdata";

    static gerUsersRootFolder(env:string):string {
        let userRootFolder:string= "undefined";
        if(env === AppConfig.ENV_DEV){
            userRootFolder=AppServerConfig.DEV_ROOTUSERFOLDER;
        }
        else {
            userRootFolder=AppServerConfig.PROD_ROOTUSERFOLDER;
        }
        return userRootFolder;        
    }

    static getAppRootFolder(env:string):string {
        //const env:string = process.env.NODE_ENV;
        let appRootFolder:string= "undefined";
        if(env === AppConfig.ENV_DEV){
            appRootFolder=AppServerConfig.DEV_APPROOTFOLDER;
        }
        else {
            appRootFolder=AppServerConfig.PROD_APPROOTFOLDER;
        }
        return appRootFolder;    
    }

}//end class