

/**
 * class Plane2dDef
 */
export class Plane2dDef {

    public width:number=0;
    public deepth:number=0;
    public sidesw:number=0;
    public sidesd:number=0;
    public countv:number=0;

    constructor(width: number = 0, deepth: number = 0, sidesw: number = 0, sidesd: number = 0) {
        this.width = width;
        this.deepth = deepth;
        this.sidesw = sidesw;
        this.sidesd = sidesd;
        this.countv = (this.sidesw+1) * (this.sidesd+1);
    }

}//end 