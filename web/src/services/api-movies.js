// login

const getMoviesFromApi = (gender, sort) => {
  console.log(getMoviesFromApi);
  return fetch(`http://localhost:4000/movies/?gender=${gender}&sort=${sort}`)
    .then(response => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
