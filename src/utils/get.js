const get = (obj, key) => {
  if (!obj) {
    return undefined;
  }
  if (!key) {
    return undefined;
  }
  return key.split('.').reduce((o, x) => {
    if (typeof o === 'undefined' || o === null) {
      return o;
    }
    return o[x];
  }, obj);
};

export default get;
