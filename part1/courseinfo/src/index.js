import React from 'react';
import ReactDOM from 'react-dom';


const Header = ({ course }) =>
  <>
    <h1>{course}</h1>
  </>

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
}

const Content = (props) => {

  const { part1, part2, part3 } = props;
  return (
    <div>
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
    </div>
  )
}

const Total = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const obj = { part1, part2, part3 };
  const obj_total = { exercises1: part1.exercises, exercises2: part2.exercises, exercises3: part3.exercises };

  return (
    <div>
      <Header course={course} />
      <Content {...obj} />
      <Total {...obj_total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))