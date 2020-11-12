'use strict';

const request = require(`supertest`);
const {run} = require(`../command/server`);

let server;

beforeAll(async () => {
  server = await run(null, `test`);
});

describe(`Categories API end-points`, () => {
  test(`When get categories result status code should be 200`, async () => {
    const res = await request(server)
      .get(`/api/categories`);
    expect(res.statusCode).toBe(200);
  });
});
