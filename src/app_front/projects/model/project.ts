//src\app_front\projects\model\project.ts


/**
 * class Project
 * Entity Db Table iadatabase
 */
export class Project {

    public id: number;
    public name: string;
    public auth: string;
    public projectdesc: string;
    public techstack: string;
    public environments: string;
    public repositories: string;
    public languages_code: string;
    public servers: string;
    public architecture: string;
    public usermgmt: string;
    public workflows: string;
    public scripts: string;
    public autofeatures: string;
    public multimediause: string;
    public implplatform: string;
    public uisystem: string;
    public iaintegration: string;
    public keyscerts: string;
    public dbstorage: string;
    public libraries: string;
    public folderstruct: string;
    public updates: string;
    public execenv: string;
    public doccatalog: string;

    constructor(id:number,name:string,auth:string,
                projectdesc:string,
                techstack:string,
                environments: string,
                repositories: string,
                languages_code: string,
                servers: string,
                architecture: string,
                usermgmt: string,
                workflows: string,
                scripts: string,
                autofeatures: string,
                multimediause: string,
                implplatform: string,
                uisystem: string,
                iaintegration: string,
                keyscerts: string,
                dbstorage: string,
                libraries: string,
                folderstruct: string,
                updates: string,
                execenv: string,
                doccatalog: string ) {
        this.id = id;
        this.name = name;
        this.auth = auth;
        this.projectdesc = projectdesc;
        this.techstack = techstack;
        this.environments = environments;
        this.repositories = repositories;
        this.languages_code = languages_code;
        this.servers = servers;
        this.architecture = architecture;
        this.usermgmt = usermgmt;
        this.workflows = workflows;
        this.scripts = scripts;
        this.autofeatures = autofeatures;
        this.multimediause = multimediause;
        this.implplatform = implplatform;
        this.uisystem = uisystem;
        this.iaintegration = iaintegration;
        this.keyscerts = keyscerts;
        this.dbstorage = dbstorage;
        this.libraries = libraries;
        this.folderstruct = folderstruct;
        this.updates = updates;
        this.execenv = execenv;
        this.doccatalog = doccatalog;
    }

}//end class

// Tipos auxiliares para operaciones CRUD
export type CreateProjectData = Omit<Project, 'id'>;
export type UpdateProjectData = Partial<CreateProjectData>;
export type ProjectId = Pick<Project, 'id'>;