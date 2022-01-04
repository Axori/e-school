import React from 'react';
import MarksTable from "./MarksTable";
import {act, create} from 'react-test-renderer';

describe("MarksTable", () => {
    const studentMarks = {
        15: {
            name: "Student 15",
            marks: [
                1, 2
            ]
        },
        20: {
            name: "Student 20",
            marks: [
                3, 4
            ]
        },

    };
    const defaultProps = {
        loading: false,
        studentMarks,
        onSave: jest.fn(),
        isStudent: false
    }

    const getComponent = (props = {}) => create(<MarksTable {...defaultProps} {...props} />)

    it("should render MarksTable with students inside", () => {
        let component;
        act(() => {
            component = getComponent();
        })

        expect(component.toJSON()).toMatchSnapshot();
    })

    it("should render Loading", () => {
        const component = getComponent({loading: true});

        expect(component.toJSON()).toMatchSnapshot();
    })
})