import React from 'react';
import ItemSelect from "./ItemSelect";
import renderer from 'react-test-renderer';

describe("ItemSelect", () => {
    const options = [
        {
            label: "Option 1",
            value: "option1"
        },
        {
            label: "Option 2",
            value: "option2"
        },
        {
            label: "Option 3",
            value: "option3"
        }
    ];
    const defaultProps = {
        id: "ItemSelectId",
        options,
        onChange: jest.fn(),
        selected: options[0].value
    }

    const getComponent = (props = {}) => renderer.create(<ItemSelect {...defaultProps} {...props} />)

    it("should render select when options are defined", () => {
        const component = getComponent();

        expect(component.toJSON()).toMatchSnapshot();
    })

    it("should render loading when options are undefined", () => {
        const component = getComponent({options: undefined, selected: undefined});

        expect(component.toJSON()).toMatchSnapshot();
    })
})