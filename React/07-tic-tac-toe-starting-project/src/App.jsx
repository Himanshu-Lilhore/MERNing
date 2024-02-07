import Player from './components/Player.jsx';
import Gameboard from './components/Gameboard.jsx';
import {useState} from 'react';
import Log from './components/Log.jsx';

function calcActive(myTurns){
  let activeRN = 'X'

  if(myTurns.length != 0 && myTurns.player === 'X'){
    activeRN = 'O'
  }

  return activeRN;

}

function App() {
  const[turns, setTurns] = useState([]);
  // const[active, setActive] = useState("X");
  let active = calcActive(turns);

  function handleSqClick(rowIndex, colIndex){
    // setActive((currActive) => currActive ==="X" ? "O" : "X" );

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
        <Gameboard onSelSq={handleSqClick} theTurns = {turns}/>
      </div>
      <Log theTurns = {turns}/>
    </main>
  )
}

export default App
