const fetchData = async (searchElement) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "3d207e49",
      s: searchElement,
    },
  });

  console.log(response.data);
};

fetchData();

const inputEl = document.querySelector("input");

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

const inputs = (event) => {
  fetchData(event.target.value);
};

inputEl.addEventListener("input", debounce(inputs, 500));

// const responsemoviedata = await axios.get("http://www.omdbapi.com/", {
//   params: {
//     apikey: "3d207e49",
//     i: "tt0848228",
//   },
// });

// console.log(responsemoviedata.data);
