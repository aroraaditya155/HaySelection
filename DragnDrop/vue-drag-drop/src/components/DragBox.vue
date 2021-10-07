<template>
 <div class="drag-drop-box">          
    <div class="row">
      
      <div class="col-md-3 drag-col1" v-for="bay in bayArray" :key="bay.bayNumber">
        <div class="p-2 alert alert-warning">
          <p>{{ bay.Name }}</p>          
<div class="list-group-item" v-for="(item, index) in bay.items" :key="index" :baydragabble="item.bay" :locationdraggable="item.location" :id="index+item.bay+item.location">
    <draggable class="list-group list-col1" v-if="item.flag ==='1' "   :baydragabble="item.bay" :locationdraggable="item.location" group="items" @add="onAdd" :id="item.bay+item.location">            
            <div class="list-group-item" v-if="item.empty ==='0' " :bay="item.bay" :location="item.location" dirty="fasle" :prebay="item.bay" :prelocation="item.location" :id="item.id">
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
    
  </div> <!-- end row-->
   <div class="row">
     <button primary v-on:click="saveClick">Save</button>
     <button primary v-on:click="reset">Reset</button>
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
.hidden {
  display: none;
}
.drag-col1 {
  min-height: 250px;
  width: 25%;
  float: left;
  background-color: #fff3cd;
  margin: 15px;
  padding: 10px;
  align-content: center;
  align-items: center;
  color: #856404;
}
.drag-col2 {
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
.list-col1 {
  min-height: 250px;
  background-color: #fff3cd;
  margin: 15px;
  padding: 10px;
  align-content: center;
  align-items: center;
}
.list-col2 {
  min-height: 250px;
  background-color: #d4edda;
  margin: 15px;
  padding: 10px;
  align-content: center;
  align-items: center;
}
.list-group-item {
  background-color: #fff;
  border-bottom: solid;
  border-top-color: rgba(0, 0, 0, 0.125);
  border-top-style: solid;
  border-top-width: 1px;
  border-right-color: rgba(0, 0, 0, 0.125);
  border-right-style: solid;
  border-right-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.125);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-color: rgba(0, 0, 0, 0.125);
  border-left-style: solid;
  border-left-width: 1px;
  border-image-source: initial;
  border-image-slice: initial;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: initial;
  padding: 0.75rem 1.25rem;
}
h3 {
  font-size: 1.75rem;
}
p {
  padding: 3px;
}
</style>
