//src\lib\arquitect\model\appweb.ts

import { AppModule } from "@/lib/arquitect/model/appmodule";


/**
 * class AppModule
 */
export class AppBase {

    public portal_project:string;
    public title:string;
    public logo:string;
    public description:string;

    public modules: Map<string, AppModule> = new Map();

    constructor(portal_project:string,title:string,logo:string,description:string){
        this.portal_project = portal_project;
        this.title = title;
        this.logo = logo;
        this.description = description;
    }

    // read
    public get = (nombre: string): AppModule | null => {
        if(this.modules.has(nombre)){
            return this.modules.get(nombre) ?? null;
        }
        return null;
    }    

    public getElements= (): AppModule[] => {
        return Array.from(this.modules.values());
    }    

    public getFields= (): string[] => {
        return Array.from(this.modules.keys());
    }


    // crud
    public clear = (): void => {
        this.modules.clear();
    }

    public insert = (nombre: string, field: AppModule): void => {
        this.modules.set(nombre, field);
    }

    public delete = (nombre: string, field: AppModule): void => {
        this.modules.delete(nombre);
    }

    public insertGroup = (fields: AppModule[]): void => {
       for(let idx=0;idx<fields.length;idx++){
            this.insert(fields[idx].name,fields[idx]);        
       }
    }    



   public toJsonString():string{
        return JSON.stringify(this,null,4);
    }

}//end class