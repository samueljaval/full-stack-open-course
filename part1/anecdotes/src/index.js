import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const random = () => Math.floor(Math.random() * (anecdotes.length))

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const ShowAnecdote = ({arr1, i, arr2}) => (
    <>
    <div>{arr1[i]}</div>
    <div>has {arr2[i]} votes</div>
    </>
)

const add_vote = (votes, index, setVotes) => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
}


const App = (props) => {
    const [selected, setSelected] = useState(0)
    const initial = new Uint8Array(props.anecdotes.length)
    const [votes, setVotes] = useState(initial)
    const rand = random()
    const best = Math.max(...votes)
    console.log(votes)
    return (
        <div>
        <h1>Anecdote of the day</h1>
        <ShowAnecdote arr1={props.anecdotes} i={selected} arr2={votes}/>
        <div>
            <Button onClick = {() => add_vote(votes, selected, setVotes)} text = "vote"/>
            <Button onClick = {() => setSelected(rand)} text = "next anecdote"/>
        </div>
        <h1>Anecdote with the most votes</h1>
        <ShowAnecdote arr1={props.anecdotes} i={votes.indexOf(best)} arr2={votes}/>
        </div>
  )
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
