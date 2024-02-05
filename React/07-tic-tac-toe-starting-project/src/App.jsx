import Player from './components/Player.jsx';
import Gameboard from './components/Gameboard.jsx';
import {useState} from 'react';

function App() {
  const[active, setActive] = useState("X");

  function handleSqClick(){
    setActive((currActive) => currActive ==="X" ? "O" : "X" );
  }

  return (
    <main>
      <div id="game-container">
        <ol id='players' className='highlight-player'>
          <Player iniName="Himanshu" symbol='X' isActive={active==='X'}/>
          <Player iniName="Hemant" symbol='O' isActive={active==='O'}/>
        </ol>
          <Gameboard onSelSq={handleSqClick} activePlayer={active}/>
      </div>
    </main>
  )
}

export default App
