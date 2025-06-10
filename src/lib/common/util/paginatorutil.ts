

export class PaginatorUtil {

   static getCountPages(countPageRow: number, countRows: number): number {
       if (countPageRow <= 0) {
           throw new Error("El número de filas por página debe ser mayor que cero.");
       }
       const result = Math.ceil(countRows / countPageRow);
       return result;
   }
    
   static getRowIndex(countRowsInPage: number, pageIndex: number): number {
        if(pageIndex<1){
            return 0;
        }
        return (countRowsInPage*pageIndex);
   }

   static getCountPageRows(countRowsInPage: number, countRows: number,pageIndex:number): number {
        const countPages = PaginatorUtil.getCountPages(countRowsInPage,countRows);
        if(countPages<0){
            return -1;
        }
        if(countPages==1){
            return countRows;
        }        
        if(pageIndex<(countPages-1)){
            return countRowsInPage;
        }
        const indexFirstRow = pageIndex * countRowsInPage;
        return countRows-indexFirstRow;
    }
   

   //class PaginatorUtil.getCurrentPage(pageCountRows: number, rowRefIndex: number)
   static getCurrentPage = (pageCountRows: number, rowRefIndex: number): number => {
        if (pageCountRows <= 0) {
            throw new Error("El número de elementos por página debe ser mayor que cero.");
        }
        if (rowRefIndex < -1) {
            throw new Error("El índice de referencia no puede ser menor que -1.");
        }
        // Si rowRefIndex es -1, significa que no hay elementos ni páginas
        if (rowRefIndex === -1) {
            return 0;
        }
        const currentPage = Math.floor(rowRefIndex / pageCountRows) + 1;
        return currentPage;
    };

}//end class