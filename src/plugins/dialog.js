/* eslint-disable class-methods-use-this */
import EventEmitter from '../utils/EventEmitter';
import TDialog from '../components/base/TDialog/TDialog.vue';

export default function install(Vue) {
  const TDialogClass = Vue.extend(TDialog);

  class Dialog extends EventEmitter {
    confirm(options) {
      const { title, content, options: dialogOptions } = options;

      const instanceDialog = new TDialogClass({
        propsData: {
          title,
          content,
          ...dialogOptions,
        },
      });

      instanceDialog.$mount();
      document.body.appendChild(instanceDialog.$el);

      return new Promise((resolve) => {
        instanceDialog.$on('ok', () => {
          document.body.removeChild(instanceDialog.$el);
          instanceDialog.$destroy();
          resolve(true);
        });
        instanceDialog.$on('cancel', () => {
          document.body.removeChild(instanceDialog.$el);
          instanceDialog.$destroy();
          resolve(false);
        });
      });
    }
  }

  const instance = new Dialog();

  Object.defineProperty(Vue.prototype, '$dialog', {
    get() {
      return instance;
    },
  });
}
