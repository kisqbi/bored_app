<style scoped>   
    .text-field-mod{
        padding-top: 0px!important;
        margin-top:0!important;
        margin-bottom:22px!important; 
    }
    .activity-filter{
        width: 100%;
        margin-bottom:22px!important; 
        font-size: 12px;
    }   
    .activity-save{
        width: 100%;
        margin-bottom:22px!important; 
    }   

</style>
<template>
    <v-sheet class="fill-height">
        <v-row  align="stretch" no-gutters  class="mx-5 fill-height pt-10" >
            <v-col cols="6"  align-self="stretch">
                <v-row align="stretch" no-gutters class="fill-height">
                    <v-col v-if="this.loading&&this.error==null" cols="12"  align-self="center" class="text-center">
                        <v-progress-circular size="80" :width="3" color="pink" indeterminate></v-progress-circular>
                    </v-col>
                    <v-col v-if="!this.loading&&this.error==null" cols="12"  align-self="start">
                            <h1>{{labels.title}}</h1>
                            <h2>{{this.item.activity}}</h2>       
                    </v-col>
                    <v-col v-if="!this.loading&&this.error!=null" cols="12"  align-self="start">
                            <h1>{{labels.no_activity_title}}</h1>
                            <h2>{{this.error}}</h2>  
                    </v-col>
                    <v-col cols="12" align-self="end" >
                        <v-btn  
                            ref="form.save" 
                            tile color="indigo" 
                            dark 
                            class="activity-save" 
                            :disabled="!item.key" 
                            @click="saveActivity(item)" >
                            {{labels.save}}
                        </v-btn>   
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6" align-self="stretch">
                 <v-row   no-gutters class="fill-height mx-5">
                    <v-col cols="12" >
                        <v-subheader height="auto">{{labels.type}}</v-subheader>
                        <v-select
                            ref="form.type"
                            class="text-field-mod"
                            v-model="form.type"
                            :items="types"
                            menu-props="auto"
                            item-value="value"
                            item-text="text"
                            hide-details 
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-subheader>{{labels.participants}}</v-subheader>
                        <v-text-field 
                            ref="form.participants"
                            class="text-field-mod"
                            v-model="form.participants" 
                            readonly
                            type="number"
                            hide-details
                            append-outer-icon="mdi-plus"
                            @click:append-outer="increment" 
                            prepend-icon="mdi-minus" 
                            @click:prepend="decrement"     
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-subheader>{{labels.price}}</v-subheader>
                        <v-range-slider
                            ref="form.price"
                            v-model="form.price"
                            min="0"
                            max="100"
                            hide-details
                            @change="filterActivity()" 
                        ></v-range-slider> 
                        <v-row  no-gutters justify="space-between" class="mb-5">
                            <v-chip 
                               x-small
                               label
                               color="pink"
                               text-color="white"
                            >
                                {{labels.price_min}}
                            </v-chip>
                            <v-chip
                                x-small
                                label
                                color="pink"
                                text-color="white"
                            >
                                {{labels.price_max}}
                            </v-chip> 
                        </v-row>
                    </v-col>  
                    <v-col cols="12"  align-self="end">
                        <v-btn  
                            ref="form.activity_filter" 
                            class="activity-filter" 
                            tile color="indigo" 
                            dark 
                            @click="filterActivity()">
                                {{labels.activity_filter}}
                         </v-btn>
                    </v-col>
                 </v-row>
            </v-col>  
        </v-row>
    </v-sheet>
</template>

<script>
import apiActivity from "../api/modules/activity";
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('activity')

  export default {
    name: 'ActivitySearch',

    data: () => ({
        set_form_from_default:true,
        set_form_from_activity:true,
        error:null,
        loading: false,
        //labels:{},
        //rules:{},
        //types:[],
        item:{},
        form : {},
        
       

    }),

     created: function () {

        
        /* Set some props to instance data if we need to edit , if we do we need to remove from computed MapState method and */
        //this.labels = this.labels;

        //this.types = this.defaults.types;
        this.form = this.defaults.form;


        this.item = {key:null,'activity': this.form.activity};
       
        this.$nextTick(() => {
            this.set_form_from_default = false;
                this.getRandom();
            });
        
        
  },
    watch: {
        "form.participants": function (newVal, oldVal) {
            let min = this.rules.participants.min;
            let max = this.rules.participants.max;
            let re = /[^0-9]/gi;
           
            if (newVal < min) {
                this.form.participants = min;
            }
            if (newVal > max) {
                this.form.participants = max;
            }   
           
            if(!this.set_form_from_activity && !this.set_form_from_default){
               this.filterActivity();
            }
        },

        "form.type": function (newVal, oldVal) {
            if(!this.set_form_from_activity && !this.set_form_from_default){
               this.filterActivity();
            }

        },
    },
    computed: { 
        ...mapState({
            defaults: state => state.defaults,
            settings: state => state.defaults.settings,
            labels: state => state.labels,
            types: state => state.defaults.types,
            rules: state => state.defaults.rules
            
        }),

        price_range_precision(){
            return Math.pow(10,this.settings.price_range_precision);
        },
        minprice(){
            return this.form.price[0]/this.price_range_precision;
        },
        maxprice(){
            return this.form.price[1]/this.price_range_precision;
        },
       
    },

    methods: { 
        ...mapActions({
            saveActivity: 'setItemByKey', 
            getActivityPromise: 'getActivityPromise',    
            filterActivityPromise: 'filterActivityPromise',    
        }),

        increment(el) {
            this.$refs['form.participants'].focus()
            this.form.participants++;
        },
        decrement (el) {
            this.$refs['form.participants'].focus()
            this.form.participants--;
        },
        /* Handle all Response on this instance. */
        handleActivityResponse(res,method){
            this.loading =false
            if (res.hasOwnProperty('error')){
                this.error = res.error;
                this.item = {};
                return;
            }
            this.error = null;
            this.item = res;
            
            switch(method) {
                case 'get_random':
                    if(this.error==null){
                        this.setForm(res);
                    }
                    this.$nextTick(() => {
                         this.set_form_from_activity = false;
                    });  
                    break;
                case 'filter_activity':

                    break;
                default:
                
            }  
        },

        setForm(data){  
            this.form.type = data.type;
            this.form.participants  = data.participants;
            this.form.price = [data.price*this.price_range_precision,data.price*this.price_range_precision];
            this.form.activity = data.activity;
        },
        getRandom() {
            this.loading =true
            this.set_form_from_activity = true;

            this.getActivityPromise().then(res => {
                this.handleActivityResponse(res,'get_random')  
            }).catch((err) => {});
        },
        filterActivity() {
            this.loading =true
            let data = Object.assign({},this.form);
            data.minprice = this.minprice;
            data.maxprice = this.maxprice;
            data.activity =null;

            
            this.filterActivityPromise(data).then(res => {
                this.handleActivityResponse(res,'filter_activity')  
            }).catch((err) => {});
           
        },

    }
  }
</script>
