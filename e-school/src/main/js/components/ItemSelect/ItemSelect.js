import React from "react";
import Select from "../Select/Select";
import Loader from "../Loader/Loader";

const ItemSelect = ({id, options, onChange, selected}) => {
    return <div className="d-flex justify-content-center">
        {options != null ? <Select
                id={id}
                disabled={true}
                selected={selected}
                onChange={onChange}
                options={options}/>
            : <Loader/>}
    </div>
}

export default ItemSelect;