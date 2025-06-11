//src\app\api\projects\services\srvprojects.ts
"use server"

import { ERROR_EDIT_MSG, ERROR_QUERY_MSG, SUCCESS_RESPONSE } from "@/app/api/projects/constants";
import { DatabaseConnection } from "@/app/api/projects/dbconnection"


/**
* delete project by id
*/
export async function deleteProject(id: number): Promise<{result:string,info:string}> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        await prisma.project.delete({
            where: { id }
        });
        return SUCCESS_RESPONSE;
    } catch (error) {
        return {
            result: "error",
            info: ERROR_QUERY_MSG.concat(`deleteProject: ${id}: ${error}`)
        };
    }

}//end function

// insert
export async function insertProject(
    name: string,
    auth: string,
    projectdesc: string,
    techstack: string,
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
    doccatalog: string): Promise<{result: string,info: string}> {

    try {
        const prisma = await DatabaseConnection.getConnection();
        await prisma.project.create({
            data: {
                name,
                auth,
                projectdesc,
                techstack,
                environments,
                repositories,
                languages_code,
                servers,
                architecture,
                usermgmt,
                workflows,
                scripts,
                autofeatures,
                multimediause,
                implplatform,
                uisystem,
                iaintegration,
                keyscerts,
                dbstorage,
                libraries,
                folderstruct,
                updates,
                execenv,
                doccatalog
            }
        });
        return SUCCESS_RESPONSE;
    } 
    catch (error) {
        return {
            result: "error",
            info: ERROR_QUERY_MSG.concat(`insertProject: ${error}`)
        };
    }
    
}//end function

/**
* update complete project by id
*/
export async function updateProject(
    id: number,
    name: string,
    auth: string,
    projectdesc: string,
    techstack: string,
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
    doccatalog: string): Promise<{result: string,info: string}> {
        
    try {
        const prisma = await DatabaseConnection.getConnection();
        await prisma.project.update({
            where: { id },
            data: {
                name,
                auth,
                projectdesc,
                techstack,
                environments,
                repositories,
                languages_code,
                servers,
                architecture,
                usermgmt,
                workflows,
                scripts,
                autofeatures,
                multimediause,
                implplatform,
                uisystem,
                iaintegration,
                keyscerts,
                dbstorage,
                libraries,
                folderstruct,
                updates,
                execenv,
                doccatalog
            }
        });
        return SUCCESS_RESPONSE;
    } 
    catch (error) {
        return {
            result: "error",
            info: ERROR_QUERY_MSG.concat(`updateProject: ${id}: ${error}`)
        };
    }

}//end function


/**
* update complete row by name
*/
export async function updateProjectByName(
    name: string,
    auth: string,
    projectdesc: string,
    techstack: string,
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
    doccatalog: string): Promise<{ result: string,info: string}> {

    try {
        const prisma = await DatabaseConnection.getConnection();
        await prisma.project.update({
            where: { name },
            data: {
                auth,
                projectdesc,
                techstack,
                environments,
                repositories,
                languages_code,
                servers,
                architecture,
                usermgmt,
                workflows,
                scripts,
                autofeatures,
                multimediause,
                implplatform,
                uisystem,
                iaintegration,
                keyscerts,
                dbstorage,
                libraries,
                folderstruct,
                updates,
                execenv,
                doccatalog
            }
        });
        return SUCCESS_RESPONSE;
    } 
    catch (error) {
        return {
            result: ERROR_EDIT_MSG,
            info: ERROR_QUERY_MSG.concat(`updateProjectByName: ${name}: ${error}`)
        };
    }
}

/**
* update complete project by id (uses updateProjectByName)
*/
export async function updateProjectById(
    id: number,
    auth: string,
    projectdesc: string,
    techstack: string,
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
    doccatalog: string): Promise<{result: string,info: string}> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const project = await prisma.project.findUnique({
            where: { id },
            select: { name: true }
        });

        if (!project) {
            return {
                result: ERROR_EDIT_MSG,
                info: ERROR_QUERY_MSG.concat(`updateProjectById: Project with id ${id} not found`)
            };
        }

        return await updateProjectByName(
            project.name,
            auth,
            projectdesc,
            techstack,
            environments,
            repositories,
            languages_code,
            servers,
            architecture,
            usermgmt,
            workflows,
            scripts,
            autofeatures,
            multimediause,
            implplatform,
            uisystem,
            iaintegration,
            keyscerts,
            dbstorage,
            libraries,
            folderstruct,
            updates,
            execenv,
            doccatalog
        );
    } 
    catch (error) {
        return {
            result: ERROR_EDIT_MSG,
            info: ERROR_QUERY_MSG.concat(`updateProjectById: ${id}: ${error}`)
        };
    }
}
