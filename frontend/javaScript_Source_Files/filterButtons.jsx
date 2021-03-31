function FilterButtons(props){
    let element = (
        <form>
                <label htmlFor="PROD_TYPE">Prod. Type: </label>
                <select id="prodTypeChooser" name={props.filterNames[0]} size="1" onChange={async (e) => props.changeFilter(e.target.value, 0)}>
                    <option value="">All</option>
                    <FilterSet name={props.filterNames[0]} hasEnum={true}/>
                </select>
                <label htmlFor="LOAD_TYPE"> Load Type: </label>
                <select id="loadTypeChooser" name={props.filterNames[1]} size="1" onChange={async (e) => props.changeFilter(e.target.value, 1)}>
                    <option value="">All</option>
                    <FilterSet name={props.filterNames[1]} hasEnum={true}/>
                </select>
                <label htmlFor="CLASSIFICATION"> Classification: </label>
                <select id="classificationChooser" name={props.filterNames[2]} size="1" onChange={async (e) => props.changeFilter(e.target.value, 2)}>
                    <option value="">All</option>
                    <FilterSet name={props.filterNames[2]} hasEnum={true}/>
                </select>
                <label htmlFor="RISK_CLASS"> Risk: </label>
                <select id="riskChooser" name={props.filterNames[3]} size="1" onChange={async (e) => props.changeFilter(e.target.value, 3)}>
                    <option value="">All</option>
                    <FilterSet name={props.filterNames[3]} hasEnum={false}/>
                </select>
            </form>
    );
    return element;
}