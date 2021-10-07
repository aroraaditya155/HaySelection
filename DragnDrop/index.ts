import { IInputs, IOutputs } from "./generated/ManifestTypes";
import Vue from 'vue';
import App from './vue-drag-drop/src/App.vue';
import { Bay} from "./DragBox";
import { BoxRecord } from "./DragBox";
import { CdsService } from "./CdsService";

import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class DragnDrop implements ComponentFramework.StandardControl<IInputs, IOutputs> {	
	private _context: any;
	public vue: any;
	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	private appElement: HTMLDivElement;	
	public boxitem: BoxRecord;
	public bayWithStackArray:Bay[]=[];
	public bayWithNoStackArray:Bay[]=[];
	public bay:Bay;
	

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		
		
		this._context=context;
		this.appElement = document.createElement("div");		
		container.appendChild(this.appElement);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void { 

		//Main Logic
		this.LoadView(context);	
	}
	//Data binding Logic
	LoadView(context: ComponentFramework.Context<IInputs>):void{
		//@ts-ignore
		let entityId=context.page.entityId;		
		let numofBays=0;
		let numberofStacks=0;
		this.bayWithStackArray=[];
		this.bayWithNoStackArray=[];
		if(!context.parameters.WarehouseDataSet.loading){
			let currentRecord=context.parameters.WarehouseDataSet.records[entityId];
			numofBays=parseInt(currentRecord.getFormattedValue("vel_numberofbays"));
			numberofStacks=parseInt(currentRecord.getFormattedValue("vel_numberofstacks"));						
		}
		this.LoadDataWithStack(numofBays,numberofStacks,this.bayWithStackArray,context);
		this.LoadNoStackData(this.bayWithNoStackArray,numberofStacks,context);
		//Bind Vue	
		this.vue = new Vue({
			el: this.appElement, 
			render: (h) => h(App, { 
				props: { 
					bayArray: this.bayWithStackArray,
					bayNoLocationArray:this.bayWithNoStackArray,
					onSave:this.OnSave
				   }, }), });
	}
	LoadDataWithStack(numofBays:number,numberofStacks:number,bayWithStackArray:Bay[],context: ComponentFramework.Context<IInputs>):void{
		//This is used to fill the bay and stock 
		for(let i=0;i<numofBays;i++){
			let temBay=new Bay();
			temBay.Name="Bay "+(i+1);
			temBay.bayNumber=(i+1).toString()
			temBay.size=numberofStacks;
			let tempBox: BoxRecord[]=[];			
			for(let j=0;j<numberofStacks;j++){
				let found=false;				
				let baynum=i+1;
				let locnum=j+1;
				if(!context.parameters.StockOnHandDataSet.loading){					
					context.parameters.StockOnHandDataSet?.sortedRecordIds.forEach((recordId)=>{
						let currentRecord=context.parameters.StockOnHandDataSet.records[recordId];
						let tempBoxItem = new BoxRecord();
						tempBoxItem.bay=currentRecord.getFormattedValue("vel_bay");
						tempBoxItem.location=currentRecord.getFormattedValue("vel_stackrank");						
						if(baynum===parseInt(tempBoxItem.bay) && locnum===parseInt(tempBoxItem.location)){
							tempBoxItem.property1=currentRecord.getFormattedValue("vel_name");
							tempBoxItem.property2=currentRecord.getFormattedValue("vel_productcategory");
							tempBoxItem.property3=currentRecord.getFormattedValue("vel_grade");										
							if(baynum===1&&locnum===1){
								//This is used as a place holder for bay 1 and stack 1 			
								tempBoxItem.flag="0";								
							}else{
								tempBoxItem.flag="1";
							}
							tempBoxItem.empty="0";								
							tempBoxItem.id=recordId;
							tempBox.push(tempBoxItem);	
							found=true;		
						}												
					});
				}				
				if(!found){	
					let tempBoxEmptyItem = new BoxRecord();
					tempBoxEmptyItem.bay=baynum.toString();
					tempBoxEmptyItem.location=locnum.toString();
					if(baynum===1&&locnum===1){
						tempBoxEmptyItem.flag="0";								
					}else{
						tempBoxEmptyItem.flag="1";
					}	
					tempBoxEmptyItem.empty="1";
					tempBox.push(tempBoxEmptyItem);		
				}	
			}
			temBay.items=tempBox;
			bayWithStackArray.push(temBay);			
		}
	}
	//...........No Stack Logic..............
	LoadNoStackData(bayWithNoStackArray:Bay[],numberofStacks:number,context: ComponentFramework.Context<IInputs>):void{		
		let tempNoStackBox: BoxRecord[]=[];
		let NoStack=new Bay();
		NoStack.Name="Bay 1";
		NoStack.bayNumber="1";
		NoStack.size=numberofStacks;
		if(!context.parameters.StockOnHandDataSet.loading){					
			context.parameters.StockOnHandDataSet?.sortedRecordIds.forEach((recordId)=>{
				let currentRecord=context.parameters.StockOnHandDataSet.records[recordId];
				let tempBoxItem = new BoxRecord();
				tempBoxItem.bay="1";
				tempBoxItem.location=currentRecord.getFormattedValue("vel_stackrank");	
				if(currentRecord.getFormattedValue("vel_bay")==="1"&&tempBoxItem.location==="1"){
					tempBoxItem.property1=currentRecord.getFormattedValue("vel_name");
					tempBoxItem.property2=currentRecord.getFormattedValue("vel_productcategory");
					tempBoxItem.property3=currentRecord.getFormattedValue("vel_grade");
					tempBoxItem.flag="0";
					tempBoxItem.empty="0";								
					tempBoxItem.id=recordId;
					tempNoStackBox.push(tempBoxItem);		
				}						
				if(!tempBoxItem.location){
					tempBoxItem.property1=currentRecord.getFormattedValue("vel_name");
					tempBoxItem.property2=currentRecord.getFormattedValue("vel_productcategory");
					tempBoxItem.property3=currentRecord.getFormattedValue("vel_grade");
					tempBoxItem.flag="0";
					tempBoxItem.empty="0";
					tempBoxItem.location="0";								
					tempBoxItem.id=recordId;
					tempNoStackBox.push(tempBoxItem);		
				}												
			});
			NoStack.items=tempNoStackBox;
			bayWithNoStackArray.push(NoStack);	
		}	
	}
	//Update CRM Record
	async UpdateBayAndLocation(bay:string,stack:string,guid:string): Promise<void> {
		let cdsService= new CdsService(this._context);
		let entityName="vel_stockonhand";		
		var data =
   		 {
        	"vel_bay": bay,
       	 	"vel_stackrank": stack, 
   		}	
		try{
			await cdsService.update(entityName,guid,data);
		}catch(ex){
			throw new Error("Stock On Hand record update error:"+ex);
		}
	}
	//Retrive dirty data 
	OnSave=(dirtyDiv: NodeListOf<Element>): void=>{
		for(let i=0;i<dirtyDiv.length;++i){
			console.log("Bay:"+dirtyDiv[i].getAttribute('bay'));
			console.log("Location:"+dirtyDiv[i].getAttribute('location'));	
			console.log("Record GUID:"+dirtyDiv[i].getAttribute('id'));		
			let bay=dirtyDiv[i].getAttribute('bay') ?? "";
			let stack=dirtyDiv[i].getAttribute('location') ?? "";
			let id=dirtyDiv[i].getAttribute('id')?? "";
			this.UpdateBayAndLocation(bay,stack,id);
			dirtyDiv[i].setAttribute('dirty', 'fasle');
			dirtyDiv[i].setAttribute('prebay', bay);
			dirtyDiv[i].setAttribute('prelocation', stack);
		  }
	}
	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}

	public addSupplier(): void {
		
	}

}
