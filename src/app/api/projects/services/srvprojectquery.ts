//src\app\api\projects\services\srvprojectquery.ts
"use server"

import { ERROR_QUERY_RETURN, ERROR_QUERY_MSG } from "@/app/api/projects/constants";
import { DatabaseConnection } from "@/app/api/projects/dbconnection"

/**
* get complete project by name
*/
export async function getByName(name: string): Promise<{
    id: number, name: string, auth: string, projectdesc: string, techstack: string,
    environments: string, repositories: string, languages_code: string, servers: string,
    architecture: string, usermgmt: string, workflows: string, scripts: string, autofeatures:
    string, multimediause: string, implplatform: string, uisystem: string,
    iaintegration: string, keyscerts: string, dbstorage: string, libraries: string,
    folderstruct: string, updates: string, execenv: string, doccatalog: string
} | string> {

    try {
        const prisma = await DatabaseConnection.getConnection();
        const record = await prisma.project.findUnique({ where: { name } });
        return record ? {
            id: record.id,
            name: record.name,
            auth: record.auth,
            projectdesc: record.projectdesc,
            techstack: record.techstack,
            environments: record.environments,
            repositories: record.repositories,
            languages_code: record.languages_code,
            servers: record.servers,
            architecture: record.architecture,
            usermgmt: record.usermgmt,
            workflows: record.workflows,
            scripts: record.scripts,
            autofeatures: record.autofeatures,
            multimediause: record.multimediause,
            implplatform: record.implplatform,
            uisystem: record.uisystem,
            iaintegration: record.iaintegration,
            keyscerts: record.keyscerts,
            dbstorage: record.dbstorage,
            libraries: record.libraries,
            folderstruct: record.folderstruct,
            updates: record.updates,
            execenv: record.execenv,
            doccatalog: record.doccatalog
        } : ERROR_QUERY_RETURN;
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG.concat(`getProjectByName: ${name}: ${error}`));
    }

}//end function

/**
* get single field by project name
*/
export async function getField(name: string, fieldName: string): Promise<string> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const selectObj: any = {};
        selectObj[fieldName] = true;

        const record = await prisma.project.findUnique({
            where: { name },
            select: selectObj
        });
        return record ? record[fieldName] : ERROR_QUERY_RETURN;
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG.concat(`getProjectField: ${name}, ${fieldName}: ${error}`));
    }

}//end function


/**
* get multiple fields by project name
*/
export async function getFields(name: string, fieldNames: string[]): Promise<string[] | string> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const selectObj: any = {};
        fieldNames.forEach(fieldName => {
            selectObj[fieldName] = true;
        });

        const record = await prisma.project.findUnique({
            where: { name },
            select: selectObj
        });

        if (!record) {return ERROR_QUERY_RETURN;}
        const values: string[] = fieldNames.map(fieldName => record[fieldName]);
        return values;
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG.concat(`getProjectFields: ${name}: ${error}`));
    }
}//end function