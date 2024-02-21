import {useState} from 'react';

export default function Gameboard({onSelSq, board}){
    // const[gameboard, setGameboard] = useState(initialGameboard);

    // function handleSelectedSq(rowIndex, colIndex){
    //     setGameboard((prevBoard) => {
    //         let updatedGameboard = [...prevBoard.map(innerArr => [...innerArr])];
    //         updatedGameboard[rowIndex][colIndex] = activePlayer;
    //         return updatedGameboard;
    //     })
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex)=>(
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