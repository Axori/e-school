import {USER_ROLES} from "../constants";

export const getGroupClassesUrlByUser = (user) => {
    switch (user.role) {
        case USER_ROLES.TEACHER:
            return `/api/groupClasses/search/teacherGroup?id=${user.id}`
        case USER_ROLES.STUDENT:
            return `/api/groupClasses/search/studentGroup?id=${user.id}`
        default:
            return '/api/groupClasses'
    }
}