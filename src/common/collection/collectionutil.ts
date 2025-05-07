

interface HasOrden {
    orden?: number;
}

export class CollectionUtil<T extends HasOrden> {

    constructor(){}

    public applyCollecionOrden(elements: Array<T>): void {
        elements.forEach((element, index) => {
            element.orden = index;
        });
    }

}//end class