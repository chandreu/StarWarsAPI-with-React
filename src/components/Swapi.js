import React from 'react';

class Swapi extends React.Component {
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
      homeworld,
      species,
      films,
      vehicles,
      starships,
      error,
    } = this.props;

    if (name) {
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
          <div className="col-xs-12">
            <p className="character-details__key">
              Films: <span className="character-details__value">{ films }</span>
            </p>
          </div>
          <div className="col-xs-12">
            <p className="character-details__key">
              Vehicles: <span className="character-details__value">{ vehicles }</span>
            </p>
          </div>
          <div className="col-xs-12">
            <p className="character-details__key">
              Starships: <span className="character-details__value">{ starships }</span>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="character-details">
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
