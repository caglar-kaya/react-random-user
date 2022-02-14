import { fireEvent, render, screen } from '@testing-library/react';
import Person from './Person';

describe('Person', () => {
  it('renders nothing if the person prop is null', () => {
    render(<Person person={null} />);

    expect(screen.queryByText('First')).not.toBeInTheDocument();
  });

  it('renders nothing if the person prop is undefined', () => {
    render(<Person />);

    expect(screen.queryByText('First')).not.toBeInTheDocument();
  });

  it('renders the person fields if the person prop is filled in', () => {
    const testPerson = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@mail.com',
    };
    render(<Person person={testPerson} />);

    expect(
      screen.getByText(`First name: ${testPerson.first_name}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Last name: ${testPerson.last_name}`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Email: ${testPerson.email}`)).toBeInTheDocument();
  });

  it('Calls the onClick prop if the user clicks on the details', () => {
    const testFunction = jest.fn(() => {});
    const testPerson = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@mail.com',
    };
    render(<Person person={testPerson} onClick={testFunction} />);

    const list = screen.getByTestId('details');

    expect(testFunction).not.toHaveBeenCalled();

    fireEvent.click(list);

    expect(testFunction).toHaveBeenCalled();
  });
});
