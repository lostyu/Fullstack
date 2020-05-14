import React from 'react';

const Total = (props) => {

  const total = props.parts.reduce((acc, cur) => {
    return acc + cur.exercises
  }, 0)

  return (
    <strong>total of {total} exercises</strong>
  );
}

export default Total;