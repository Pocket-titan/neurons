import React, { useReducer } from 'react'

const model = {
  reducer: (state, { type, payload }) => {
    switch (type) {
      case 'tick':
        return {
          ...state,
          time: time + 1,
        }
    }
  },
  initial_state: {
    time: 0,
    neurons: [],
    connections: [],
  },
}

const Network = () => {
  const [state, dispatch] = useReducer(model.reducer, model.initial_state)

  return (
    <div>
      <p>hey</p>
    </div>
  )
}

export default Network
