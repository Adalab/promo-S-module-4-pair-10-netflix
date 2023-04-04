// login

const getMoviesFromApi = (gender, sort) => {
  console.log(getMoviesFromApi);
  return fetch(`http://localhost:4000/movies/?gender=${gender}`)
    .then(response => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;

// http://localhost:4000/movies/?gender=${comedia}&sort=${asc}