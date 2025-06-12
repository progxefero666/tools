//src/app_front/modules/projects/functions/projectsutil.ts

import { Project } from "@/app_front/projects/model/project";


/**
 * class ProjectsUtil
 */
export class ProjectsUtil{

    public static instance(projectData: any): Project {
         return new Project(
                projectData.id,
                projectData.name,
                projectData.auth,
                projectData.projectdesc,
                projectData.techstack,
                projectData.environments,
                projectData.repositories,
                projectData.languages_code,
                projectData.servers,
                projectData.architecture,
                projectData.usermgmt,
                projectData.workflows,
                projectData.scripts,
                projectData.autofeatures,
                projectData.multimediause,
                projectData.implplatform,
                projectData.uisystem,
                projectData.iaintegration,
                projectData.keyscerts,
                projectData.dbstorage,
                projectData.libraries,
                projectData.folderstruct,
                projectData.updates,
                projectData.execenv,
                projectData.doccatalog
            );
    }


}//end class

