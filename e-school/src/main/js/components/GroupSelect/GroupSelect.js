import React, {useEffect, useState} from "react";
import Select from "../Select/Select";
import Loader from "../Loader/Loader";
import client from '../../client';

const GroupSelect = ({user, onChange}) => {
    const [groups, setGroups] = useState();
    const [selected, setSelected] = useState();

    const handleGroupChange = (groupId) => {
        onChange(groupId)
    }


    useEffect(() => {
        client({method: 'GET', path: '/api/groupClasses'}).done(
            (resp) => {
                const {groupClasses} = resp.entity._embedded;
                setGroups(groupClasses.map(({name, _links: {self}}) => ({value: self, label: name})));
                setSelected(groupClasses[0]);
            }
        );
    }, [])

    return <div id="GroupSelect">
        {groups != null ? <Select
                id="groups"
                selected={selected}
                onChange={handleGroupChange}
                options={groups}/>
            : <Loader/>}
    </div>
}

export default GroupSelect;