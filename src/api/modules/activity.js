import Api from '../'
import Vue from 'vue'
export default {
    
    
    get_config(){
         return new Promise((res,rej) => {
        //Api().get('${ baseUrl }/Data.json',{})
     
    
        Api().get('config/data.json',{})
            .then((response) => {
                res(response.data);
            })
            .catch((err) => {
                rej(err);
            });
    })
    },
    

    
    get_activity(data) {  
        return new Promise((res,rej) => {
           
            Api().get(Vue.config.API_URL+'api/activity',data)
                .then((response) => {
                    res(response.data);
                })
                .catch((err) => {
                    rej(err);
                });
        })
    },
    filter_activity(data) {  
        let query = "?"; 
        let keys = Object.keys(data);
       
        for (let i in keys) {
            if(data[keys[i]]!=null){
                query += encodeURIComponent(keys[i])+"="+encodeURIComponent(data[keys[i]])+"&";
            }
            
        }
    
        
        return new Promise((res,rej) => {
          
            Api().get(Vue.config.API_URL+'api/activity'+query)
                .then((response) => {
                    res(response.data);
                })
                .catch((err) => {
                    rej(err);
                });
        })
    },
}