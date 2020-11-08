'use strict';

const request = require(`supertest`);
const {run} = require(`../command/server`);

let server;

beforeAll(async () => {
  server = await run(null, `test`);
});

describe(`Search API end-points`, () => {
  test(`When get search result status code should be 200`, async () => {
    const res = await request(server)
      .get(`/api/search`)
      .query({title: `Продам`});
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
