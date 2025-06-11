//src\app\api\projects\services\srvprojectedit.ts
"use server"

import { ERROR_EDIT_MSG, ERROR_QUERY_MSG, FIELD_INIT_VALUE, SUCCESS_RESPONSE } from "@/app/api/projects/constants";
import { DatabaseConnection } from "@/app/api/projects/dbconnection"


/**
* update single field by project name
*/
export async function updateSingleField(name:string,fieldName:string,fieldValue:string):
    Promise<{result: string,info:string}> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const updateData: any = {};
        updateData[fieldName] = fieldValue;
        await prisma.project.update({
            where: { name },
            data: updateData
        });
        return SUCCESS_RESPONSE;
    }
     catch (error) {
        return {
            result: ERROR_EDIT_MSG,
            info: ERROR_QUERY_MSG.concat(`updateSingleField: ${name}, ${fieldName}: ${error}`)
        };
    }
}

/**
* update multiple fields by project name
*/
export async function updateMultipleFields(
    name: string,
    fields: { fieldName: string, fieldValue: string }[]): Promise<{ result: string, info: string}> {
    try {
        const prisma = await DatabaseConnection.getConnection();

        const updateData: any = {};
        fields.forEach(field => {
            updateData[field.fieldName] = field.fieldValue;
        });
        await prisma.project.update({
            where: { name },
            data: updateData
        });
        return SUCCESS_RESPONSE;
    } 
    catch (error) {
        return {
            result: "error",
            info: ERROR_QUERY_MSG.concat(`updateMultipleFields: ${name}: ${error}`)
        };
    }
}


/**
* reset field to initial value
*/
export async function resetField(name: string,fieldName: string): Promise<{result: string,info: string}> {
    return await updateSingleField(name, fieldName, FIELD_INIT_VALUE);
}
