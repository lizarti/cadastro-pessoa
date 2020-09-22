import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { IMaskDirective } from 'vue-imask';
import PictureInput from 'vue-picture-input';
import App from './App.vue';
import './registerServiceWorker';
import '@/assets/css/styles.css';
import router from './router';
import store from './store';
import NotificationPlugin from './plugins/notification';
import DialogPlugin from './plugins/dialog';
import installComponents from './components';
import TResourceList from './components/app/TResourceList.vue';

Vue.config.productionTip = false;

/* plugins */
Vue.use(Vuelidate);
Vue.use(NotificationPlugin);
Vue.use(DialogPlugin);
Vue.directive('mask', IMaskDirective);

Vue.component(PictureInput.name, PictureInput);

/* install common components, under src/components */
installComponents(Vue);

/* app components */
Vue.component(TResourceList.name, TResourceList);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
