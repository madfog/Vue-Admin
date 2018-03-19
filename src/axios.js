/**
 * Created by lanux on 2017/3/9.
 */
import axios from "axios";
import qs from 'qs';

// 适配vue-resource

const instance = axios.create();


console.log(config);
instance.interceptors.request.use(config => {
//Serialize.decode(config);
  config.data = qs.stringify(config.data);
  return config;
});
instance.interceptors.response.use(response => {
  return response.data;
}, err => {
  if (err.response) {
    axios.post('/v1/error', err.response);
    return Promise.reject(err.response.data);
  }
  return Promise.reject({code: 1024, message: err.message});
});


function plugin(Vue)
{
  if (plugin.installed) {
    return;
  }
  Vue.http = instance;
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
