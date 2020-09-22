const req = require.context('.', true, /\.vue$/);

const install = (Vue) => {
  req.keys().forEach((filename) => {
    const component = req(filename).default;
    const componentName = component.name || filename.substring(filename.lastIndexOf('/') + 1, filename.lastIndexOf('.vue'));
    Vue.component(componentName, component);
  });
};

export default install;
