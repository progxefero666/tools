
import { StorageService } from "@/lib/common/storage/sessionstrclient";


/**
 * class AppStorageService.KEY_NOT_FOUND
 */
export class AppStorage {

    static KEY_NOT_FOUND: string = "undefined";
    static AIPROJECTS_PROJECT_NAME: string = "project_name";

    public static saveProjectName(projectName: string): void {
        StorageService.save(AppStorage.AIPROJECTS_PROJECT_NAME, projectName);
    }
    public static readProjectName(): string {
        if (StorageService.exist(AppStorage.AIPROJECTS_PROJECT_NAME)) {
            return StorageService.read(AppStorage.AIPROJECTS_PROJECT_NAME) ?? AppStorage.KEY_NOT_FOUND;
        }
        return AppStorage.KEY_NOT_FOUND;
    }
} //end class