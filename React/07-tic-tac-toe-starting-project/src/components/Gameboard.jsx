import {useState} from 'react';

const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function Gameboard({onSelSq, theTurns}){
    // const[gameboard, setGameboard] = useState(initialGameboard);

    // function handleSelectedSq(rowIndex, colIndex){
    //     setGameboard((prevBoard) => {
    //         let updatedGameboard = [...prevBoard.map(innerArr => [...innerArr])];
    //         updatedGameboard[rowIndex][colIndex] = activePlayer;
    //         return updatedGameboard;
    //     })
    // }

    let gameboard = initialGameboard
    if(theTurns.length != 0)
    {
        console.log(theTurns)
        const {square, player} = theTurns[0]
        const {row, col} = square
        gameboard[row][col] = player;
    }


    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => {onSelSq(rowIndex, colIndex)}} disabled={playerSymbol !== null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}