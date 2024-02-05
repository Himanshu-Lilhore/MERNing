import {useState} from 'react';

const initialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function Gameboard({onSelSq, activePlayer}){
    const[gameboard, setGameboard] = useState(initialGameboard);

    function handleSelectedSq(rowIndex, colIndex){
        setGameboard((prevBoard) => {
            let updatedGameboard = [...prevBoard.map(innerArr => [...innerArr])];
            updatedGameboard[rowIndex][colIndex] = activePlayer;
            return updatedGameboard;
        })

        onSelSq();
    }

    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => {handleSelectedSq(rowIndex, colIndex)}}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}