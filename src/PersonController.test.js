import { render, screen, waitFor } from '@testing-library/react';
import PersonController from './PersonController';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Configures our server for this file
const server = setupServer(
  rest.get('https://www.randomuser.me/api', (req, res, ctx) => {
    // This part generates the response whenever our code calls the url

    // response is a function, ctx is our context that is provided.
    // We call json to tell it to convert it to json
    return res(
      ctx.json(
        // the object it should return. Look at what you get back from the API
        // so you know what structure to follow. Remember that we only use 3 fields,
        // so you don't need to copy in the rest
        {
          results: [
            {
              gender: 'female',
              name: {
                title: 'Ms',
                first: 'Sandra',
                last: 'Ortiz',
              },
              location: {
                street: {
                  number: 712,
                  name: 'Calle de La Democracia',
                },
                city: 'Ferrol',
                state: 'Castilla la Mancha',
                country: 'Spain',
                postcode: 92672,
                coordinates: {
                  latitude: '-21.4906',
                  longitude: '61.9049',
                },
                timezone: {
                  offset: '+4:00',
                  description: 'Abu Dhabi, Muscat, Baku, Tbilisi',
                },
              },
              email: 'sandra.ortiz@example.com',
              login: {
                uuid: 'dada1844-e84a-41fd-a215-21aa8e593230',
                username: 'goldencat176',
                password: 'babyface',
                salt: 'ItNh91Oh',
                md5: 'f1d1cf516514a4c04db2a9bcb7ed6c31',
                sha1: '68b681ca57bfa8fbf44ae72db5ffefaf7039d414',
                sha256:
                  '89c2f704816bdda1da04a59a98a99536eae068a79d481fe358ab94f84fea6952',
              },
              dob: {
                date: '1979-02-24T00:08:47.834Z',
                age: 43,
              },
              registered: {
                date: '2013-07-08T22:12:57.337Z',
                age: 9,
              },
              phone: '983-521-201',
              cell: '621-710-183',
              id: {
                name: 'DNI',
                value: '89739336-S',
              },
              picture: {
                large: 'https://randomuser.me/api/portraits/women/53.jpg',
                medium: 'https://randomuser.me/api/portraits/med/women/53.jpg',
                thumbnail:
                  'https://randomuser.me/api/portraits/thumb/women/53.jpg',
              },
              nat: 'ES',
            },
          ],
          info: {
            seed: 'bd7d1ce4ee1356f6',
            results: 1,
            page: 1,
            version: '1.3',
          },
        },
      ),
    );
  }),
);

// beforeAll takes a function and it will call that function before running the test.
// The server.listen() means that it will start the server up
beforeAll(() => server.listen());

// afterEach takes a function and it will call that function after every single test.
// The resetHandlers will make sure that after running a test any changes that were made are reset
afterEach(() => server.resetHandlers());

// afterAll takes a function and it will call that function after all the tests have run.
// This will stop the server so that it doesn't keep running after the tests are done
afterAll(() => server.close());

describe('PersonController component', () => {
  test('Loading...', async () => {
    render(<PersonController />);
    const loading = await screen.findByText(/Loading.../i);
    expect(loading).toBeInTheDocument();
  });
  test('First Name', async () => {
    render(<PersonController />);
    const linkElement = await screen.findByText(/First Name:/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Last Name', async () => {
    render(<PersonController />);
    const linkElement = await screen.findByText(/Last Name:/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Email', async () => {
    render(<PersonController />);
    const linkElement = await screen.findByText(/Email:/i);
    expect(linkElement).toBeInTheDocument();
  });
});
