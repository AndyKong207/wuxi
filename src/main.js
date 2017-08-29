import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

import formatDate from './util/DateFormat';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import jQuery from 'jQuery';
// Vue.user(jQuery);

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);


import {requestConfig} from './util/config.js'

// console.log(requestConfig.request_prefix);

import VictimAccount from 'components/page/VictimAccount.vue';
import CriminalInfo from 'components/page/CriminalInfo.vue';
import store from './store/store'

import VDT from  './util/vdt';

Vue.component('victim-account', VictimAccount);
Vue.component('criminal-info', CriminalInfo);

// require('./vuetable.json');

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$config = requestConfig;
Vue.prototype.jQuery = jQuery;
Vue.prototype.$cookie = VueCookie;
Vue.prototype.formatDate = formatDate;
Vue.prototype.VDT = VDT;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
