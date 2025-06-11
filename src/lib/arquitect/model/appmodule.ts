//src\lib\arquitect\model\appmodule.ts


/**
 * class AppModule
 */
export class AppModule {

    public name: string;
    public title: string;
    public logo: string;
    public description: string;

    constructor(name: string, title: string, logo: string, description: string) {
        this.name = name;
        this.title = title;
        this.logo = logo;
        this.description = description;
    }

    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }

    public static build(jsonString: string): AppModule {
        const obj = JSON.parse(jsonString);
        return new AppModule(obj.name, obj.title, obj.logo, obj.description);
    }

}//end class