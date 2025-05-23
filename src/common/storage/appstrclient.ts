
import {StorageService} from "@/common/storage/sessionstrclient";
import { Device } from "../tech/model/device";



export class AppStorageService {

    static APPDATA_ID:string  = "appdata";
    static APPDATA_FIELD_USERID:string  = "userid";
    static APPDATA_FIELD_USERDEVICE:string  = "userdevice";
    static APPDATA_FIELD_MODULEDATA:string  = "module";

    public static isUserLogin(): boolean {
       return StorageService.exist(AppStorageService.APPDATA_FIELD_USERID);
    }
    public static saveUserId(userid: number): void {
        StorageService.save(AppStorageService.APPDATA_FIELD_USERID,userid.toString());
    }

    public static readUserId(): number {
        const str = StorageService.read(AppStorageService.APPDATA_FIELD_USERID);
        return Number(str);
    }

    public static isDeviceCharged(): boolean {
        return StorageService.exist(AppStorageService.APPDATA_FIELD_USERDEVICE);
     }    
    public static saveUserDevice(device: Device): void {
        StorageService.save(AppStorageService.APPDATA_FIELD_USERDEVICE,device.getJsonString());
    }

    public static readUserDevice(): Device {
        const device =  StorageService.read(AppStorageService.APPDATA_FIELD_USERDEVICE);
        if(device){
            return Device.fromJson(device??null);
        }
        else {
            return new Device();
        }
       
    }

} //end class