import React from 'react';
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
    filmsArr: [],
    species: '',
    vehiclesArr: [],
    starshipsArr: [],
    error: '',
  }

  getSwapi = async (e) => {
    this.setState({
      filmsArr: [],
      vehiclesArr: [],
      starshipsArr: [],
    });

    e.preventDefault();
    const query = e.target.elements.query.value;

    const apiCall = await fetch(`https://swapi.co/api/people/?search=${query}`);
    const data = await apiCall.json();

    const speciesCall = await fetch(data.results[0].species);
    const speciesData = await speciesCall.json();

    const homeworldCall = await fetch(data.results[0].homeworld);
    const homeworldData = await homeworldCall.json();

    if (data.count > 0) {
      this.setState({
        name: data.results[0].name,
        height: data.results[0].height,
        weight: data.results[0].mass,
        hairColor: data.results[0].hair_color,
        skinColor: data.results[0].skin_color,
        eyeColor: data.results[0].eye_color,
        birthYear: data.results[0].birth_year,
        gender: data.results[0].gender,
        homeworld: homeworldData.name,
        filmsArr: data.results[0].films,
        species: speciesData.name,
        vehiclesArr: data.results[0].vehicles,
        starshipsArr: data.results[0].starships,
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
        filmsArr: [],
        species: '',
        vehiclesArr: [],
        starshipsArr: [],
        error: 'No such character found',
      });
    }
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
      filmsArr,
      species,
      vehiclesArr,
      starshipsArr,
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
                  <Form getSwapi={this.getSwapi} />
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
                    filmsArr={filmsArr}
                    species={species}
                    vehiclesArr={vehiclesArr}
                    starshipsArr={starshipsArr}
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
