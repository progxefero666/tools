import { PaginatorData } from "./paginatordata";
import { PaginatorUtil } from "./paginatorutil";



/**
 * Note: All page indices begin at 1 for the first page.
 */
export class CtrlPaginatorRefIndex {
    public static DEFPAGCR: number = 5;

    public defaultPCR: number = CtrlPaginatorRefIndex.DEFPAGCR;
    public countRows: number = 0;
    public rowRefIndex: number = -1;

    // Calculated properties
    public countPages: number = 0;
    
    public pagePreIndex: number = 0;
    public pageNextIndex: number = 0;
    public countPageRows: number = 0;

    // UI component flags
    public pageIndex: number = 0;
    public uiflagPagePreEnabled: boolean = false;
    public uiflagPageNextEnabled: boolean = false;

    constructor(defaultPCR?: number, countRows?: number, rowRefIndex?: number) {
        if (defaultPCR)  {this.defaultPCR = defaultPCR;} 
        if (countRows)   {this.countRows = countRows;}    
        if (rowRefIndex) {this.rowRefIndex = rowRefIndex;}
        this.update();
    }

    clear = (): void => {
        this.countRows = 0;
        this.rowRefIndex = -1;
        this.countPages = 0;
        this.countPageRows = 0;
        this.pageIndex = 0;
        this.pagePreIndex = 0;
        this.pageNextIndex = 0;
        this.update();
        this.updateUIFlags();
    };



    /**
     * Adds new elements to the paginator and updates the pagination data.
     * @param {number} countNewElements - The number of new elements to add.
     */
    addElements = (countNewElements: number): void => {
        this.countRows += countNewElements;
        this.countPages = PaginatorUtil.getCountPages(this.defaultPCR, this.countRows);
        const lastPageIndex = Math.floor((this.countRows - 1) / this.defaultPCR) * this.defaultPCR;
        this.rowRefIndex = Math.max(0, lastPageIndex);
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, this.rowRefIndex);
        const pageEndIndex = Math.min(this.countRows, this.rowRefIndex + this.defaultPCR);
        this.countPageRows = pageEndIndex - this.rowRefIndex;
        this.update();
    };

    /**
     * Inserts new elements at a specific index and updates the pagination data.
     * @param {number} insertIndex - The index where the new elements are inserted.
     * @param {number} countNewElements - The number of new elements to insert.
     */
    insertElements = (insertIndex: number, countNewElements: number): void => {
        this.countRows += countNewElements;
        this.countPages = PaginatorUtil.getCountPages(this.defaultPCR, this.countRows);
        const lastInsertedIndex = insertIndex + countNewElements - 1;
        const pageStartIndex = Math.floor(lastInsertedIndex / this.defaultPCR) * this.defaultPCR;
        this.rowRefIndex = pageStartIndex;
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, this.rowRefIndex);
        const pageEndIndex = Math.min(this.countRows, this.rowRefIndex + this.defaultPCR);
        this.countPageRows = pageEndIndex - this.rowRefIndex;
        this.update();
    };

    /**
     * Deletes an element at a specific index and updates the pagination data.
     * @param {number} elementIndex - The index of the element to delete.
     */
    deleteElement = (elementIndex: number): void => {
        this.countRows -= 1;
        this.countPages = PaginatorUtil.getCountPages(this.defaultPCR, this.countRows);

        let newRefIndex = -1;
        if (elementIndex > 0) {
            newRefIndex = elementIndex - 1;
        } else if (elementIndex < this.countRows) {
            newRefIndex = elementIndex;
        }

        if (newRefIndex >= 0) {
            this.rowRefIndex = Math.floor(newRefIndex / this.defaultPCR) * this.defaultPCR;
        } else {
            this.rowRefIndex = -1;
        }
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, this.rowRefIndex);

        if (this.rowRefIndex >= 0) {
            const pageEndIndex = Math.min(this.countRows, this.rowRefIndex + this.defaultPCR);
            this.countPageRows = pageEndIndex - this.rowRefIndex;
        } else {
            this.countPageRows = 0;
        }
        this.update();
    };

    /**
     * Moves to the previous page.
     */
    pagePrevious = (): void => {
        this.rowRefIndex = Math.max(0, this.rowRefIndex - this.defaultPCR);
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, this.rowRefIndex);
        const pageEndIndex = Math.min(this.countRows, this.rowRefIndex + this.defaultPCR);
        this.countPageRows = pageEndIndex - this.rowRefIndex;
        this.update();
    };

    /**
     * Moves to the next page.
     */
    pageNext = (): void => {
        this.rowRefIndex += this.defaultPCR;
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, this.rowRefIndex);
        const pageEndIndex = Math.min(this.countRows, this.rowRefIndex + this.defaultPCR);
        this.countPageRows = pageEndIndex - this.rowRefIndex;
        this.update();
    };

    update = (): void => {
        this.countPages = PaginatorUtil.getCountPages(this.defaultPCR, this.countRows);
        this.pageIndex = PaginatorUtil.getCurrentPage(this.defaultPCR, this.rowRefIndex);
        this.pagePreIndex = 0;
        if (this.pageIndex > 1) {
            this.pagePreIndex = this.pageIndex - 1;
        }
        this.pageNextIndex = 0;
        if (this.pageIndex < this.countPages) {
            this.pageNextIndex = this.pageIndex + 1;
        }
        this.updateUIFlags();
    };

    updateUIFlags = (): void => {
        this.uiflagPagePreEnabled = this.pagePreIndex > 0;
        this.uiflagPageNextEnabled = this.pageNextIndex > 0;
    };    
    //
    getPaginatorData= (): PaginatorData => {
        return new PaginatorData(
            this.pageIndex,
            this.uiflagPagePreEnabled,
            this.uiflagPageNextEnabled);
    }
}//end class