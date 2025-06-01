
import { Vector2d } from "@/types/types";
import { GrSegment2D } from "../graphics/model/grline2d";
import { Point2D } from "../graphics/model/point2d";
import { Dimension } from "../model/base/dimension";

/**
 * class CanvasPainter: use instance
 */
export class MathGraphCanvasPainter {

    public ctx: CanvasRenderingContext2D;
    public dimension: Dimension;
    public backcolor: string;

    constructor(ctx: CanvasRenderingContext2D, dimension: Dimension, backcolor: string) {
        this.ctx = ctx;
        this.dimension = dimension;
        this.backcolor = backcolor;
    }
    
    public drawCurve2D(strokeColor: string, point: Vector2d, radius: number, startAngle: number, endAngle: number, counterclockwise: boolean) {
        this.ctx.beginPath();
        this.ctx.arc(point[0], point[1], radius, startAngle, endAngle, counterclockwise);
        this.ctx.strokeStyle = strokeColor; // Default color
        this.ctx.lineWidth = 2; // Default line width
        this.ctx.stroke();
        this.ctx.closePath();
    }//end  

    public drawLine2D(line2d: GrSegment2D) {
        this.drawLine(line2d.cero, line2d.uno, line2d.color);
    }//end    
    public drawLine(pointA: Point2D, pointB: Point2D, strokeColor: string) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.beginPath();
        this.ctx.moveTo(pointA.x, pointA.y);
        this.ctx.lineTo(pointB.x, pointB.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }//end

    public drawLines(points: Point2D[], strokeColor: string) {
        if (points.length < 2) { return; }
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.ctx.stroke();
    }//end    


    public dibujarBordeCircunferencia(strokeColor: string, point: Vector2d, radio: number): void {
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(point[0], point[1], radio, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    
}//end class