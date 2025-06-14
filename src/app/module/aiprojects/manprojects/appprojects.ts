//src\app_front\modules\projects\appprojects.ts

import { getByName } from "@/app/api/projects/services/srvprojectquery";
import { getAllProjectNames } from "@/app/api/projects/services/srvprojects";
import { ProjectsUtil } from "@/app_front/modules/projects/functions/projectsutil";
import { Project } from "@/app_front/projects/model/project";
import { ServiceFrontProjects } from "@/app_front/projects/services/srvprojects";

import { ProjectUtil } from "@/app_front/projects/util/projectutil";

/**
 * class AppProjects
 */
export class AppProjects {

    constructor() {
    }

} //end class
