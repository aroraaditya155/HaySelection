export class CdsService{
    context: ComponentFramework.Context<unknown>;
    constructor(context?:ComponentFramework.Context<unknown>){
        if(context){
            this.context=context;
        }
    }
    async getCountries(EntityName: string,Query: string): Promise<any>{
        const records=this.context.webAPI.retrieveMultipleRecords(EntityName, Query);
        return records;
    }
    async update(EntityName: string,Id:string,data:any): Promise<any>{
       await this.context.webAPI.updateRecord(EntityName,Id,data);
    }
}