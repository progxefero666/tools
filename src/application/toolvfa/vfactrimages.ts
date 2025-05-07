
import { CmOperation } from "@/application/appcommon";
import { CollectionUtil } from "@/common/collection/collectionutil";
import { QueryCollection } from "@/common/collection/querycollection";
import { CtrlCollectionByIndex } from "@/common/collection/ctrlcollectionbyindex";
import { PaginatorData } from "@/common/util/paginatordata";
import { CtrlPaginator } from "@/common/util/ctrpaginator";
import { oh } from "@/common/util/alertutil";
import { XImage } from "@/multimedia/model/ximage";
import { AppConstants } from "@/common/app/constants";
import { CollCommandsIds } from "../collection/appcollection";


export class ViControlGrImages extends CtrlCollectionByIndex<XImage> {

    public static OPID_UPDATE_EXPANDED = "update_expanded";

    public ctrlPaginator: CtrlPaginator = new CtrlPaginator(6);
    public queryCollection: QueryCollection<XImage> = new QueryCollection<XImage>([]);
    public utilCollection: CollectionUtil<XImage> = new CollectionUtil();
    public rowIndex: number = -1;

    public opCollectionId:string = CmOperation.OPID_UNDEFINED;
    public opElementId:string = CmOperation.OPID_UNDEFINED;
    public futureInsertIndex:number=-1;
    public futureNewExpanded = false;
    
    // Constructor
    constructor() {
        super();
    }

    public clearOperations= (): void => {
        this.opCollectionId = CmOperation.OPID_UNDEFINED;
        this.opElementId = CmOperation.OPID_UNDEFINED;
        this.futureInsertIndex = -1;
        this.futureNewExpanded = false;
    }
    
    public execOperation = (operationId: string,
        newElements?: Array<XImage> | null,
        rowIndex?: number | null): boolean => {
        let result = false;

        if (operationId == CollCommandsIds.OPID_DELETEALL) {
            result = super.deleteAllElements();
            this.ctrlPaginator.clear();
            this.rowIndex = -1;
        }
        else if (operationId == CollCommandsIds.OPID_DELETE) {
            const deleteIndex = rowIndex!;
            result = super.deleteElement(deleteIndex);
            this.utilCollection.applyCollecionOrden(this.elements);
            this.ctrlPaginator.deleteElement(deleteIndex);
            if (this.ctrlPaginator.countRows == 0) {
                this.rowIndex = -1;
            }
            else {
                if (rowIndex! < this.ctrlPaginator.countRows) {
                    this.rowIndex = rowIndex!;
                }
                else {
                    this.rowIndex = rowIndex! - 1;
                }
            }
        }
        else if (operationId == CollCommandsIds.OPID_ADD) {
            const addElements = newElements!;
            result = super.addElements(addElements);
            if (result) {
                this.utilCollection.applyCollecionOrden(this.elements);
                this.ctrlPaginator.addElements(addElements.length);
                this.rowIndex = this.ctrlPaginator.countRows - 1;
            }
            else {
                this.rowIndex = -1;
            }
        }
        else if (operationId == CollCommandsIds.OPID_INSERT) {
            const addElements = newElements!;
            const insIndex = rowIndex!;
            result = super.insertElements(addElements, insIndex);
            if (result) {
                this.utilCollection.applyCollecionOrden(this.elements);
                this.ctrlPaginator.insertElements(insIndex, addElements.length ?? 0);
                this.rowIndex = insIndex + addElements.length - 1;
            }
        }
        else if (operationId == CollCommandsIds.OPID_REPLACE) {
            const addElements = newElements!;
            result = super.updateElement(rowIndex!, addElements[0]);
            this.rowIndex = rowIndex!;
        }
        else if (operationId == CollCommandsIds.OPID_MOVEUP) {
            if (rowIndex) {
                result = super.moveUp(rowIndex);
                this.rowIndex = rowIndex - 1;
            }
            this.utilCollection.applyCollecionOrden(this.elements);

        }
        else if (operationId == CollCommandsIds.OPID_MOVEDOWN) {
            if (rowIndex) {
                result = super.moveDown(rowIndex);
                this.rowIndex = rowIndex + 1;
            }
            this.utilCollection.applyCollecionOrden(this.elements);
        }
        return result;
    };

    public updateElementExpanded = (rowIndex: number): boolean => {
        this.elements[rowIndex].expanded = !this.elements[rowIndex].expanded;
        return true;
    };

    execCommonFilterUICollection = (opQueryId: string) => {
        if (opQueryId == CollCommandsIds.OPID_LOADPREVPAGE) {
            this.ctrlPaginator.pagePrevious();
        }
        else if (opQueryId == CollCommandsIds.OPID_LOADNEXTPAGE) {
            this.ctrlPaginator.pageNext();
        }
        this.rowIndex = this.ctrlPaginator.getPageFirstRowIndex();
    }

    getCollection = (): Array<XImage> => {
        if (this.ctrlPaginator.countRows < 1) { return []; }
        this.queryCollection.init(this.elements);
        const currPageFirstRowIndex = this.ctrlPaginator.getPageFirstRowIndex();
        const elems:XImage[] = this.queryCollection
            .getItemsByIndex(currPageFirstRowIndex, this.ctrlPaginator.countPageRows);

        return elems;
    };

    getCollectionRowIndex = (elems:XImage[],id:number): number => {
        let index = -1;
        for (let i = 0; i < elems.length; i++) {
            if (elems[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }

    setRowIndex = (id: number): void => {       
        this.rowIndex =  this.getIndexById(id);
    }

    
    getPaginatorData = (): PaginatorData => {
        return this.ctrlPaginator.getPaginatorData();
    }

    public getIndexById = (id: number): number => {
        let index = -1;
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public executeOpElement = (id: string, operation: string): boolean => {
        const elemIndex = this.getIndexById(Number(id));
        let result = false;
        switch (operation) {
            case CollCommandsIds.OPID_MOVEUP:
                result = this.execOperation(operation, null, elemIndex);
                break;
            case CollCommandsIds.OPID_MOVEDOWN:
                result = this.execOperation(operation, null, elemIndex);
                break;
            case CollCommandsIds.OPID_REPLACE:
                //oh.fm("OPID_REPLACEITEM");
                break;
            case ViControlGrImages.OPID_UPDATE_EXPANDED:
                result = this.updateElementExpanded(elemIndex);
                break;
        }    
        return result;    
    }

    toConsole() {
        alert(this.rowIndex)
        oh.f("rowIndex", this.rowIndex.toString());
        oh.f("pag pageIndex", this.ctrlPaginator.pageIndex.toString());
        oh.f("pag countPageRows", this.ctrlPaginator.countPageRows.toString());
    }

}//end class