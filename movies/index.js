const fetchData = async (searchElement) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "3d207e49",
      s: searchElement,
    },
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

fetchData();

const inputEl = document.querySelector("input");

const inputs = async (event) => {
  const movies = await fetchData(event.target.value);
  console.log(movies);

  for (let movie of movies) {
    const div = document.createElement("div");

    div.innerHTML = `
    <a href="#" class="dropdown-item">
    <img src="${movie.Poster}"/>
    <h1>${movie.Title}</h1>
    </a>
    `;
    document.querySelector(".dropdown-content").appendChild(div);
  }
};

inputEl.addEventListener("input", debounce(inputs, 500));

// const responsemoviedata = await axios.get("http://www.omdbapi.com/", {
//   params: {
//     apikey: "3d207e49",
//     i: "tt0848228",
//   },
// });

// console.log(responsemoviedata.data);
