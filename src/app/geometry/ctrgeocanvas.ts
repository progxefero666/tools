//src\app\geometry\ctrgeocanvas.ts

import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";
import { GrSegment2D } from "@/common/graphics/model/grline2d";
import { MathGraphCanvasPainter } from "@/common/mathgraph/mathpainter";
import { MathGraph } from "@/common/mathgraph/mathgraph";
import { MathGrappAxisXY } from "@/common/mathgraph/model/axisxygraph";
import { CfCurve2d } from "@/common/geometry/model/cfcurve2d";
import { Vector2d } from "@/types/types";

/**
 * CtrlGeoCanvas class: controls a 2D canvas for geometric figures and curves.
 */
export class CtrlGeoCanvas {

    public padding: number = 8; 
    public cc: Vector2d = [0, 0]; 

    public objcanvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public dimension: Dimension;
    public graphDimension: Dimension = Dimension.DEF;
    public backcolor: string;
    public cvAxisX: GrSegment2D = GrSegment2D.DEF
    public cvAxisY: GrSegment2D = GrSegment2D.DEF
    public painter: MathGraphCanvasPainter;

    constructor(objcanvas: HTMLCanvasElement, dimension: Dimension, backcolor: string) {
        this.objcanvas = objcanvas;
        this.ctx = objcanvas.getContext('2d')!;
        this.dimension = dimension;
        this.backcolor = backcolor;
        this.painter = new MathGraphCanvasPainter(this.ctx, this.dimension, this.backcolor);
        this.cc     = [this.dimension.width / 2, Math.floor(this.dimension.height / 2)]
        this.chargeAxis();
        this.clear();
        this.renderAxis();
    };

    public chargeAxis() {
        /*
        this.graphDimension = new Dimension(
            this.dimension.width - (this.padding * 2),
            this.dimension.height - (this.padding * 2));
        */
        this.cvAxisX = new GrSegment2D(
            new Point2D(this.padding, (this.dimension.height / 2)),
            new Point2D(this.dimension.width - this.padding, (this.dimension.height / 2)),
            "rgb(255 0 255)");

        this.cvAxisY = new GrSegment2D(
            new Point2D(this.padding, this.dimension.height - this.padding),
            new Point2D(this.padding, this.padding),
            "rgb(255 255 0)");
    };

    public clear() {
        this.ctx.clearRect(0, 0, this.dimension.width, this.dimension.height);
    };

    public fillback() {
        this.ctx.fillStyle = this.backcolor;
        this.ctx.fillRect(0, 0, this.dimension.width, this.dimension.height);
    };

    public renderAxis() {
        this.painter.drawLine2D(this.cvAxisX);
        this.painter.drawLine2D(this.cvAxisY);
    };

    public renderFigure(radius: number, color: string, curves: CfCurve2d[]) {

        this.painter.dibujarBordeCircunferencia("#ff0000", this.cc, radius);

        for (let idx: number = 0; idx < curves.length; idx++) {
            const cvJointA: Vector2d = [this.cc[0] + curves[idx].joins[0][0], this.cc[1] + curves[idx].joins[0][1]];
            const cvJointB: Vector2d = [this.cc[0] + curves[idx].joins[1][0], this.cc[1] + curves[idx].joins[1][1]];
            this.painter.dibujarBordeCircunferencia("#00ffff", cvJointA, 3);
            this.painter.dibujarBordeCircunferencia("#00ffff", cvJointB, 3);
            const cvPoint: Vector2d = [this.cc[0] + curves[idx].point[0], this.cc[1] + curves[idx].point[1]]
            this.painter.drawCurve2D(
                color,
                cvPoint,
                curves[idx].radius,
                curves[idx].startAngle,
                curves[idx].endAngle,
                curves[idx].directionInvClockD);
        }
    };

    public renderMathGrappAxisXY(mathGraph: MathGrappAxisXY) {
        const lines_color: string = MathGraph.LINE_DEF_COLOR;
        const init_x: number = this.padding;
        const init_y: number = this.cc[1];
        let points: Point2D[] = [];
        for (let iter: number = 0; iter < mathGraph.dataX.length; iter++) {
            const x: number = init_x + mathGraph.dataX[iter];
            const y: number = init_y - mathGraph.dataY[iter];
            points.push(new Point2D(x, y));
        }
        this.painter.drawLines(points, lines_color);
    };

    /*     

    public start = () => {
        this.animate();
    }
    public animate = async () => {
        this.clear();
        requestAnimationFrame(this.animate);
    }
    */

} //end class