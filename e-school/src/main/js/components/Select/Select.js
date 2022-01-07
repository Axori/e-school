import React from "react";

const Select = ({id, options, selected, onChange}) => {

    const onChangeHandler = (e) => {
        const {value} = e.target;
        const option = options.find(option => option.value === value);
        onChange(option);
    }

    return <select id={id}
                   className="form-select"
                   value={selected?.value}
                   aria-label="Default select example"
                   onChange={onChangeHandler}>
        {options.map(({label, value}) =>
            <option key={value} value={value}>{label}</option>
        )}
    </select>;
}


export default Select;