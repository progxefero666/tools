import { GColors } from "../graphics/color/colorlib";
import { Point2D } from "../graphics/model/point2d";


/**
 * 
 */
export class GeoTunel {

    public static DEF:GeoTunel = new GeoTunel(0,0,0,Point2D.DEF,0,0);

    public static readonly cv_bcamcolor:string=GColors.RED;
    public static readonly cv_fcamcolor:string=GColors.BLUE;
    public static readonly DEF_cv_bcamradius:number=15;

    public cv_center:Point2D;
    public py_depthz:number;
    public py_bradius:number;
    public py_fradius:number;


    public cv_bcamcenter:Point2D= Point2D.DEF;
    public cv_fcamcenter:Point2D= Point2D.DEF;
    public cv_bcamradius:number;
    public cv_fcamradius:number;

    constructor(py_depthz:number,py_fradius:number,py_bradius:number,
                cv_center:Point2D,cv_bcamradius:number,cv_fcamradius:number){

        this.py_depthz = py_depthz;
        this.py_bradius = py_bradius;
        this.py_fradius = py_fradius;

        this.cv_center=cv_center;        
        this.cv_bcamradius = cv_bcamradius;
        this.cv_fcamradius = cv_fcamradius;
        this.cv_bcamcenter = cv_center.getCloned();
        this.cv_fcamcenter = cv_center.getCloned();
    }

    public getScaleZ(valueZ:number):number{
        //this.depthz -->100%
        //valueZ --> x% 
        return (valueZ * 100) / this.py_depthz;
    }

}//end class