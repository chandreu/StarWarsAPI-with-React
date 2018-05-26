import React from 'react';

const Form = props => (
  <form onSubmit={props.getSwapi}>
    <input type="text" name="query" placeholder="Search..." required="required" />
    <button>Search</button>
  </form>
);

export default Form;
