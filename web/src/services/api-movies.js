// login

const getMoviesFromApi = (gender, sort) => {
  console.log('películas de Mongoi');
  // return fetch(`http://localhost:4000/movies/?gender=${gender}&sort=${sort}`)
  return fetch (`//localhost:4000/movies_all_mongo/?gender=${gender}`)
    .then(response => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;

