'use strict';

const request = require(`supertest`);
const server = require(`../command/server`).run(null, `test`);

describe(`Categories API end-points`, () => {
  test(`When get categories result status code should be 200`, async () => {
    const res = await request(server)
      .get(`/api/categories`);
    expect(res.statusCode).toBe(200);
  });

  test(`When get search result body should be empty array`, async () => {
    const res = await request(server)
      .get(`/api/search`)
      .query({title: `_____`});
    expect(res.body).toEqual([]);
  });

  test(`Should 400 because title property doesn't exists`, async () => {
    const res = await request(server)
      .get(`/api/search`);
    expect(res.statusCode).toBe(400);
  });
});
