
import { Dimension } from "../model/base/dimension";
import { GColors } from "./color/colorlib";
import { LiveObjPoly } from "./model/grliveobjpoly";

import { GraphObjPoly } from "./model/grobjpoly";
import { Point2D } from "./model/point2d";

/**
 * class CanvasPainter: use instance
 */
export class CanvasPainter {

    public ctx: CanvasRenderingContext2D;
    public dimension: Dimension;
    public backcolor: string;

    constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, backcolor: string) {
        this.ctx = ctx;
        this.dimension = dimension;
        this.backcolor = backcolor;
    }

    
    public drawImageBitmap(img:ImageBitmap, pointxy: Point2D, dimension: Dimension,alpha:number):void{
        this.ctx.globalAlpha = alpha;
        this.ctx.drawImage(img, pointxy.x, pointxy.y, dimension.width, dimension.height);
        this.ctx.globalAlpha = 1;
    }//end

    public drawMemoryImagen(objectURL: string, pointxy: Point2D, dimension: Dimension) {
        const img = new Image();
        if (objectURL) {
            img.src = objectURL;
            img.onload = () => {
                this.ctx.drawImage(img, pointxy.x, pointxy.y, dimension.width, dimension.height);
            };
        }
    }//end

    public drawCf(center: Point2D,radius: number,strokeColor: string) {
        this.ctx.beginPath();
        this.ctx.arc(center.x,center.y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = strokeColor;
        this.ctx.stroke();        
    }//end

    public fillCf(center: Point2D,radius: number,fillColor?: string,strokeColor?: string) {
        this.ctx.beginPath();
        this.ctx.arc(center.x,center.y, radius, 0, Math.PI * 2);
        if (fillColor) {
            this.ctx.fillStyle = fillColor;
            this.ctx.fill();
        }
        if (strokeColor) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.stroke();
        }
    }//end    

    public drawGraphObjPoly(objPoly: GraphObjPoly) {        
        // set style
        if (objPoly.bcolor !== GColors.TRANSP) {
            this.ctx.lineWidth = objPoly.bsize;
            this.ctx.strokeStyle = objPoly.bcolor;
        }
        if (objPoly.color !== GColors.TRANSP) {this.ctx.fillStyle = objPoly.color;}
        // draw poly
        this.ctx.beginPath();
        this.ctx.moveTo(objPoly.points[0].x, objPoly.points[0].y); 
        for (let i = 1; i < objPoly.points.length; i++) {
            this.ctx.lineTo(objPoly.points[i].x, objPoly.points[i].y);             
        }
        this.ctx.closePath(); 
        // fill and border colors
        if (objPoly.color !== GColors.TRANSP)  {this.ctx.fill();}
        if (objPoly.bcolor !== GColors.TRANSP) {this.ctx.stroke();}
    }//end

    public drawLiveObjPoly(objPoly: LiveObjPoly) {        
        // set style
        if (objPoly.bcolor != null) {
            this.ctx.lineWidth = objPoly.bsize;
            this.ctx.strokeStyle = objPoly.bcolor.cvcolor;
        }
        if (objPoly.color!= null) {
            this.ctx.fillStyle = objPoly.color.cvcolor;
        }
        // draw poly
        this.ctx.beginPath();
        this.ctx.moveTo(objPoly.points[0].x, objPoly.points[0].y); 
        for (let i = 1; i < objPoly.points.length; i++) {
            this.ctx.lineTo(objPoly.points[i].x, objPoly.points[i].y);             
        }
        this.ctx.closePath(); 

        // fill and border colors
        if (objPoly.color!= null) {this.ctx.fill();}
        if (objPoly.bcolor != null){this.ctx.stroke();}
    }//end

    /*
    // Sombra
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    */

}//end class