//src\app\api\projects\model\projectdef.ts


/**
 * export class ProjectDef
 * Entity Db Table iadatabase
 */
export class ProjectDef {

    public id: number;
    public forden:number;
    public fname: string;
    public fdescription: string;

    constructor(id:number,forden:number,fname:string,fdescription:string) {
        this.id = id;
        this.forden = forden;
        this.fname = fname;
        this.fdescription = fdescription;
    }

}//end class

