export class Bay{
bayNumber: string;
items : BoxRecord[];
Name: string;
size:number

}

export class BoxRecord{
    property3: string;
    property1: string;
    property2:string;
    id:string;
    bay:string;
    location:string;
   // id:string;
   
}

export interface IBoxProps {
   attribute1Name:string;
   attribute2Name:string;
   attribute3Name:string;
   rowLocationName:string;
columnLocationName:string;
  }

  export interface IAttributeValue {
    attribute: string;
    value: string;
  }
  
  export interface IStockRecord {
    key: string;
    values: IAttributeValue[];
  }