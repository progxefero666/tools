



export class Device {
    public size: string = TechBase.VALUE_UNDEFINED;
    public platform: string | null = null;
    public width: number = 0;
    public height: number = 0;
    public pixelratio: number | null = null;
    public resolution: string | null = null;
    public os: string | null = null;
    public useragent: string | null = null;
    public istouchdevice: boolean = false;
    public devicetype: string | null = null;
    public model: string | null = null;

    //not modify
    constructor() {}

    getJsonString = ():any => {
        const jsonString = JSON.stringify(this);
        return jsonString
    }    

    public static fromJson(jsonString: string): Device {
        const parsedData = JSON.parse(jsonString);
        const device = new Device();
        
        // Copia todas las propiedades del JSON al objeto
        Object.assign(device, parsedData);
        
        return device;
    }

}//end class

/*
 * class TechBase.SIZE_MD_WIDTH
 */
export class TechBase {
    static VALUE_UNDEFINED = "UNDEFINED";
    static PLATF_MOBILE = "mobile";
	static PLATF_TABLET = "tablet";
	static PLATF_LAPTOP = "Laptops";
	static PLATF_DESKTOP = "desktop";
	static PLATF_TV 	= "tv";    

    static SIZE_SM = "sm";
    static SIZE_MD = "md";
    static SIZE_LG = "lg";
    static SIZE_XL = "xl";
    static SIZE_2XL = "2xl";
 
    static SIZE_SM_DEFAULT = 640;

    static SIZE_SM_WIDTH = 640;
    static SIZE_MD_WIDTH = 768;
    static SIZE_LG_WIDTH = 1024;
    static SIZE_XL_WIDTH = 1280;
    static SIZE_2XL_WIDTH = 1536;

}//end class

//DeviceUtil.detectSize()
