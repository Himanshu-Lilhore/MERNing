let Logs = []

export default function Log({theTurns}){

    if(theTurns.length != 0)
    {
        // const{square, player} = theTurns[0]
        // const{row, col} = square
        // const record = `${player} played at ${row}, ${col}`
        // Logs = [record, ...Logs]
        // console.log(Logs)

        // return (
        //     <ol id='log'>
        //         {Logs.map((entry,index) => <li key={`${index}`}>{entry}</li>)}
        //     </ol>
        // );


        return (
            <ol id='log'>
                {theTurns.map(entry => <li key={`${entry.square.row}${entry.square.col}`}>{entry.player} played at {entry.square.row}x{entry.square.col}</li>)}
             </ol>
        )
    }

}