import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const ordered = anecdotes.sort((a,b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`you voted for "${anecdote.content}"`, 5000))
  }

  const filtered = ordered.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return (
      <div>
      {filtered.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default AnecdoteList
