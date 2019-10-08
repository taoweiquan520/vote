/* eslint no-underscore-dangle: "off" ,class-methods-use-this: "off" ,no-param-reassign:"off" */

import axios from 'axios';
import qs from 'qs';

class Ajax {
  install(Vue) {
    // ------------
    //  默认配置
    // ------------
    const ajax = axios.create({
      baseURL: '',
      timeout: 5000,
    });
    // ------------
    //  请求拦截器
    // ------------
    ajax.interceptors.request.use(
      (conf) => {
        // 在发送请求之前做些什么
        const { headers, data, method, url } = conf;

        // 增加时间戳防缓存。
        conf.url += `${url.indexOf('?') < 0 ? '?' : '&'}_t=${new Date() * 1}`;
        if (method === 'post' && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          conf.data = qs.stringify(data);
        }
        return conf;
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      },
    );

    // ------------
    //  响应拦截器
    // ------------
    ajax.interceptors.response.use(
      (response) => {
        // TODO: 具体的判断，待修改
        response = response.data || {};
        // 给返回数据加个请求是否成功的标志
        if (String(response.status) === '200') {
          // eslint-disable-next-line no-underscore-dangle
          response._success = true;
        } else {
          response._failed = true;
        }
        // 对响应数据做点什么
        return response;
      },
      (error) => {
        // 对响应错误做点什么
        return Promise.reject(error);
      },
    );

    Vue.prototype.$ajax = ajax;
  }
}

export default new Ajax();
