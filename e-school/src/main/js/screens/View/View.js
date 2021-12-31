import React from "react";
import GroupSelect from "../../components/GroupSelect/GroupSelect";


const View = ({user}) => {

    const handleOnGroupChange = (groupId) => {
        console.log("selected groupId");
    };

    return <div>
        <GroupSelect onChange={handleOnGroupChange}/>
    </div>
}

export default View;