import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import PersonController from './PersonController';

const testPerson = {
  name: {
    first: 'John',
    last: 'Doe',
  },
  email: 'test@mail.com',
};

const server = setupServer(
  rest.get('https://www.randomuser.me/api', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [testPerson],
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('PersonController', () => {
  it('Test that the data the API gives is shown on the screen', async () => {
    render(<PersonController />);

    expect(
      await screen.findByText(`First name: ${testPerson.name.first}`),
    ).toBeInTheDocument();
  });

  it('Test that the app is loading initially', async () => {
    render(<PersonController />);

    expect(await screen.findByTestId(`loading-image`)).toBeInTheDocument();
  });
});
