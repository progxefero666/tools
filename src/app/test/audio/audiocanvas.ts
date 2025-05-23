import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";
import { GraphUtil } from "@/common/graphics/util/graphutil";
import { CanvasPainter } from "@/common/graphics/cvpainter";


/**
 * class AudioCanvas
 */
export class AudioCanvas {

    public center:Point2D;
    public objcanvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public dimension: Dimension;
    public backcolor: string;

    public painter: CanvasPainter;

    constructor(objcanvas: HTMLCanvasElement, dimension: Dimension, backcolor: string) {
        this.objcanvas = objcanvas;
        this.ctx = objcanvas.getContext('2d')!;
        this.dimension = dimension;
        this.center = new Point2D(Math.floor(this.dimension.width/2),Math.floor(this.dimension.height/2));
        this.backcolor = backcolor;
        this.painter = new CanvasPainter(this.ctx, this.dimension, this.backcolor);
        this.clear();
        this.render();
    }
    
    public fillback() {
        this.ctx.fillStyle = this.backcolor;
        this.ctx.fillRect(0, 0, this.dimension.width, this.dimension.height);        
    }

    public render() {
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.dimension.width, this.dimension.height); 
    }
        
    public start = () => {
        this.animate();
    }

    public animate = async () => {
        this.clear();        
        // paint png elements
        requestAnimationFrame(this.animate);
    }

} //end class

