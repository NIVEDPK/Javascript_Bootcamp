const debounce = (func, delay = 1000) => {
  let timeooutId;

  return (...args) => {
    if (timeooutId) {
      clearTimeout(timeooutId);
    }

    timeooutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
