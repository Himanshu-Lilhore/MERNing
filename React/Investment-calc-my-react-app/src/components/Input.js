export default function Input({children, ...props}){

    function textChange(event){
        props.valChange(props.keyName, event.target.value)
    }

    return(
        <>
            <label>{children}</label>
            <input type='number' required className='input-group' value={props.value[props.keyName]} onChange={textChange} />
        </>
    );
}