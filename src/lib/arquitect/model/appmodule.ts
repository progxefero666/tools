//src\lib\arquitect\model\appmodule.ts


/**
 * class AppModule
 */
export class AppModule {

    public _id:number = 0;
    public name:string;
    public title:string;
    public logo:string;
    public description:string;

    constructor(id:number,name:string,title:string,logo:string,description:string){
        this._id = id;
        this.name = name;
        this.title = title;
        this.logo = logo;
        this.description = description;
    }

    public toJsonString():string{
        return JSON.stringify(this,null,4);
    }
    
}//end class