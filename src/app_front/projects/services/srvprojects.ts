//src\app_src\front\services\srvprojects.ts
"use client";

import { Project } from "@/app_front/projects/model/project";
import { ProjectDef } from "@/app_front/projects/model/projectdef";
import { getAll } from "@/app/api/projects/services/srvprojectdef";
import { getByName } from "@/app/api/projects/services/srvprojectquery";
import { getAllProjectNames } from "@/app/api/projects/services/srvprojects";



/**
 * class ServiceFrontProjects
 */
export class ServiceFrontProjects {

    public static ERROR_QUERY_RETURN: string = "query error->";

    public projectDefs: ProjectDef[] = [];

    constructor() {
        this.init();
    }

    public async init() {
        const dataDef = await getAll();
        this.projectDefs = dataDef.map(item => new ProjectDef
            (item.id, item.forden, item.fname, item.fdescription));
    }

    /**
     * get complete Project
     */
    public async getProject(name: string): Promise<Project | string> {

        const data = await getByName(name) as any;
        if (data !== ServiceFrontProjects.ERROR_QUERY_RETURN) {
            const project = new Project(
                data.id, data.name, data.auth, data.projectdesc, data.techstack,
                data.environments, data.repositories, data.languages_code,
                data.servers, data.architecture, data.usermgmt, data.workflows,
                data.scripts, data.autofeatures, data.multimediause, data.implplatform,
                data.uisystem, data.iaintegration, data.keyscerts, data.dbstorage,
                data.libraries, data.folderstruct, data.updates, data.execenv,
                data.doccatalog
            );
            return project;
        }
        return data.error;
    }

    public getSectionNames():string[] {
        let names:string[] = [];
        for(let idx=0;idx<this.projectDefs.length;idx++){
            names.push(this.projectDefs[idx].fname);
        }
        return names;
    }
    
}//end class

