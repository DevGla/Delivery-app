import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste da tela Login', () => {
  it('deve existir dois campos de input', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const inputPassword = screen.getByTestId('common_login__input-password');
    const inputEmail = screen.getByTestId('common_login__input-email');

    expect(inputPassword).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  it('botão de Login é habilitado após preenchimento correto dos inputs', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const inputPassword = screen.getByTestId('common_login__input-password');
    const inputEmail = screen.getByTestId('common_login__input-email');
    const btnLogin = screen.getByText('Login');

    userEvent.type(inputPassword, 'fulana@123');
    userEvent.type(inputEmail, 'fulana@deliveryapp.com');

    expect(btnLogin).toBeEnabled();
  });

  it('há um botão que que redireciona caso a pessoa não esteja registrada', () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const btnRegister = screen.getByText('Ainda não tenho conta');
    // const inputName = screen.getByTestId('common_register__input-name');

    expect(btnRegister).toBeInTheDocument();

    userEvent.click(btnRegister);
    path = history.push('/register')
    expect(path).toBe('/register');
  });
});
