import Player from './components/Player.jsx';
import Gameboard from './components/Gameboard.jsx';
import {useState} from 'react';

function App() {
  const[active, setActive] = useState("X");
  const[turns, setTurns] = useState([]);

  function handleSqClick(rowIndex, colIndex){
    setActive((currActive) => currActive ==="X" ? "O" : "X" );

    setTurns(prevTurns => {
      let curPlayer = 'X';

      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
        curPlayer = 'O';
      }     // we could have written active directly in the return statement, but active is from other state so we get the latest state value (as of Turns state updation). 

      return ([{square:{row:rowIndex, col:colIndex}, player:curPlayer},...prevTurns]);
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id='players' className='highlight-player'>
          <Player iniName="Himanshu" symbol='X' isActive={active==='X'}/>
          <Player iniName="Hemant" symbol='O' isActive={active==='O'}/>
        </ol>
          <Gameboard onSelSq={handleSqClick} theTurn = {turns}/>
      </div>
    </main>
  )
}

export default App
