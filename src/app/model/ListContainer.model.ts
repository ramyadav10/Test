export class ListContainer{
    dataList:any[];
    pageNumber:number;
    offset:number;

    constructor(offset:number){
        this.dataList = [];
        this.pageNumber = 0;
        this.offset = offset;
    }
}