import _cloneDeep from "lodash/cloneDeep";



const state =  {
    name: "error",
    

    ERROR_MESSAGES:{
     '400':"Bad Request",
     '401':"Unauthorized",
     '403':"Forbidden",
     '404':"Not Found",
     '405':"Method Not Allowed",
     '500':"Internal Server Error",
     '502':"Bad Gateway"
    },

    /* error schema
    {
     title:"_error_title_",
     message:"_error_message_",
     agree:"_error_agree_"
    }
    */
   error:null


    
};

const mutations = {
    setError(state, { data }) {
       if(data==null){
          state.error =null
       }else{
       state.error = data.error;
       }
    },
};

const getters = {
     getError(state, { data }) {
         return state.error;
       },
};

const actions = {
     setError({ state, commit }, payload) {
          if (payload){
             
               let err = {
                    title:"Error",
                    message:"_error_message_",
                    agree:"Ok"
                   };


               if (payload.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    err.message= payload.response.statusText
               
               } else if (payload.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    err.message= "Error request";

               } else {
                    // Something happened in setting up the request that triggered an Error
                    err.message= payload.message;
               
               }

                commit("setError",{data: { 'error' :err}} );
          }else{

               commit("setError",{} );
          }


    },

   
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
