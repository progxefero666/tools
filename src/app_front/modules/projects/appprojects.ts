//src\app_front\modules\projects\appprojects.ts

import { getByName } from "@/app/api/projects/services/srvprojectquery";
import { getAllProjectNames } from "@/app/api/projects/services/srvprojects";
import { Project } from "@/app_front/projects/model/project";
import { ServiceFrontProjects } from "@/app_front/projects/services/srvprojects";
import { ProjectsUtil } from "./functions/projectsutil";

/**
 * class AppProjects
 */
export class AppProjects {

    //Project
    public projectsNames: string[] = [];
    public actProject: Project | any = null;

    constructor() {
    }

    public async init() {
        this.projectsNames = await getAllProjectNames();
    }

    public getProjectIndex(name: string): number {
        let index: number = -1;
        for (let idx = 0; idx < this.projectsNames.length; idx++) {
            if (this.projectsNames[idx] == name) {
                index = idx;
                break;
            }
        }
        return index;
    }

    public async chargeProject(name: string): Promise<void> {
        let index: number = this.getProjectIndex(name);
        const data = await getByName(this.projectsNames[index]);
        if (data !== ServiceFrontProjects.ERROR_QUERY_RETURN) {
            this.actProject = ProjectsUtil.instance(data as any);            
        }        
    }


} //end class