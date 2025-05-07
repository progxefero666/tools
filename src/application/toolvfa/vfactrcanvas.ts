
import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";
import { GraphUtil } from "@/common/graphics/util/graphutil";
import { VfaVideo } from "@/application/toolvfa/vfavideo";
import { XImage } from "@/multimedia/model/ximage";
import { CanvasPainter } from "@/common/graphics/cvpainter";
import { CvRect } from "@/common/graphics/model/cvrect";

import { ImageHelper } from "@/multimedia/helper/imagehelp";
import { cu } from "@/common/util/consolehelper";
import { ViImagerame } from "@/multimedia/model/videoimgframe";


export class VfaCtrlCanvas {

    public contDimension: Dimension;
    public viCanvasCoords: Point2D;
    public viCanvasDim: Dimension;
    public viBackcolor: string;
    public ctx: CanvasRenderingContext2D;
    public painter:CanvasPainter;

    public cvimages: ImageBitmap[] = [];
    public mmImages: XImage[] = [];

    constructor(virect:CvRect,ctx: CanvasRenderingContext2D, contDimension: Dimension) {
        this.ctx = ctx;
        this.contDimension = contDimension;
        this.viBackcolor    = virect.color;
        this.viCanvasDim    = GraphUtil.getEscDimensionByParent(this.contDimension,virect.dimension);
        this.viCanvasCoords = GraphUtil.getCenteredOrigin(this.contDimension,this.viCanvasDim);
        this.painter        = new CanvasPainter(this.ctx,this.viCanvasDim,this.viBackcolor);
        this.fillBack();
    }

    public async loadImages(listImages: XImage[]) {
        this.mmImages = listImages;
        this.cvimages = await ImageHelper.getCvImages(listImages);
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.contDimension.width, this.contDimension.height);
    }

    public fillBack() {        
        this.ctx.fillStyle = this.viBackcolor;
        this.ctx.fillRect(this.viCanvasCoords.x,this.viCanvasCoords.y,
                          this.viCanvasDim.width,this.viCanvasDim.height);
    }
    
    public drawVideoFrame(viFrame: ViImagerame) {    
        this.fillBack();                      
        for(let idx=0;idx<viFrame.imgframes.length;idx++){
            const imgIndex = viFrame.imgframes[idx].srcindex;
            const paintDim:Dimension = GraphUtil
                .getEscDimensionByParent(this.viCanvasDim,this.mmImages[imgIndex].dimension);
            const paintCoord:Point2D = GraphUtil.getCenteredOrigin(this.contDimension,paintDim);
            this.painter.drawImageBitmap(this.cvimages[imgIndex],
                                            paintCoord,paintDim,viFrame.imgframes[idx].alpha);                     
        }        
    }



} //end class
