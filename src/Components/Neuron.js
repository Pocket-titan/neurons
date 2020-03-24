import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { RADIUS } from '../constants'

const Neuron = ({ position: { x, y }, update = () => {} }) => {
  const [dragging, setDragging] = useState(false)

  const onDrag = (event, { x, y }) => {
    setDragging(true)
    update({
      position: { x, y },
    })
  }

  const onStop = (event, { x, y }) => {
    setDragging(false)
  }

  const onMouseDown = () => {}
  return (
    <Draggable position={{ x, y }} onDrag={onDrag} onStop={onStop} onMouseDown={onMouseDown}>
      <div
        style={{
          position: 'absolute',
        }}
      >
        <div
          style={{
            height: 2 * RADIUS,
            width: 2 * RADIUS,
            backgroundColor: 'steelblue',
            borderRadius: '50%',
            cursor: 'grab',
            position: 'relative',
            boxShadow: dragging ? '3px 3px 12px 0px rgba(0,0,0,0.9)' : 'none',
          }}
        ></div>
      </div>
    </Draggable>
  )
}

export default Neuron
