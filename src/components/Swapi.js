import React from 'react';

class Swapi extends React.Component {
  state = {
    films: '',
    vehicles: '',
    starships: '',
  }
  componentWillReceiveProps() {
    this.setState({
      films: '',
      vehicles: '',
      starships: '',
    });
  }

  getArrayUrls = async (urls) => {
    try {
      const data = await Promise.all(urls.map(url =>
        fetch(url).then(response => response.json())));
      return (data);
    } catch (error) {
      console.log(error);
    }
  }

  async renderArrProps(arrayLink, prop) {
    const responses = await this.getArrayUrls(arrayLink);
    let titles = '';

    for (let i = 0; i < responses.length; i += 1) {
      if (prop === 'films') titles += `${responses[i].title}`;
      else titles += `${responses[i].name}`;
      if (i < responses.length - 1) titles += ', ';
    }
    if (prop === 'films') this.setState({ films: titles });
    if (prop === 'vehicles') this.setState({ vehicles: titles });
    if (prop === 'starships') this.setState({ starships: titles });
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
      homeworld,
      species,
      filmsArr,
      vehiclesArr,
      starshipsArr,
      error,
    } = this.props;

    const {
      films,
      vehicles,
      starships,
    } = this.state;

    if (name) {
      if (!films && filmsArr.length > 0) this.renderArrProps(filmsArr, 'films');
      if (!vehicles && vehiclesArr.length > 0) this.renderArrProps(vehiclesArr, 'vehicles');
      if (!starships && starshipsArr.length > 0) this.renderArrProps(starshipsArr, 'starships');

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
