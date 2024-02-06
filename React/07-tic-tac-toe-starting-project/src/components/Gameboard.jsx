import {useState} from 'react';

const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function Gameboard({onSelSq, theTurn}){
    // const[gameboard, setGameboard] = useState(initialGameboard);

    // function handleSelectedSq(rowIndex, colIndex){
    //     setGameboard((prevBoard) => {
    //         let updatedGameboard = [...prevBoard.map(innerArr => [...innerArr])];
    //         updatedGameboard[rowIndex][colIndex] = activePlayer;
    //         return updatedGameboard;
    //     })
    // }

    let gameboard = initialGameboard
    if(theTurn.length != 0)
    {
        console.log(theTurn)
        const {square, player} = theTurn[0]
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
                                <button onClick={() => {onSelSq(rowIndex, colIndex)}}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}