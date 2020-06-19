import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { added } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        if (event.target.new.value) {
            dispatch(createAnecdote(event.target.new.value))
            dispatch(added(event.target.new.value))
            event.target.new.value = ""
        }
    }

  return (
      <form onSubmit = {create}>
        <div><input name = "new"/></div>
        <button type = "submit">create</button>
      </form>
  )
}

export default AnecdoteForm
