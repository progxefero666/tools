
export class PaginatorData {
    public pageIndex: number = 0;
    public uiflagPagePreEnabled: boolean = false;
    public uiflagPageNextEnabled: boolean = false;
    
    constructor(pageIndex: number,uiflagPagePreEnabled: boolean,uiflagPageNextEnabled: boolean){
        this.pageIndex = pageIndex;
        this.uiflagPagePreEnabled = uiflagPagePreEnabled;
        this.uiflagPageNextEnabled = uiflagPageNextEnabled;
    }
}