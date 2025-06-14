//src\app_front\projects\util\projectutil.ts

import { Project } from "@/app_front/projects/model/project";

/**
 * class ProjectUtil
 */
export class ProjectUtil {
    
    public project:Project;

    constructor(project:Project){
        this.project = project;
    }

    public getSectionContent(fieldName:string):string {
        switch(fieldName) {
            case 'auth': return this.project.auth;
            case 'projectdesc': return this.project.projectdesc;
            case 'techstack': return this.project.techstack;
            case 'environments': return this.project.environments;
            case 'repositories': return this.project.repositories;
            case 'languages_code': return this.project.languages_code;
            case 'servers': return this.project.servers;
            case 'architecture': return this.project.architecture;
            case 'usermgmt': return this.project.usermgmt;
            case 'workflows': return this.project.workflows;
            case 'scripts': return this.project.scripts;
            case 'autofeatures': return this.project.autofeatures;
            case 'multimediause': return this.project.multimediause;
            case 'implplatform': return this.project.implplatform;
            case 'uisystem': return this.project.uisystem;
            case 'iaintegration': return this.project.iaintegration;
            case 'keyscerts': return this.project.keyscerts;
            case 'dbstorage': return this.project.dbstorage;
            case 'libraries': return this.project.libraries;
            case 'folderstruct': return this.project.folderstruct;
            case 'updates': return this.project.updates;
            case 'execenv': return this.project.execenv;
            case 'doccatalog': return this.project.doccatalog;
            default: return "undefined";
        }
    }

}//end class
