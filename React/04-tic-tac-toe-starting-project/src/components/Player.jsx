import {useState} from 'react';

export default function Player({iniName, symbol, isActive, onNameCh}){
    const [playerName, setPlayerName] = useState(iniName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        if(isEditing){
            onNameCh(symbol, playerName)
        }
        setIsEditing(editing => !editing);
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let elem = (<span className='player-name'>{playerName}</span>);
    let btnCaption = 'Edit';

    if(isEditing){
        elem = (<input type='text' required value={playerName} onChange={handleChange} />);
        btnCaption = 'Save';
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {elem}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    );
}