import React from 'react'
import { connect } from 'react-redux'
import { changed } from '../reducers/filterReducer'


const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.changed(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  {changed}
)(Filter)
