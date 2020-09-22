import EventEmitter from '../utils/EventEmitter';

const isObject = (val) => val !== null && typeof val === 'object';

class Notification extends EventEmitter {
  notify(notification) {
    this.emit('notify', notification);
  }

  info(notification) {
    const notificationObject = Notification.createNotificationObject(notification);
    notificationObject.type = 'info';
    this.notify(notificationObject);
  }

  warn(notification) {
    const notificationObject = Notification.createNotificationObject(notification);
    notificationObject.type = 'warn';
    this.notify(notification);
  }

  error(notification) {
    const notificationObject = Notification.createNotificationObject(notification);
    notificationObject.type = 'error';
    this.notify(notificationObject);
  }

  success(notification) {
    const notificationObject = Notification.createNotificationObject(notification);
    notificationObject.type = 'success';
    this.notify(notificationObject);
  }

  static createNotificationObject(notification) {
    if (!isObject(notification)) {
      return {
        content: notification,
      };
    }
    return notification;
  }
}

const instance = new Notification();

export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$notification', {
    get() {
      return instance;
    },
  });
}
