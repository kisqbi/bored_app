import _cloneDeep from "lodash/cloneDeep";
import apiActivity from "@/api/modules/activity";

const state =  {
    name: "activity",
    
    labels:{
        title:"_title_",
        activity_filter:'_activity_filter_',
        save:'_save_',
        price_min:'_price_min_',
        price_max:'_price_max_',
        price:'_price_',
        participants:'_participants_',
        type:'_type_',  
        no_activity_title:"_no_activity_title_",    
        activity_title:"_activity_title_", 
        activity_list_title:"_activity_list_title_", 
        free_range:'_free_range_',
        cheap_range:'_cheap_range_',
        expensive_range:'_expensive_range_',
        clear_list:'_clear_list_',

    },

    defaults:{
        
        settings:{
            // price digit precision
            price_range_precision:2,
            price_ranges:{
                free_range:[0,0],
                cheap_range:[0,0.3],
                expensive_range:[0.3,1],
            },
            
        },
        form:{
            key:null,
            activity:'waiting for suggestion',
            price:[0,1],
            participants:1,
            type: null
        },
        rules: {
            participants:{
                min:1,
                max:5
            }
        },
   
        types :  [
            { value: 'education', text:'education', s_name:'Edu', display:{bg_color:'green',color:'white'} },
            { value: 'recreational',text:'recreational', s_name:'Rec', display:{bg_color:'indigo',color:'white'}  },
            { value: 'social',text:'social', s_name:'Soc', display:{bg_color:'blue',color:'white'}  },
            { value: 'diy' ,text:'diy', s_name:'Diy', display:{bg_color:'blue',color:'white'}  },
            { value: 'charity',text:'charity', s_name:'Cha', display:{bg_color:'pink',color:'white'}  },
            { value: 'cooking',text:'cooking', s_name:'Coo', display:{bg_color:'orange',color:'white'}  },
            { value: 'relaxation',text:'relaxation', s_name:'Rel', display:{bg_color:'blue',color:'white'}  },
            { value: 'music' ,text:'music', s_name:'Mus', display:{bg_color:'green',color:'white'}  },
            { value: 'busywork',text:'busywork', s_name:'bWo', display:{bg_color:'red',color:'white'} } 
          ], 
        type_display:{bg_color:'black',color:'white'},

        
    },

   
      
    items: [
        { "activity": "Paint the first thing you see", "accessibility": 0.2, "type": "recreational", "participants": 1, "price": 0.25, "link": "", "key": "1162360" },
        { "activity": "Go to a concert with local artists with some friends", "accessibility": 0.3, "type": "social", "participants": 3, "price": 0.4, "link": "", "key": "2211716" },
        { "activity": "Fix something that's broken in your house", "accessibility": 0.3, "type": "diy", "participants": 1, "price": 0.1, "link": "", "key": "6925988" }
    ],
    updated: "2000-06-05 12:30:22",
};

const mutations = {
    
    updateConfig(state, { data }) {
        state =Object.assign(state, _cloneDeep(data))
       
    },

    setItemByKey(state, { data }) {
        console.log('setItemByKey',data)
        let item = state.items.find(item => item.key === data.key);
        if (item) {
            item = Object.assign(item, _cloneDeep(data))
        } else {
            state.items.push(_cloneDeep(data));
        }
    },
    removeItemByKey(state, { key }) {
        let i = state.items.map(item => item.key).indexOf(key) // find index of your object
        state.items.splice(i, 1) // remove it from array
    },

    removeAllItems(state, { data }) {
        state.items = [];
    },
};

const getters = {
    getItemByKey: (state) => (key) => {
        console.log("getItemByKey",id)
         return state.items.find(item => item.key === key);
     },
     getItemsCount: (state)  => {
         return state.items.length;
     },
     getTypeByValue: (state) => (value) => {
         return state.defaults.types.find(item => item.value === value);
     },
   
};

const actions = {


    
    updateConfig({ state, commit }, payload) {
       
        commit("updateConfig", { data: payload });
    },
    setItemByKey({ state, commit }, payload) {
       
        commit("setItemByKey", { data: payload });
    },
    removeItemByKey({ state, commit }, payload) {
      
        commit("removeItemByKey", { data: payload });
    },
    removeAllItems({ state, commit }, payload) {
      
        commit("removeAllItems", { data: payload });
    },
    
    async getActivityPromise({ state, commit }, payload) {
        let response  = null;
       
        try {
            response = await apiActivity.get_activity(payload)
        } catch(err) {
            return Promise.reject(err);
        }  
        return response;
    },

    async filterActivityPromise({ state, commit }, payload) {
        
        let response  = null;
        try {
            response = await apiActivity.filter_activity(payload)
          } catch(err) {
            return Promise.reject(err);
          }
          
        return response;
         /* No need to catch. Api handle all the rejections. Its a sytem or root rejection error above statuscode 200. */
        /*return new Promise((res,rej) => {
            apiActivity.filter_activity(payload)
                .then((data) => {
                    res(data);
                })  
        })*/
        
    },


    getTypeByValue({ state, commit }, payload) {
        commit("getTypeByValue", { data: payload });
    },
   
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
