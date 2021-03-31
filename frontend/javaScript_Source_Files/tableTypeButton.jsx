function TableTypeButton(props){
    let element = (
        <button type="button" className="dashboardButton" onClick={async () =>{
            props.updateTableType(props.type);
        }}>{props.buttonText}</button>
    );
    return element;
}