

import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";
import { GraphUtil } from "@/common/graphics/util/graphutil";
import { CanvasPainter } from "@/common/graphics/cvpainter";
import { MMBase } from "@/multimedia/objtypes";
import { GeoTunel } from "@/common/geo/geotunel";
import { XCvDriver3d } from "@/common/geo/xdriver3d";
import { PointXYZ } from "@/common/system3d/model/pointxyz";


export class TestCtrlCanvas {

    public center:Point2D;
    public objcanvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public dimension: Dimension;
    public backcolor: string;

    public painter: CanvasPainter;
    public driver3d:XCvDriver3d;
    
    //public static readonly DEF_PY_DEPTHZ:number  = 500;
    
    constructor(objcanvas: HTMLCanvasElement, dimension: Dimension, backcolor: string) {
        this.objcanvas = objcanvas;
        this.ctx = objcanvas.getContext('2d')!;
        this.dimension = dimension;
        this.center = new Point2D(Math.floor(this.dimension.width/2),Math.floor(this.dimension.height/2));
        this.backcolor = backcolor;
        this.painter = new CanvasPainter(this.ctx, this.dimension, this.backcolor);
        this.driver3d = new XCvDriver3d(this.dimension,100,1,3);
        this.init();
        this.clear();
        this.render();
    }
    
    public init() {

    }

    public fillback() {
        this.ctx.fillStyle = this.backcolor;
        this.ctx.fillRect(0, 0, this.dimension.width, this.dimension.height);        
    }

    public render() {
        this.paintCube3D();
    }

    public paintCube3D() {

        this.painter.drawRect(this.driver3d.cvBackCoords,this.driver3d.cvBackRect);

        this.painter.drawLine2D(this.driver3d.cvAxisX);
        this.painter.drawLine2D(this.driver3d.cvAxisY);
        this.painter.drawLine2D(this.driver3d.cvAxisDeepth);
       
        let coords:Point2D = this.driver3d.getCoords(new PointXYZ(25,25,25));
        this.painter.drawCf(coords,5,"rgb(0 0 255)");
        coords = this.driver3d.getCoords(new PointXYZ(-25,25,25));
        this.painter.drawCf(coords,5,"rgb(0 0 255)");
        coords = this.driver3d.getCoords(new PointXYZ(-25,25,-25));
        this.painter.drawCf(coords,5,"rgb(0 0 255)");  
        coords = this.driver3d.getCoords(new PointXYZ(25,25,-25));
        this.painter.drawCf(coords,5,"rgb(0 0 255)");       

        coords = this.driver3d.getCoords(new PointXYZ(25,-25,25));
        this.painter.drawCf(coords,5,"rgb(255 0 255)");
        coords = this.driver3d.getCoords(new PointXYZ(-25,-25,25));
        this.painter.drawCf(coords,5,"rgb(255 0 255)");
        coords = this.driver3d.getCoords(new PointXYZ(-25,-25,-25));
        this.painter.drawCf(coords,5,"rgb(255 0 255)");  
        coords = this.driver3d.getCoords(new PointXYZ(25,-25,-25));
        this.painter.drawCf(coords,5,"rgb(255 0 255)");             
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

    public storeAnimation = async () => {
        this.ctx.clearRect(0, 0, this.dimension.width, this.dimension.height);        
        // paint code
        // capture canvas buffer
        const arrayBuffer = await this.captureCanvasToArrayBuffer(MMBase.MIMETYPE_IMAGE_PNG);
        console.log("Canvas captured:".concat(arrayBuffer.byteLength.toString()));
        requestAnimationFrame(this.animate);
    }

    private async captureCanvasToArrayBuffer(mimeType: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            this.objcanvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Error al capturar el canvas como Blob."));
                    return;
                }
    
                // Convertir el Blob a ArrayBuffer
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result instanceof ArrayBuffer) {
                        resolve(reader.result);
                    } else {
                        reject(new Error("El resultado no es un ArrayBuffer válido."));
                    }
                };
                reader.onerror = () => {
                    reject(new Error("Error al leer el Blob."));
                };
                reader.readAsArrayBuffer(blob);
            }, mimeType);
        });
    }

    private async captureCanvasToArrayBufferOld(mimetype:string): Promise<ArrayBuffer> {   
        return new Promise((resolve) => {
            this.objcanvas.toBlob(async (blob) => {
                if (!blob) {throw new Error("canvas to Blob error.");}            
                const arrayBuffer = await blob.arrayBuffer();
                resolve(arrayBuffer);
            },mimetype); 
        });
    }


} //end class

/*
function checkTransparency(imageUrl: string): void {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "anonymous"; // Necesario para imágenes externas

    img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data; // Array de píxeles (RGBA)

        let hasTransparency = false;
        for (let i = 3; i < pixels.length; i += 4) { // Canal alfa está en cada 4to valor
            if (pixels[i] < 255) { // Si el valor alfa es menor que 255
                hasTransparency = true;
                break;
            }
        }

        console.log(hasTransparency ? "La imagen tiene transparencia" : "La imagen no tiene transparencia");
    };

    img.onerror = () => {
        console.error("Error al cargar la imagen");
    };
}

// Uso del ejemplo
checkTransparency("/ruta/a/tu/imagen.png");
*/