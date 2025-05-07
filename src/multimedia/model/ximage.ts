
import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";
import { MMBase } from "../objtypes";
import { FileHelper } from "@/common/util/filehelper";
import { AppConstants } from "@/common/app/constants";


//const nodeBuffer = Buffer.from(imArrayBuffer);

/**
 * class XImage
 */
export class XImage {

    public storepath: string = AppConstants.UNDEFINED;
    public mimetype: string = AppConstants.UNDEFINED;
    public id: number;
    public fname: string;
    public dimension: Dimension;
    public coords: Point2D;
    public expanded: boolean;
    public orden: number = 0;

    public viBuffer:Buffer|null = null;

    public imArrayBuffer: ArrayBuffer;
    public viArrayBuffer: ArrayBuffer;
    public urlobj: any;
    public urlobjmini: any;

    constructor(id: number, fname: string, dimension: Dimension, coords: Point2D, orden: number, expanded: boolean,
                imbuffer: ArrayBuffer,vibuffer: ArrayBuffer, 
                urlobj?: any, urlobjmini?: any) {
        this.id = id;
        this.fname = fname;
        this.dimension = dimension;
        this.coords = coords;
        this.orden = orden;
        this.expanded = expanded;
        this.imArrayBuffer = imbuffer;
        this.viArrayBuffer =vibuffer;

        if (urlobj) { this.urlobj = urlobj; }
        if (urlobjmini) { this.urlobjmini = urlobjmini; }

        if (FileHelper.hasExtension(this.fname)) {
            const ext = FileHelper.getFileExtension(this.fname);
            this.mimetype = MMBase.getImageExtMimeType(ext);
        }
    }

    public getViUrlObject(): string {
        const blob = new Blob([this.viArrayBuffer], {type: this.mimetype});
        return URL.createObjectURL(blob);
      }

    public getJsonString(): string {
        const { imArrayBuffer: imbuffer, viArrayBuffer: vibuffer, urlobj, urlobjmini, ...rest } = this;
        return JSON.stringify(rest);
    }

    public setStoreFolder(folderPath: string): void {
        const sep: string = "/";
        this.storepath = folderPath.concat(sep).concat(this.fname);
    }

}//end class

