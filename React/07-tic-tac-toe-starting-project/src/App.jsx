import Player from './components/Player.jsx';
import Gameboard from './components/Gameboard.jsx';
import {useState} from 'react';
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './winning-combinations.js'
import GameOver from './components/GameOver.jsx';

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function calcActive(myTurns){
  let activeRN = 'X'

  if(myTurns.length !== 0 && myTurns[0].player === 'X'){
    activeRN = 'O'
  }

  return activeRN;

}


function App() {
  const[turns, setTurns] = useState([]);
  const[players, setPlayers] = useState({
    'X': 'Himanshu',
    'O': 'Hemant'
  })
  // const[active, setActive] = useState("X");
  let active = calcActive(turns);
  let winner
  let drawn = false
  let gameboard =  [...initialGameboard.map(arr => [...arr])]
  
  function handleRestart(){
    setTurns([])
  }
  
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return({
        ...prevPlayers,
        [symbol]:newName    // this syntax is used when for key name we have a variable
      });
    }
    )
  }

  for(const turn of turns){
    const {square, player} = turn
    const {row, col} = square
    gameboard[row][col] = player;
  }
  
  console.log(turns[0])

  for(const combination of WINNING_COMBINATIONS){
    let firstSq = gameboard[combination[0].row][combination[0].column]
    let secondSq = gameboard[combination[1].row][combination[1].column]
    let thridSq = gameboard[combination[2].row][combination[2].column]

    if(firstSq &&
      firstSq === secondSq &&
      firstSq === thridSq){
        winner = players[firstSq];
    }
  }

  if(!winner && turns.length === 9) drawn = true

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
          <Player iniName={players['X']} symbol='X' isActive={active==='X'} onNameCh={handlePlayerNameChange}/>
          <Player iniName={players['O']} symbol='O' isActive={active==='O'} onNameCh={handlePlayerNameChange} />
        </ol>
        {(winner || drawn) && <GameOver winner={winner} handleRe={handleRestart}/>}
        <Gameboard onSelSq={handleSqClick} board={gameboard}/>
      </div>
      <Log theTurns = {turns}/>
    </main>
  )
}

export default App
