import axios from "axios";
import EventBus from '@/Bus';
import Vue from 'vue'
export default () => {
    
    const BASE_URL = process.env.BASE_URL;
    const API_URL = process.env.API_URL;
    
    /*const BASE_URL =Vue.config.BASE_URL ;
    const API_URL =Vue.config.API_URL ;*/

    const api = axios.create({
        baseURL: Vue.config.BASE_URL,
        withCredentials: false,

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
           
        }
     });
     api.interceptors.request.use(function (config) {
        // Do something before request is sent
       
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
     api.interceptors.response.use(function (response) {
          
          // Do something with response data
      
         return response;
        }, function (error) {
        
               // Do something with response error
               EventBus.$emit('error-event', error);
               return Promise.reject(error);

          });

    return api;
};
