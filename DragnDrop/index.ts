import { IInputs, IOutputs } from "./generated/ManifestTypes";
import Vue from 'vue';
import App from './vue-drag-drop/src/App.vue';
import { Bay, IBoxProps } from "./DragBox";
import { BoxRecord } from "./DragBox";



import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import { timeStamp } from "console";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class DragnDrop implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private mainContainer: HTMLDivElement;
	/**
	 * Empty constructor.
	 */
	constructor() {

	}
	private _container: any;
	private vue: any;
	private appElement: HTMLDivElement;
	private boxArray: BoxRecord[];
	public supplierItems: BoxRecord[];
	public boxitem: BoxRecord;
	public bayArray: Bay[];
	public bay:Bay;
	private _props: IBoxProps={
		attribute1Name:"",
		attribute2Name:"",
		attribute3Name:"",
		rowLocationName:"",
	 columnLocationName:""
	};

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		// // Add control initialization code
		// this._container = container;

		// Get Properties Name
	



		this.appElement = document.createElement("div");
			this.bayArray =[];
	
	// 	let tempSupplierItems: BoxRecord[] ;

	// 	tempSupplierItems = [];

	
		
	// 	tempBoxItem = new BoxRecord();
	// 	tempBoxItem.name = context.parameters.attribute1.raw
	// 	tempBoxItem.property1 =   context.parameters.attribute2.raw
	// 	tempBoxItem.property2 =  context.parameters.attribute3.raw
	// 	tempBoxItem.bay = context.parameters.columnPositionAttribute.row;

	// 	tempSupplierItems.push(tempBoxItem);
	// 	let tempDragboxObj : DragBox;
	// 	tempDragboxObj = new DragBox();
	// 	tempDragboxObj.Name = "Customer";
	// 	tempDragboxObj.boxNumber = 1;
	// 	tempDragboxObj.items = tempSupplierItems;
	// 	this.dragboxObj = [];
	// 	this.dragboxObj.push(tempDragboxObj);




    // this.dragboxObj =[ 
    //   {
    //     boxNumber: 1,
	// 	Filters:[{
	// 		label: "commodity",
	// 		items:[{name:"Oaten",value:"12121"}],
	// 		type:"select"
	// 	}],
    //     items: [
    //       {
    //         name: "Buyer 1",
    //         property1: " Qty - 151",
	// 		property2: " Qty - 151",
	// 		id:"1"
			
    //       },
    //       {
    //         name: "Buyer 2",
    //         property1: " Qty - 152",
	// 		property2: " Qty - 151",
	// 		id:"1"
    //       },
    //       {
    //         name: "Buyer 3",
    //         property1: " Qty - 150",
	// 		property2: " Qty - 150",
	// 		id:"1"
    //       },
    //       {
    //         name: "Buyer 4",
    //         property1: " Qty - 150",
	// 		property2: " Qty - 150",
	// 		id:"1"
    //       }
    //     ],
    //     Name: "Buyer",
    //   }];
	this.bayArray = [{
		items: [{
			"property1": "Oaten Hay",
			"property2": "Batch1",
			"property3": "Diary Special",
			"id": "12",
			"location": "1",
			"bay": "1"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch2",
			"property3": "Diary Special",
			"id": "13",
			"location": "2",
			"bay": "1"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch3",
			"property3": "Diary Special",
			"id": "14",
			"location": "3",
			"bay": "1"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch4",
			"property3": "Diary Special",
			"id": "15",
			"location": "4",
			"bay": "1"
		}],
		"bayNumber": "1",
		"Name": "Bay 1",
		"size": 4
	}, {
		"items": [{
			"property1": "Oaten Hay",
			"property2": "Batch5",
			"property3": "Diary Special",
			"id": "16",
			"location": "1",
			"bay": "2"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch6",
			"property3": "Diary Special",
			"id": "17",
			"location": "2",
			"bay": "2"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch7",
			"property3": "Diary Special",
			"id": "18",
			"location": "3",
			"bay": "2"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch8",
			"property3": "Diary Special",
			"id": "19",
			"location": "4",
			"bay": "2"
		}],
		"bayNumber": "2",
		"Name": "Bay 2",
		"size": 4
	}, {
		"items": [{
			"property1": "Oaten Hay",
			"property2": "Batch9",
			"property3": "Diary Special",
			"id": "20",
			"location": "1",
			"bay": "3"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch10",
			"property3": "Diary Special",
			"id": "21",
			"location": "2",
			"bay": "3"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch11",
			"property3": "Diary Special",
			"id": "22",
			"location": "3",
			"bay": "3"
		}, {
			"property1": "Oaten Hay",
			"property2": "Batch12",
			"property3": "Diary Special",
			"id": "23",
			"location": "4",
			"bay": "3"
		}],
		"bayNumber": "3",
		"Name": "Bay 3",
		"size": 4
	}]

		container.appendChild(this.appElement);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void { debugger;
		// Add code to update control view
		//let columnsOnView = this.getSortedColumnsOnView(context);
		if (context.parameters.StockDataSet.loading) return;
		const dataSet = context.parameters.StockDataSet;
		const dataSetColumns = dataSet.columns;
		this._props.attribute1Name = context.parameters.attribute1.raw as string;
		this._props.attribute2Name =   context.parameters.attribute2.raw as string;
		this._props.attribute3Name =  context.parameters.attribute3.raw as string;
		this._props.rowLocationName = context.parameters.rowPositionAttribute.raw as string;
		this._props.columnLocationName = context.parameters.columnPositionAttribute.raw as string;

	
		const records = dataSet.sortedRecordIds.map(function(key){
			let row = dataSet.records[key];
			let myRow:any ={
				key:row.getRecordId()
			};
			
			dataSetColumns.forEach(col => {
				myRow[col.name] = row.getValue(col.name);
			});
			return myRow;
		});
		let boxItem: BoxRecord;
		let bayNum:number;
	//	this.bayArray =[];
		this.boxArray=[];
		bayNum=1;
		records.forEach(rec=>{
			if(bayNum == rec[this._props.columnLocationName])
			{
				boxItem = new BoxRecord();
				boxItem.property1 = rec[this._props.attribute1Name];
				boxItem.property2 =   rec[this._props.attribute2Name];
				boxItem.property3 =  rec[this._props.attribute3Name];
				boxItem.id =  rec["id"];
				boxItem.location =  rec[this._props.rowLocationName];
				boxItem.bay = rec[this._props.columnLocationName];
				this.boxArray.push(boxItem);
			}
			else{
				this.bay = new Bay();
				this.bay.items = this.boxArray;
				this.bay.bayNumber = bayNum.toString();
				this.bay.Name = "Bay " +bayNum;
				this.bay.size = 4;
				this.bayArray.push(this.bay);
			    bayNum = rec[this._props.columnLocationName];
				this.boxArray = [];
				boxItem = new BoxRecord();
				boxItem.property1 = rec[this._props.attribute1Name];
				boxItem.property2 =   rec[this._props.attribute2Name];
				boxItem.property3 =  rec[this._props.attribute3Name];
				boxItem.id = rec["id"];
				boxItem.location =  rec[this._props.rowLocationName];
				boxItem.bay = rec[this._props.columnLocationName];
				this.boxArray.push(boxItem);
			}
		
		});




		this.vue = new Vue({ el: this.appElement, render: (h) => h(App, { props: { bayArray: this.bayArray}, }), });

		// this.labelElement = document.createElement("div");
		// 	this.labelElement.innerHTML = "Aditya";

		// this.mydivContainer = document.createElement("div");
		// this.labelElement.innerHTML = "Aditya";
		// this.mydivContainer.appendChild(this.labelElement);
		// this.theContainer.appendChild(this.mydivContainer);

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
