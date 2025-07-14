describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const user = {
      email: 'eric.carlier@gmail.com',
      password: 'PasswordEcr2025!a@',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    jwt = await response.text();
  });

  test('Gets', () => {
    expect(jwt).toBeDefined();
    console.log(jwt);

    expect(true).toBeTruthy(); // Placeholder for actual test
  });

  // test('Create & Get', async () => {
  //   expect(jwt).toBeDefined();

  //   const createdReservation = await createReservation();

  //   const responseGet = await fetch(
  //     `http://reservations:3000/reservations/${createdReservation._id}`,
  //     {
  //       headers: {
  //         Authentication: jwt,
  //       },
  //     },
  //   );
  //   const reservation = await responseGet.json();
  //   expect(createdReservation).toEqual(reservation);
  // });

  // const createReservation = async () => {
  //   const responseCreate = await fetch(
  //     'http://reservations:3000/reservations',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authentication: jwt,
  //       },
  //       body: JSON.stringify({
  //         startDate: '02-01-2025',
  //         endDate: '02-05-2025',
  //         placeId: '123',
  //         invoiceId: '123',
  //         charge: {
  //           amount: 20.03,
  //           card: {
  //             token: 'tok_mastercard_debit',
  //           },
  //         },
  //       }),
  //     },
  //   );
  //   expect(responseCreate.ok).toBeTruthy();
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //   return responseCreate.json();
  // };
});
