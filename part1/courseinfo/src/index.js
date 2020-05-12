import React from 'react';
import ReactDOM from 'react-dom';


const Header = ({ course }) =>
  <>
    <h1>{course}</h1>
  </>

const Content = (props) => {

  const { part1, part2, part3, exercises1, exercises2, exercises3 } = props;
  return (
    <>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>

      <p>
        {part3} {exercises3}
      </p>
    </>
  )
}

const Total = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const obj = { part1, part2, part3, exercises1, exercises2, exercises3 };
  const obj_total = { exercises1, exercises2, exercises3 };

  return (
    <div>
      <Header course={course} />
      <Content {...obj} />
      <Total {...obj_total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))