import axios from 'axios';
import * as config from './../constants/config';

export default function callApi (endpoint, method = "GET", body){
console.log(`${config.API_URL}/${endpoint}` , method)
    return axios({
        method:method,
        url: `${config.API_URL}/${endpoint}`,
        data:body
      }).catch(err =>{
        console.log(err);
      });

};

