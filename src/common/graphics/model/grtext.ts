
import { Fnt } from "@/common/app/appfont";
import { GrFont } from "./grfont";
import { GrObjBase } from "./grobjbase";
import { Point2D } from "./point2d";
import { TextBase } from "../graphixtexts";
import { XColor } from "../color/xcolor";
import { Graphix } from "../graphix";


/**
 * class XText
 */
export class XText extends GrObjBase {

    public font: GrFont;
    public value: string;
    public objmargin: number = 0;

    constructor(coords: Point2D, value: string, font: GrFont) {
        super(coords, null, true);
        this.value = value;
        this.font = font;
        this.dim = TextBase.getTextDimension(this.value, this.font);
        this.init();
    }

    public setValue(nvalue: string): void {
        if (TextBase.checkGrTextValue(nvalue)) {
            this.value = nvalue;
            this.dim = TextBase.getTextDimension(this.value, this.font);
            this.updateObjParams(Graphix.OBJ_PARAM_DIMENSION);
        }
    }

    public setPosition(ncoords:Point2D): void {
        this.move(ncoords);
    }

    public setFont(font: GrFont): void {
        this.font = font;
        this.dim = TextBase.getTextDimension(this.value, this.font);
        this.updateObjParams(Graphix.OBJ_PARAM_DIMENSION);
    }

    public changeFontParam(paramId: string, paramValue: unknown): void {

        if (paramId == Fnt.PARAM_FAMILY) {
            this.font.family = paramValue as string;
            this.dim = TextBase.getTextDimension(this.value, this.font);
            this.updateObjParams(Graphix.OBJ_PARAM_DIMENSION);
        }
        else if (paramId == Fnt.PARAM_SIZE) {
            this.font.size = paramValue as number
            this.dim = TextBase.getTextDimension(this.value, this.font);
            this.updateObjParams(Graphix.OBJ_PARAM_DIMENSION);
        }
        else if (paramId == Fnt.PARAM_COLOR) {
            this.font.color = paramValue as XColor;
        }
        else if (paramId == Fnt.PARAM_STYLE) {
            this.font.style = paramValue as number;
            this.dim = TextBase.getTextDimension(this.value, this.font);
            this.updateObjParams(Graphix.OBJ_PARAM_DIMENSION);
        }
        else if (paramId == Fnt.PARAM_ALIGN) {
            this.font.align= paramValue as number;
        }                        
    }

    public toJsonString(): string {
        return JSON.stringify(this,null,4);
    }

} //end class