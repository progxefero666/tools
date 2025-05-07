import { Device, TechBase } from "../tech/tech";

/**
 * class DeviceUtil.getDevice()
 */
export class DeviceUtil {

    static getDevRepSize(width:number): string {
        if (width >= 1536) {
            return TechBase.SIZE_2XL; // ≥ 1536px
        } else if (width >= 1280) {
            return TechBase.SIZE_XL; // ≥ 1280px
        } else if (width >= 1024) {
            return TechBase.SIZE_LG; // ≥ 1024px
        } else if (width >= 768) {
            return TechBase.SIZE_MD; // ≥ 768px
        } else if (width >= 640) {
            return TechBase.SIZE_SM; // ≥ 640px
        } else {
            return TechBase.VALUE_UNDEFINED; // < 640px
        }
    } 

    static detectSize(): string {
        return DeviceUtil.getDevRepSize(window.screen.width);
    }

    static detectWSize(): number {
        return window.screen.width;
    }
    /**
     * Detecta la plataforma del dispositivo.
     * @returns {string} La plataforma detectada.
     */
    static detectPlatform(): string {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipad|windows phone/i.test(userAgent)) {
            return /ipad|tablet|android 3|android 4/i.test(userAgent)
                ? TechBase.PLATF_TABLET
                : TechBase.PLATF_MOBILE;
        } else if (/smart-tv|tv|webos/i.test(userAgent)) {
            return TechBase.PLATF_TV;
        } else if (window.screen.width >= 1024 && window.screen.height >= 768) {
            return TechBase.PLATF_DESKTOP;
        } else {
            return TechBase.PLATF_LAPTOP;
        }
    }

    /**
     * Detecta el sistema operativo.
     * @returns {string} El sistema operativo detectado.
     */
    static detectOS(): string {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/windows/i.test(userAgent)) return "Windows";
        if (/macintosh|mac os x/i.test(userAgent)) return "MacOS";
        if (/linux/i.test(userAgent)) return "Linux";
        if (/android/i.test(userAgent)) return "Android";
        if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
        return "Unknown OS";
    }

    /**
     * Detecta si el dispositivo es táctil.
     * @returns {boolean} Verdadero si es un dispositivo táctil.
     */
    static isTouchDevice(): boolean {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 ;
    }

    /**
     * Detecta el tipo de dispositivo.
     * @returns {string} El tipo de dispositivo detectado.
     */
    static detectDeviceType(): string {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/iphone|ipad/i.test(userAgent)) return "Apple Device";
        if (/android/i.test(userAgent)) return "Android Device";
        if (/windows/i.test(userAgent)) return "Windows Device";
        return "Generic Device";
    }

    /**
     * Detecta el modelo del dispositivo.
     * @returns {string} El modelo del dispositivo detectado.
     */
    static detectModel(): string {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/iphone|ipad/i.test(userAgent)) {
            return userAgent.match(/(iphone|ipad)[^;]*;/i)?.[0]?.trim() || "Unknown Apple Model";
        }
        if (/android/i.test(userAgent)) {
            return userAgent.match(/android[^;]*;/i)?.[0]?.trim() || "Unknown Android Model";
        }
        return "Unknown Model";
    }

    /**
     * Genera un objeto `Device` con la información del dispositivo actual.
     * @returns {Device} Un objeto `Device` con los datos detectados.
     */

    static getDevice(): Device {
        const platform = DeviceUtil.detectPlatform();
    
        //const viewportWidth: number = window.innerWidth; // Ancho del área visible del navegador
        //const viewportHeight: number = window.innerHeight; // Alto del área visible del navegador
        //console.log(`Área visible del navegador: ${viewportWidth}x${viewportHeight}`);

        const browserwidth = window.innerWidth;
        const browserheight = window.innerHeight;
        const width = window.screen.width;
        const height = window.screen.height;
        const pixelratio = window.devicePixelRatio;
        const resolution = `${width}x${height}`;
        const os = DeviceUtil.detectOS();
        const useragent = navigator.userAgent;
    
        // Variables específicas según la plataforma (inicializadas con valores por defecto)
        let istouchdevice: boolean = false; // Valor por defecto
        let devicetype: string = "Unknown Device"; // Valor por defecto
        let model: string = "Unknown Model"; // Valor por defecto
    
        if (platform === TechBase.PLATF_MOBILE || platform === TechBase.PLATF_TABLET) {
            istouchdevice = DeviceUtil.isTouchDevice();
            devicetype = DeviceUtil.detectDeviceType();
            model = DeviceUtil.detectModel();
        } else if (platform === TechBase.PLATF_TV) {
            istouchdevice = false; // Los TVs generalmente no son táctiles
            devicetype = "Smart TV";
            model = "Unknown TV Model"; // No siempre se puede detectar el modelo
        } else if (platform === TechBase.PLATF_DESKTOP || platform === TechBase.PLATF_LAPTOP) {
            istouchdevice = DeviceUtil.isTouchDevice(); // Algunos escritorios/laptops pueden ser táctiles
            devicetype = DeviceUtil.detectDeviceType();
            model = "Unknown Desktop/Laptop Model"; // No siempre se puede detectar el modelo
        }

        const device = new Device(); 
        device.platform = platform;
        device.size= DeviceUtil.getDevRepSize(width);
        device.width = width;
        device.height = height;
        device.pixelratio = pixelratio;
        device.resolution = resolution;
        device.os = os;
        device.useragent = useragent;
        device.istouchdevice = istouchdevice;
        device.devicetype = devicetype;
        device.model = model;

        return device;
    }

}//end class