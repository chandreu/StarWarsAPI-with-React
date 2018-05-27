import React from 'react';

class Swapi extends React.Component {
  state = {
    homeworld: '',
    films: '',
    species: '',
    vehicles: '',
    starships: '',
  }

  getSwapi = async (link, type) => {
    const apiCall = await fetch(link);
    const data = await apiCall.json();

    if (type === 'homeworld') this.setState({ homeworld: data.name });
    else if (type === 'species') this.setState({ species: data.name });
  }

  renderDetails() {
    const {
      name,
      height,
      hairColor,
      eyeColor,
      birthYear,
      weight,
      skinColor,
      gender,
      homeworldUrl,
      speciesArr,
      error,
    } = this.props;

    const {
      homeworld,
      species,
      films,
      vehicles,
      starships,
    } = this.state;

    if (name) {
      if (!homeworld) this.getSwapi(homeworldUrl, 'homeworld');
      if (!species) this.getSwapi(speciesArr[0], 'species');

      return (
        <div className="character-details">
          <div className="col-xs-12">
            <p className="character-details__key character-details__name">
              <span className="character-details__value">{ name }</span>
            </p>
          </div>
          <div className="col-xs-6">
            <p className="character-details__key">
              Height: <span className="character-details__value">{ height }cm</span>
            </p>
            <p className="character-details__key">
              Hair Color: <span className="character-details__value">{ hairColor }</span>
            </p>
            <p className="character-details__key">
              Eye Color: <span className="character-details__value">{ eyeColor }</span>
            </p>
            <p className="character-details__key">
              Birth Year: <span className="character-details__value">{ birthYear }</span>
            </p>
            <p className="character-details__key">
              Species: <span className="character-details__value">{ species }</span>
            </p>
          </div>
          <div className="col-xs-6">
            <p className="character-details__key">
              Weight: <span className="character-details__value">{ weight }kg</span>
            </p>
            <p className="character-details__key">
              Skin Color: <span className="character-details__value">{ skinColor }</span>
            </p>
            <p className="character-details__key">
              Gender: <span className="character-details__value">{ gender }</span>
            </p>
            <p className="character-details__key">
              Homeworld: <span className="character-details__value">{ homeworld }</span>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <p className="character-details__error">{ error }</p>
      </div>
    );
  }

  render() {
    return (
      this.renderDetails()
    );
  }
}

export default Swapi;
