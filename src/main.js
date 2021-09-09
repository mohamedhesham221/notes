import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret,
  faFileImage,
  faLink,
  faThumbtack,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import './registerServiceWorker';
import './scss/main.scss';

Vue.config.productionTip = false;
library.add({
  faUserSecret, faFileImage, faLink, faThumbtack, faTrashAlt,
});
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
