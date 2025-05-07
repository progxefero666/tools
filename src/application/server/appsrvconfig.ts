import { AppConfig } from "@/application/appconfig";


export default class AppServerConfig {

    static OPERATION_FAILED:number = 0;

    static DEV_ROOTUSERFOLDER: string = "C:\\NextApps\\toolsusers"; 
    static PROD_ROOTUSERFOLDER:string ="C:/NextApps/toolsusers";

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

}//end class