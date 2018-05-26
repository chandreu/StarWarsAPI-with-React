import React from 'react';

class Swapi extends React.Component {
  renderDetails() {
    // console.log(this.props.error);
    if (this.props.name) {
      return (
        <div>
          <p>Name: { this.props.name }</p>
          <p>Height: { this.props.height }cm</p>
          <p>Weight: { this.props.mass }kg</p>
          <p>Hair Color: { this.props.hair_color }</p>
          <p>Skin Color: { this.props.skin_color }</p>
        </div>
      );
    }
    return (
      <div>
        <p>{ this.props.error }</p>
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
