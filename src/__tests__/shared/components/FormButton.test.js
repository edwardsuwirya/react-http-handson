import {render, screen} from "@testing-library/react";
import FormButton from "../../../shared/components/FormButton/FormButton";

describe('Form Button', () => {
    test('Render successfully', () => {
        render(
            <FormButton label='dummy label'/>
        );
        const labelElem = screen.getByText('dummy label');
        expect(labelElem).toBeInTheDocument();
    })
    test('Button disabled', () => {
        render(
            <FormButton label='dummy label' disabled/>
        );
        const labelElem = screen.getByText('dummy label');
        expect(labelElem).toBeDisabled();
    })
})