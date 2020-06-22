import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const anecdotes = useSelector(state => state.anecdotes)
  // const filter = useSelector(state => state.filter)
  const ordered = props.anecdotes.sort((a,b) => b.votes - a.votes)
  // const dispatch = useDispatch()

  const vote = (anecdote) => {
      props.voteAnecdote(anecdote)
      props.setNotification(`you voted for "${anecdote.content}"`, 5000)
  }

  const filtered = ordered.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))

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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
