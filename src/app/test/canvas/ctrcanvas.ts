

import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";
import { GraphUtil } from "@/common/graphics/util/graphutil";
import { CanvasPainter } from "@/common/graphics/cvpainter";
import { MMBase } from "@/multimedia/objtypes";
import { GeoTunel } from "@/common/geo/geotunel";


export class TestCtrlCanvas {

    public center:Point2D;
    public objcanvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public dimension: Dimension;
    public backcolor: string;

    public painter: CanvasPainter;

    public static readonly DEF_PY_DEPTHZ:number  = 500;
    public static readonly DEF_PY_BRADIUS:number = 5;
    public static readonly DEF_PY_FRADIUS:number = 25;
    public geotunel:GeoTunel = GeoTunel.DEF;
    
    constructor(objcanvas: HTMLCanvasElement, dimension: Dimension, backcolor: string) {
        this.objcanvas = objcanvas;
        this.ctx = objcanvas.getContext('2d')!;
        this.dimension = dimension;
        this.center = new Point2D(Math.floor(this.dimension.width/2),Math.floor(this.dimension.height/2));
        this.backcolor = backcolor;
        this.painter = new CanvasPainter(this.ctx, this.dimension, this.backcolor);
        this.init();
        this.clear();
        this.render();
    }
    
    public init() {
        let fcamradius:number = 0;
        if(this.dimension.height>=this.dimension.width){
            fcamradius=Math.floor(this.dimension.height/2);
        }
        else {
            fcamradius=Math.floor(this.dimension.width/2);
        }
        this.geotunel = new GeoTunel(TestCtrlCanvas.DEF_PY_DEPTHZ,
                                     TestCtrlCanvas.DEF_PY_BRADIUS,
                                     TestCtrlCanvas.DEF_PY_FRADIUS,
                                     this.center,GeoTunel.DEF_cv_bcamradius,fcamradius);
    }
    public fillback() {
        this.ctx.fillStyle = this.backcolor;
        this.ctx.fillRect(0, 0, this.dimension.width, this.dimension.height);        
    }


    public paintGeoTunel() {
        this.painter.drawCf(this.geotunel.cv_bcamcenter,this.geotunel.cv_bcamradius,GeoTunel.cv_bcamcolor);
        this.painter.drawCf(this.geotunel.cv_fcamcenter,this.geotunel.cv_fcamradius,GeoTunel.cv_fcamcolor);
    }
    public render() {
        this.paintGeoTunel();
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