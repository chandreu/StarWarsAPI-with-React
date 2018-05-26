import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Swapi from './components/Swapi';

class App extends React.Component {
  state = {
    name: undefined,
    height: undefined,
    mass: undefined,
    hair_color: undefined,
    skin_color: undefined,
    error: undefined,
  }

  getSwapi = async (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;

    const apiCall = await fetch(`https://swapi.co/api/people/?search=${query}`);
    const data = await apiCall.json();

    if (data.count > 0) {
      this.setState({
        name: data.results[0].name,
        height: data.results[0].height,
        mass: data.results[0].mass,
        hair_color: data.results[0].hair_color,
        skin_color: data.results[0].skin_color,
      });
    } else {
      this.setState({
        error: 'No such character found',
      });
    }
  }

  render() {
    return (
      <div>
        <Titles />
        <Form getSwapi={this.getSwapi} />
        <Swapi
          name={this.state.name}
          height={this.state.height}
          mass={this.state.mass}
          hair_color={this.state.hair_color}
          skin_color={this.state.skin_color}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
