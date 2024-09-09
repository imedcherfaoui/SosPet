import React from 'react'

const Title = (props) => {
  return (
    <h2
      className="text-5xl md:text-6xl mb-6 p-2 leading-7 text-gray-900"
      style={{ fontSize: `${props.size}` }}
    >
      {props.children}
    </h2>
  );
}

export default Title