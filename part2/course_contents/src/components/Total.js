import React from 'react';

const Total = (props) => {

  const total = props.parts.reduce((acc, cur) => {
    return acc + cur.exercises
  }, 0)

  return (
    <h2>total of {total} exercises</h2>
  );
}

export default Total;