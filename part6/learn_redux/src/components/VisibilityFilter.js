import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = props => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        checked={filter === 'ALL' ? true : false}
        onChange={() => dispatch(filterChange('ALL'))}
      />
      important
      <input
        type="radio"
        name="filter"
        checked={filter === 'IMPORTANT' ? true : false}
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        checked={filter === 'NONIMPORTANT' ? true : false}
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
    </div>
  )
}

export default VisibilityFilter
