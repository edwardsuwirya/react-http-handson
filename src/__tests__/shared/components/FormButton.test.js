import {render, screen} from "@testing-library/react";
import FormButton from "../../../shared/components/FormButton/FormButton";

describe('Form Button', () => {
    test('Render successfully', () => {
        render(
            <FormButton label='dummy label'/>
        );
        const result = screen.getByText('dummy label');
        expect(result).toBeInTheDocument();
    })
    test('Button disabled', () => {
        render(
            <FormButton label='dummy label' disabled/>
        );
        const result = screen.getByText('dummy label');
        expect(result).toBeDisabled();
    })
})