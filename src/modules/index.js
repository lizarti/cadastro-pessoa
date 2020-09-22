const modulesReq = require.context('./', true, /index\.js$/);
const dynamicModules = [];

modulesReq.keys().forEach((filename) => {
  if (filename !== './index.js') {
    const name = `${filename.split('.')[1].split('/')[1]}`;
    const module = modulesReq(filename).default;
    dynamicModules[name] = module;
  }
});

export default {
  ...dynamicModules,
};
