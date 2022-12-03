
import React, { useState } from "react"

function App() {

   const [ count, setCount ]=useState(0)

  return (
    <div className="App">
      <h1>Hello react, you are ready for fun</h1>
      <button onClick={ () => setCount(count+1) }>
        {count}
      </button>
    </div>
  );
}

export default App;
