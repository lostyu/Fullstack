import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Vote = (props) => {

  return (
    <div>
      <p>has {props.vote} votes</p>
      <button onClick={props.handleVote}>vote</button>
    </div>
  )
}

const MostVote = (props) => {

  const { points, anecdotes } = props;
  let most = 0;
  let select = 0;
  points.forEach((p, index) => {
    if (most < p) {
      most = p;
      select = index;
    }
  })

  

  const text = anecdotes[select];

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{text}</p>
      <p>has {most} votes</p>
    </div>
  )
}

const App = (props) => {
  const arr = new Array(props.anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(arr)

  const handleNext = () => {
    const num = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(num);
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const curVote = points[selected]

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div><button onClick={handleNext}>next anecdote</button></div>
      {props.anecdotes[selected]}
      <Vote vote={curVote} handleVote={handleVote} />
      <MostVote anecdotes={props.anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


