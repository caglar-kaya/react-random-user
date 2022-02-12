import { render, screen } from '@testing-library/react';
import Person from './Person';

describe('Person component', () => {
  test('person is null', () => {
    const { container } = render(<Person person={null} />);
    expect(container).toBeEmptyDOMElement();
  });
  // test(`person isn't given`, () => {
  //   const { container } = render(<Person />);
  //   expect(container).toBeEmptyDOMElement();
  // });
  test('person is not empty', () => {
    render(
      <Person
        person={{
          first_name: 'Caglar',
          last_name: 'Kaya',
          email: 'abc@gmail.com',
        }}
      />,
    );
    const linkElement = screen.getByText(/First/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('person is not empty and no email', () => {
    render(
      <Person
        person={{
          first_name: 'Caglar',
          last_name: 'Kaya',
        }}
      />,
    );
    const linkElement = screen.getByText(/Email: --/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('person is not empty and no first name', () => {
    render(
      <Person
        person={{
          last_name: 'Kaya',
          email: 'abc@gmail.com',
        }}
      />,
    );
    const linkElement = screen.getByText(/First Name: --/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('person is not empty and no last name', () => {
    render(
      <Person
        person={{
          first_name: 'Caglar',
          email: 'abc@gmail.com',
        }}
      />,
    );
    const linkElement = screen.getByText(/Last Name: --/i);
    expect(linkElement).toBeInTheDocument();
  });
});
