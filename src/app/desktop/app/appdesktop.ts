//src\app\desktop\app\appdesktop.ts

import { AppBase } from "@/lib/arquitect/model/appbase";
import { AppModule } from "@/lib/arquitect/model/appmodule";

/*
const app_desktop:AppDesktop = new AppDesktop(portal_project,"title","iaxeferoicon.png","description");
*/
/**
 * class AppDesktop 
 */
export class AppDesktop extends AppBase {

    //AppModule
    public app_modules:AppModule[]=[];
    //public app_modules_names:string[]=[];

    constructor(portal_project:string,title:string,logo:string,description:string){
        super(portal_project,title,logo,description);
        this.loadModules();
    }

    public loadModules():void {
        const mod_projects:AppModule = new AppModule(0,"projectforces","Projects","projectsicon.png","ia projects");
        const mod_qdrapllm:AppModule = new AppModule(0,"qdrapllmlab","Qdrap LLM","qdrapllmicon.png","qdrap_llm lab");
        this.insert("projectforces",mod_projects);
        this.insert("qdrapllmlab",mod_qdrapllm);
        this.app_modules = this.getElements();
        //this.app_modules_names = this.getFields();
        console.log("app modules charged");
    }

}//end class