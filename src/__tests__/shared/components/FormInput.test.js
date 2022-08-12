import {fireEvent, render, screen} from "@testing-library/react";
import FormInput from "../../../shared/components/FormInput/FormInput";

describe('Form Button', () => {
    test('Render successfully', () => {
        render(
            <FormInput label='dummy label' value='dummy text'/>
        );
        const labelResult = screen.getByText('dummy label');
        expect(labelResult).toBeInTheDocument();
        const valueResult = screen.getByDisplayValue('dummy text');
        expect(valueResult).toBeInTheDocument()
    });
    test('OnChange show correct value', () => {
        const onValueChange = jest.fn()
        render(
            <FormInput id='dummyid' label='dummy label' value='dummy text' onValueChange={onValueChange}/>
        );
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: '23'}});
        expect(onValueChange).toBeCalledWith('dummyid', '23')
    })
})