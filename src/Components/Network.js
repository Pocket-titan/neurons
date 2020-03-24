import React, { useReducer, useEffect } from 'react'
import useInterval from '@use-it/interval'
import { produce } from 'immer'

const RADIUS = 20
const NUM_NEURONS = 10

const model = {
  reducer: produce((draft, action) => {
    switch (action.type) {
      case 'tick':
        draft.time += 1
        return
      case 'update_positions':
        action.positions.forEach(({ x, y }, i) => {
          draft.neurons[i].position = {
            x,
            y,
          }
        })

        return
      default:
        return
    }
  }),
  initial_state: {
    time: 0,
    neurons: [...Array(NUM_NEURONS).keys()].map(() => {
      return {
        position: { x: null, y: null },
      }
    }),
    connections: [],
  },
}

const Network = () => {
  const [state, dispatch] = useReducer(model.reducer, model.initial_state)

  useInterval(() => dispatch({ type: 'tick' }), 1000)

  useEffect(() => {
    const { innerWidth, innerHeight } = window
    const [width, height] = [
      Math.floor(innerWidth / (2 * RADIUS)) - 2,
      Math.floor(innerHeight / (2 * RADIUS)) - 2,
    ]
    let positions = []
    while (positions.length < NUM_NEURONS) {
      let position = {
        x: Math.round(Math.random() * width * 10) / 10,
        y: (Math.round(Math.random() * height) * 10) / 10,
      }
      if (
        positions.findIndex(
          ({ x, y }) => x === position.x && y === position.y,
        ) === -1
      ) {
        positions.push({
          x: position.x * 2 * RADIUS,
          y: position.y * 2 * RADIUS,
        })
      }
    }

    dispatch({ type: 'update_positions', positions: positions })
  }, [])

  return (
    <div>
      <span>{state.time}</span>
      {state.neurons.map(neuron => {
        const {
          position: { x, y },
        } = neuron

        if (!x || !y) {
          return null
        }

        return (
          <div
            style={{
              position: 'absolute',
              height: 2 * RADIUS,
              width: 2 * RADIUS,
              backgroundColor: 'steelblue',
              borderRadius: '50%',
              left: x,
              top: y,
            }}
          ></div>
        )
      })}
    </div>
  )
}

export default Network
