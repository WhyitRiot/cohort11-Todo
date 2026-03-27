import {describe, it, expect} from 'vitest';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "../App.tsx";

describe('App.tsx', () => {
    it('should display heading', () => {
        render(<App />)
        expect(screen.getByRole('heading', {name:/get started/i})).toBeInTheDocument()
        expect(screen.getByText("started", {exact:false})).toBeInTheDocument()
        expect(screen.getByRole('button', {name:/Count is \d+/g})).toBeInTheDocument();
    });
    it('should count button increment counter', async () =>{
        render(<App />)
        const user = userEvent.setup();
        const button = screen.getByRole('button', {name:/count is \d+/i});
        let count = Number(button.textContent.replace(/[a-zA-z]/g, ""));
        await user.click(button);
        expect(screen.getByRole('button', {name:`Count is ${count+1}`})).toBeInTheDocument()
        expect(screen.queryByRole('button', {name:/coun/i})).toHaveValue(`${count+1}`)
        count = Number(button.textContent.replace(/[a-zA-Z]/g, ""));
        console.log(count);
    })
});