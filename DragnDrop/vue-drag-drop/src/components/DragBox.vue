<template>
 <div id="dataSetRoot_StockOnHand" class=" drag-drop-box">  
   <div class="buttonset">
     <button primary v-on:click="saveClick">Save</button>
     <button primary v-on:click="reset">Reset</button>
    </div>        
      <div class="bay drag-col1" v-for="bay in bayArray" :key="bay.bayNumber">
        <div class="p-2 alert alert-warning">
          <h3>{{ bay.Name }}</h3>          
<div class="list-group-item" v-for="(item, index) in bay.items" :key="index" :baydragabble="item.bay" :locationdraggable="item.location" :id="index+item.bay+item.location">
    <h4>Stack {{item.location}}</h4>
    <draggable class="list-group list-col1" v-if="item.flag ==='1' "   :baydragabble="item.bay" :locationdraggable="item.location" group="items" @add="onAdd" :id="item.bay+item.location">            
            <div class="list-group-item-hay" v-if="item.empty ==='0' " :bay="item.bay" :location="item.location" dirty="fasle" :prebay="item.bay" :prelocation="item.location" :id="item.id">
              <p>{{ item.property1 }}</p>
              <p>{{ item.property2 }}</p>
              <p>{{ item.property3 }}</p>
              <p class="hidden" :id="item.id"></p>
              <p class="hidden" :bay="item.bay"></p>
              <p class="hidden" :rowLocation="item.location"></p>
            </div> 
          </draggable>           
          <draggable class="list-group list-col1"  group="items" v-if="item.flag ==='0' " @add="onAdd" :id="item.bay+item.location">
              <div class="list-group-item" v-for="(item, index) in bayNoLocationArray[0].items" :key="index" :bay="item.bay" :location="item.location" dirty="fasle" :prebay="item.bay" :prelocation="item.location" :id="item.id">
                <p>{{ item.property1 }}</p>
                <p>{{ item.property2 }}</p>
                <p>{{ item.property3 }}</p>
                <p class="hidden" :id="item.id"></p>
                <p class="hidden" :bay="item.bay"></p>
                <p class="hidden" :rowLocation="item.location"></p>
              </div>
              </draggable>                         
            </div>
        </div>
    </div>
</div>

</template>

<script>

import draggable from "vuedraggable";

export default {
  components: { draggable },

  props: {
    bayArray: [],
    bayNoLocationArray: [],
    onSave:[],
  },
  data() {
    return {     
    };
  },
  methods: {
    onAdd:function(e){  
      if(e.target.childElementCount >1 ){
        e.item.remove;        
        let bay = e.item.getAttribute('bay');         
        let location = e.item.getAttribute('location');       
        let parentEl="";              
        if(location!=="0"){  
          if(location==="1" && bay==="1"){
            parentEl  = document.getElementById("11");          
            parentEl.appendChild(e.item);    
          }else{
            parentEl  = document.querySelectorAll("[baydragabble='"+bay+"'][locationdraggable='"+location+"']")[0];
            parentEl.firstChild.appendChild(e.item);
          }        
                      
        }else{
          parentEl  = document.getElementById("11");          
          parentEl.appendChild(e.item);              
        }
       
      }
      else{
        //update bay and location
        let targetParentID=document.getElementById(e.target.id).parentNode.id;
        let targetParentBaydragabble=document.getElementById(targetParentID).getAttribute('baydragabble');
        let targetParentLocationdraggable=document.getElementById(targetParentID).getAttribute('locationdraggable');        
        e.item.setAttribute('bay', targetParentBaydragabble);
        e.item.setAttribute('location', targetParentLocationdraggable);
        e.item.setAttribute('dirty', true);
      } 
    },
    
    saveClick(){
      let dirtyDiv= document.querySelectorAll("[dirty='true']");
      this.onSave(dirtyDiv);      
    },
    reset(){
      let dirtyDiv= document.querySelectorAll("[dirty='true']"),i;
      for(i=0;i<dirtyDiv.length;++i){       
        let bay=dirtyDiv[i].getAttribute('prebay');
        let location=dirtyDiv[i].getAttribute('prelocation');         
        dirtyDiv[i].setAttribute('dirty', false);
        dirtyDiv[i].setAttribute('bay', bay);
        dirtyDiv[i].setAttribute('location', location);        
        let parentEl="";
        if(location==="0")        {
          parentEl  = document.getElementById("11");          
          parentEl.appendChild(dirtyDiv[i]);  
        }else{
          if(location==="1"&&bay==="1"){
            parentEl  = document.getElementById("11");          
            parentEl.appendChild(dirtyDiv[i]);  
          }else{
            parentEl  = document.querySelectorAll("[baydragabble='"+bay+"'][locationdraggable='"+location+"']")[0];
            parentEl.firstChild.appendChild(dirtyDiv[i]);
          }
        }
      }
    },
  },
};
</script>

<style>
/* CSS styling for JT Johnson Warehouse PCF Control */
/* Jady Mulqueeney */
/* Version 0.2 - 8 Oct 2021 */

#dataSetRoot_StockOnHand .drag-drop-box {
    width: auto;
    height: auto;
    display: flex;
    flex-flow: row nowrap;
    overflow: auto;
}

#dataSetRoot_StockOnHand .hidden {
    display: none;
}

#dataSetRoot_StockOnHand .drag-col1 {
    min-height: 75vh;
    width: auto;
    min-width: 150px;
    float: left;
    background-color: #f4f4f4;
    border: 1px solid #CFCDCC;
    margin: 40px 5px 8px 5px;
    padding: 10px;
    align-content: center;
    align-items: center;
    color: #333;
}

#dataSetRoot_StockOnHand .drag-col2 {
    min-height: 250px;
    width: 25%;
    float: left;
    background-color: #d4edda;
    margin: 15px;
    padding: 10px;
    align-content: center;
    align-items: center;
    color: #155724;
}

#dataSetRoot_StockOnHand .list-col1 {
    min-height: 6rem;
    background-color: #fff;
    margin: 0;
    padding: 8px;
    align-content: center;
    align-items: center;
}

#dataSetRoot_StockOnHand .list-col2 {
    min-height: 250px;
    background-color: #d4edda;
    margin: 15px;
    padding: 10px;
    align-content: center;
    align-items: center;
}

#dataSetRoot_StockOnHand .list-group-item {
    background-color: #fff;
    border: 0;
    padding: 0;
    margin-bottom: 8px;
    position: relative;
    z-index: 2;
}

#dataSetRoot_StockOnHand .list-col1 .list-group-item {
    border: 2px dashed #cfc18f;
    padding: 0 5px 3px 5px;
    background-color: #fff;
    cursor: move;
}

#dataSetRoot_StockOnHand h3 {
    font-size: 20px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 12px;
    color: #333;
}

#dataSetRoot_StockOnHand h4 {
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 12px;
    padding-left: 8px;
    color: #333;
}

#dataSetRoot_StockOnHand .list-group-item p {
    padding: 2px 3px 0 3px;
}

#dataSetRoot_StockOnHand .buttonset {
    position: absolute;
    right: 35px;
    top: 6px;
}

/* Green button */
#dataSetRoot_StockOnHand .buttonset button {
    outline: transparent;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    display: inline-block;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    padding: 0px 16px;
    border-radius: 2px;
    min-width: 172px;
    height: 32px;
    border: 1px solid #0A701A;
    background-color: #0A701A;
    color: #fff;
}

#dataSetRoot_StockOnHand .buttonset button:hover {
    background-color: #0a5416;
    border-color: #0a5416;
}

/* White button */
#dataSetRoot_StockOnHand .buttonset button:nth-of-type(2) {
    background-color: #fff;
    color: #333;
    border-color: #333;
    margin-left: 6px;
}

#dataSetRoot_StockOnHand .buttonset button:nth-of-type(2):hover {
    background-color: #f4f4f4;
    color: #111;
    border-color: #111;
}

/* Flex */
section#id-163 div.pa-at.pa-x.pa-as {
    width: 100%;
}
</style>
