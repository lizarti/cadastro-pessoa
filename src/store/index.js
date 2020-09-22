import Vue from 'vue';
import Vuex from 'vuex';
import modules from '@/modules';
import base from './base';

const moduleStores = {};

/* base */
moduleStores.base = base;

/* modules */
Object.keys(modules).forEach((name) => {
  if (modules[name].store.state) {
    moduleStores[name] = modules[name].store;
  }
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...moduleStores,
  },
});
