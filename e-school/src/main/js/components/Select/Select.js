import React from "react";

const Select = ({id, options, selected, onChange}) =>
    <select id={id}
            className="form-select"
            value={selected}
            aria-label="Default select example"
            onChange={(event) => onChange(event.target.value)}>
        {options.map(({label, value}) =>
            <option key="value" value={value}>{label}</option>
        )}
    </select>;


export default Select;