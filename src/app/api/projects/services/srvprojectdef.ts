// src\app\api\projects\services\srvprojectdef.ts
"use server"

import { DatabaseConnection } from "../dbconnection"
import {ERROR_QUERY_MSG, ERROR_QUERY_RETURN} from "@/app/api/projects/constants"
/**
* ServiceProjectDef functions
* Postgress 17 serverservice
* Only read 
* return model-chain entities: Class ProjectDef
*/


// get all records
export async function getAll(): Promise<{ id: number, forden: number, fname: string, fdescription: string }[]> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const records = await prisma.projectdef.findMany({ orderBy: { forden: 'asc' } });
        return records.map((record: any) => ({
            id: record.id,
            forden: record.forden,
            fname: record.fname,
            fdescription: record.fdescription
        }));
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG.concat(`getAll: ${error}`));
    }
}

// get record by forden
export async function getByOrden(forden: number): Promise<{ id: number, forden: number, fname: string, fdescription: string } | string> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const record = await prisma.projectdef.findFirst({
            where: { forden }
        });
        return record ? {
            id: record.id,
            forden: record.forden,
            fname: record.fname,
            fdescription: record.fdescription
        } : ERROR_QUERY_RETURN;
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG
            .concat(`getByOrden: ${forden}: ${error}`));
    }
}

// get record by fname
export async function getByFname(fname: string): Promise<{ id: number, forden: number, fname: string, fdescription: string } | string> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const record = await prisma.projectdef.findFirst({
            where: { fname }
        });
        return record ? {
            id: record.id,
            forden: record.forden,
            fname: record.fname,
            fdescription: record.fdescription
        } : ERROR_QUERY_RETURN;
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG
            .concat(`getByOrden: ${fname}: ${error}`));
    }
}

// get record description by fname
export async function getDescriptionByFname(fname: string): Promise<string | null> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const record = await prisma.projectdef.findFirst({
            where: { fname },
            select: { fdescription: true }
        });
        return record?.fdescription || null;
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG
            .concat(`getDescriptionByFname: ${fname}: ${error}`));
    }
}

// get all records array fnames string
export async function getAllFnames(): Promise<string[]> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const records = await prisma.projectdef.findMany({
            select: { fname: true },
            orderBy: { forden: 'asc' }
        });
        return records.map((record: any) => record.fname);
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG
            .concat(`getAllFnames: ${error}`));
    }
}

// get count records
export async function getCount(): Promise<number> {
    try {
        const prisma = await DatabaseConnection.getConnection();
        const count = await prisma.projectdef.count();
        return count;
    }
    catch (error) {
        throw new Error(ERROR_QUERY_MSG
            .concat(`getCount: ${error}`));
    }
}