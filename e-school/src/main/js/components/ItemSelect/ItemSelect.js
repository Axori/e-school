import React from "react";
import Select from "../Select/Select";
import Loader from "../Loader/Loader";

const ItemSelect = ({disabled, id, options, onChange, selected}) => {
    return <div className="d-flex justify-content-center">
        {options != null ? <Select
                id={id}
                disabled={disabled}
                selected={selected}
                onChange={onChange}
                options={options}/>
            : <Loader/>}
    </div>
}

export default ItemSelect;