import React from 'react'
import Loader from 'react-loader'
import "./Component.css"

function Loading({ loading }) {
  return (
    <div className="App">
      <Loader
        loaded={loading}
        lines={13}
        length={20}
        width={10}
        radius={30}
        corners={1}
        rotate={0}
        direction={1}
        color="#2cd1bb"
        speed={1}
        trail={60}
        shadow={false}
        hwaccel={false}
        className="spinner"
        zIndex={2e9}
        top="50%"
        left="50%"
        scale={0.8}
        loadedClassName="loadedContent"
      />
    </div>
  )
}

export default Loading
