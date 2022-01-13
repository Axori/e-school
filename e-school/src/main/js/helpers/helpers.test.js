import {getGroupClasses} from "./responses";
import {USER_ROLES} from "../constants";
import {getGroupClassesUrlByUser} from "./urls";

describe("Helpers", () => {
    describe("responses", () => {
        it("It should parse response for ADMIN", () => {
            const user = {
                id: 1,
                role: USER_ROLES.ADMIN
            }
            const groupClasses = [{id: '1'}, {id: '2'}]
            const body = {
                entity: {
                    _embedded: {
                        groupClasses
                    }
                }
            }

            expect(getGroupClasses(user, body)).toEqual(groupClasses)
        })
        it("It should parse response for TEACHER", () => {
            const user = {
                id: 1,
                role: USER_ROLES.TEACHER
            }
            const groupClasses = [{id: '1'}, {id: '2'}]
            const body = {
                entity: {
                    _embedded: {
                        groupClasses
                    }
                }
            }

            expect(getGroupClasses(user, body)).toEqual(groupClasses)
        })

        it("It should parse response for STUDENT", () => {
            const user = {
                id: 1,
                role: USER_ROLES.STUDENT
            }
            const groupClass = {id: '1'};
            const body = {
                entity: groupClass
            }

            expect(getGroupClasses(user, body)).toEqual([groupClass])
        })
    })

    describe("urls", () => {
        it("It should return url used by ADMIN", () => {
            const user = {
                id: 1,
                role: USER_ROLES.ADMIN
            }

            expect(getGroupClassesUrlByUser(user)).toEqual('/api/groupClasses')
        })
        it("It should return url used by TEACHER", () => {
            const user = {
                id: 1,
                role: USER_ROLES.TEACHER
            }

            expect(getGroupClassesUrlByUser(user)).toEqual(`/api/groupClasses/search/teacherGroup?id=${user.id}`)
        })
        it("It should return url used by STUDENT", () => {
            const user = {
                id: 1,
                role: USER_ROLES.STUDENT
            }

            expect(getGroupClassesUrlByUser(user)).toEqual(`/api/groupClasses/search/studentGroup?id=${user.id}`)
        })

    })
})