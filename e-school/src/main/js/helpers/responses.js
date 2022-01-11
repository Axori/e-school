import {USER_ROLES} from "../constants";

export const getGroupClasses = (user, body) => {
    switch (user.role) {
        case USER_ROLES.TEACHER:
            return body.entity._embedded.groupClasses;
        case USER_ROLES.STUDENT:
            return [body.entity];
        default:
            return body.entity._embedded.groupClasses;
    }
}