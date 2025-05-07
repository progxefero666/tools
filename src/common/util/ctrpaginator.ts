
import { PaginatorData } from "./paginatordata";
import { PaginatorUtil } from "./paginatorutil";


/**
 * Note: All page indices begin at 1 for the first page.
 */
export class CtrlPaginator {

    public defaultPCR: number =5
    public countRows: number = 0;
    public countPages: number = 0;
    public pageIndex: number = 0;
    public pagePreIndex: number = 0;
    public pageNextIndex: number = 0;
    public countPageRows: number = 0;
    // UI component flags
    public uiflagPagePreEnabled: boolean = false;
    public uiflagPageNextEnabled: boolean = false;

    constructor(defaultPCR?: number, countRows?: number) {
        if (defaultPCR)  {this.defaultPCR = defaultPCR;} 
        if (countRows)   {this.countRows = countRows;}    
        //this.update();
    }

    getPageFirstRowIndex= (): number => {
        return PaginatorUtil.getRowIndex(this.defaultPCR,this.pageIndex);
    }

    getPaginatorData= (): PaginatorData => {
        return new PaginatorData(
            this.pageIndex,
            this.uiflagPagePreEnabled,
            this.uiflagPageNextEnabled);
    }

    clear = (): void => {
        this.countRows = 0;
        this.countPages = 0;
        this.countPageRows = 0;
        this.pageIndex = 0;
        this.pagePreIndex = -1;
        this.pageNextIndex = -1;
        this.uiflagPagePreEnabled = false;
        this.uiflagPageNextEnabled = false;
    };

    addElements = (countNewElements: number): void => {
        this.countRows += countNewElements;
        this.countPages = PaginatorUtil.getCountPages(this.defaultPCR, this.countRows);
        this.pageIndex = this.countPages-1;
        this.update();
    };    

    insertElements = (insertIndex: number, countNewElements: number): void => {
        this.countRows += countNewElements;
        this.countPages = PaginatorUtil.getCountPages(this.defaultPCR, this.countRows);
        const lastInsertedIndex = insertIndex + countNewElements - 1;   
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, lastInsertedIndex);             
        this.update();
    };    

    deleteElement = (elementIndex: number): void => {
        this.countRows -= 1;
        if(this.countRows==0){
            this.clear();
            return;
        }
        this.countPages = PaginatorUtil.getCountPages(this.defaultPCR, this.countRows);
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, elementIndex);
        this.update();
    }

    moveElementUp = (elementIndex: number): void => {
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, elementIndex);
        this.update();
    }       

    moveElementDown = (elementIndex: number): void => {
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, elementIndex);
        this.update();
    }       

    pagePrevious = (): void => {
        if(this.pageIndex>0){
            this.pageIndex -=1; 
        }
        this.update();
    }
    
    pageNext = (): void => {
        if(this.pageIndex<(this.countPages-1)){
            this.pageIndex +=1; 
        }        
        this.update();
    }

    update = (): void => {
        if(this.countRows>0){
            this.countPageRows = PaginatorUtil.getCountPageRows(this.defaultPCR, this.countRows,this.pageIndex);
            this.pagePreIndex = -1;
            this.uiflagPagePreEnabled = false;
            this.uiflagPageNextEnabled = false;

            if (this.pageIndex > 0) {
                this.pagePreIndex = this.pageIndex - 1;
                this.uiflagPagePreEnabled = true;
            }
            this.pageNextIndex = -1;
            if (this.pageIndex < (this.countPages-1)) {
                this.pageNextIndex = this.pageIndex + 1;
                this.uiflagPageNextEnabled=true;
            }          
        }
        else {
            this.clear();
        }
    }

}//end class