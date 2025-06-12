//src\app\desktop\app\appdesktop.ts


import { AppModule } from "@/lib/arquitect/model/appmodule";
import modulesData from '@/app_front/config/modules.json';


/**
* class AppDesktop 
*/
export class AppDesktop {

    public title: string;
    public logo: string;
    //public actmodule: AppModule | null = null;
    //public modules: AppModule[] = [];
    public modules_names: string[] = [];

    constructor(title: string, logo: string) {
        this.title = title;
        this.logo = logo;
        this.loadModules();
        console.log("AppDesktop modules loaded");
    }

    public loadModules(): void {
        const modules = modulesData.map((moduleData: any) =>
            new AppModule(
                moduleData.name,
                moduleData.title,
                moduleData.logo,
                moduleData.description
            )
        );
        this.modules_names = modules.map(module => module.name);
        console.log(this.modules_names);
    }
    
    public getModuleIndex(name: string): number {
        let index: number = -1;
        for (let idx = 0; idx < this.modules_names.length; idx++) {
            if (this.modules_names[idx] == name) {
                index = idx;
                break;
            }
        }
        return index;
    }



}//end class