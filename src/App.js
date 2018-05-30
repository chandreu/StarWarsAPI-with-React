import React from 'react';
import axios from 'axios';
import Titles from './components/Titles';
import Form from './components/Form';
import Swapi from './components/Swapi';

class App extends React.Component {
  state = {
    name: '',
    height: '',
    weight: '',
    hairColor: '',
    skinColor: '',
    eyeColor: '',
    birthYear: '',
    gender: '',
    homeworld: '',
    films: '',
    species: '',
    vehicles: '',
    starships: '',
    error: '',
  }

  apiCall = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;

    this.setState({
      name: '',
      height: '',
      weight: '',
      hairColor: '',
      skinColor: '',
      eyeColor: '',
      birthYear: '',
      gender: '',
      homeworld: '',
      films: '',
      species: '',
      vehicles: '',
      starships: '',
      error: '',
    });

    axios.get(`https://swapi.co/api/people/?search=${query}`)
      .then((data) => {
        return { person: data.data.results[0] };
      })
      .then((data) => {
        if (data.person) {
          this.setState({
            name: data.person.name,
            height: data.person.height,
            weight: data.person.mass,
            hairColor: data.person.hair_color,
            skinColor: data.person.skin_color,
            eyeColor: data.person.eye_color,
            birthYear: data.person.birth_year,
            gender: data.person.gender,
            error: '',
          });
        } else {
          this.setState({
            name: '',
            height: '',
            weight: '',
            hairColor: '',
            skinColor: '',
            eyeColor: '',
            birthYear: '',
            gender: '',
            homeworld: '',
            films: '',
            species: '',
            vehicles: '',
            starships: '',
            error: 'No such character found',
          });
        }
        return {
          homeworld: data.person.homeworld,
          species: data.person.species[0],
          filmsArr: data.person.films,
          vehiclesArr: data.person.vehicles,
          starshipsArr: data.person.starships,
        };
      })
      .then((data) => {
        function getHomeworld() { return axios.get(data.homeworld); }
        function getSpecies() { return axios.get(data.species); }
        function getFilms() { return axios.all(data.filmsArr.map(l => axios.get(l))); }
        function getVehicles() { return axios.all(data.vehiclesArr.map(l => axios.get(l))); }
        function getStarships() { return axios.all(data.starshipsArr.map(l => axios.get(l))); }

        axios.all([getSpecies(), getHomeworld(), getFilms(), getVehicles(), getStarships()])
          .then(axios.spread((species, homeworld, films, vehicles, starships) => {
            function dataIterator(array) {
              let list = '';
              for (let i = 0; i < array.length; i += 1) {
                list += `${array[i].data.title || array[i].data.name}`;
                if (i < array.length - 1) list += ', ';
              }
              return list;
            }

            const filmsList = dataIterator(films);
            const vehiclesList = dataIterator(vehicles);
            const starshipsList = dataIterator(starships);

            return {
              homeworld: homeworld.data.name,
              species: species.data.name,
              films: filmsList,
              vehicles: vehiclesList,
              starships: starshipsList,
            };
          }))
          .then((arrayedData) => {
            this.setState({
              homeworld: arrayedData.homeworld,
              species: arrayedData.species,
              films: arrayedData.films,
              vehicles: arrayedData.vehicles,
              starships: arrayedData.starships,
            });
          });
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
  }

  render() {
    const {
      name,
      height,
      hairColor,
      eyeColor,
      birthYear,
      weight,
      skinColor,
      gender,
      homeworld,
      films,
      species,
      vehicles,
      starships,
      error,
    } = this.state;

    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form apiCall={this.apiCall} />
                  <Swapi
                    name={name}
                    height={height}
                    weight={weight}
                    hairColor={hairColor}
                    skinColor={skinColor}
                    eyeColor={eyeColor}
                    birthYear={birthYear}
                    gender={gender}
                    homeworld={homeworld}
                    films={films}
                    species={species}
                    vehicles={vehicles}
                    starships={starships}
                    error={error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
