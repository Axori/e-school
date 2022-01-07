import React from 'react';
import Select from "./Select";
import renderer from 'react-test-renderer';

describe("Select", () => {
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
        id: "select",
        options,
        onChange: jest.fn(),
        selected: options[0].value
    }

    const getComponent = (props = {}) => renderer.create(<Select {...defaultProps} {...props} />)

    it("should render select when options are defined", () => {
        const component = getComponent();

        expect(component.toJSON()).toMatchSnapshot();
    })

    it("should call onChange with selected option item", () => {
        const component = getComponent();

        const [, selectedOption] = options;
        component.root.findByType('select').props.onChange({target: {value: selectedOption.value}})
        expect(defaultProps.onChange).toHaveBeenCalledWith(selectedOption);
    })
})