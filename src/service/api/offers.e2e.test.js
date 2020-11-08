'use strict';

const request = require(`supertest`);
const {run} = require(`../command/server`);
const {getMockData} = require(`../lib/get-mock-data`);

const mockNewComment = {
  text: `Новый комментарий!`
};
const mockNewOffer = {
  title: `Продам VHS.`,
  picture: `item123.jpg`,
  description: `Товар в отличном состоянии.`,
  type: `offer`,
  sum: 123,
  category: [
    `Видео`
  ]
};

let server;
let mockData;
let mockOffer;
let mockOfferId;

beforeAll(async () => {
  server = await run(null, `test`);
  mockData = await getMockData();
  mockOffer = mockData[0];
  mockOfferId = mockOffer.id;
});

describe(`Offers API end-points`, () => {
  describe(`Get offers`, () => {
    test(`When get offers result status code should be 200`, async () => {
      const res = await request(server)
        .get(`/api/offers`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe(`Get offer by id`, () => {
    test(`When get offer result status code should be 200`, async () => {
      const res = await request(server)
        .get(`/api/offers/${mockOfferId}`);
      expect(res.statusCode).toBe(200);
    });
    test(`When offer not found result status code should be 404`, async () => {
      const notFoundId = `_____`;
      const res = await request(server)
        .get(`/api/offers/${notFoundId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`Create offer`, () => {
    test(`When create offer result status code should be 200`, async () => {
      const res = await request(server)
        .post(`/api/offers`)
        .send(mockNewOffer);
      expect(res.statusCode).toBe(200);
    });
    test(`When create offer without required fields result status code should be 400`, async () => {
      const res = await request(server)
        .post(`/api/offers`);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`Edit offer`, () => {
    test(`When edit offer result status code should be 200`, async () => {
      const res = await request(server)
        .put(`/api/offers/${mockOfferId}`)
        .send(mockNewOffer);
      expect(res.statusCode).toBe(200);
    });
    test(`When edit offer without required fields result status code should be 400`, async () => {
      const res = await request(server)
        .put(`/api/offers/${mockOfferId}`);
      expect(res.statusCode).toBe(400);
    });
    test(`When edit offer not found result status code should be 404`, async () => {
      const notFoundId = `_____`;
      const res = await request(server)
        .put(`/api/offers/${notFoundId}`)
        .send(mockNewOffer);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`Get comments by id`, () => {
    test(`When get offer result status code should be 200`, async () => {
      const res = await request(server)
        .get(`/api/offers/${mockOfferId}/comments`);
      expect(res.statusCode).toBe(200);
    });
    test(`When offer not found result status code should be 404`, async () => {
      const notFoundId = `_____`;
      const res = await request(server)
        .get(`/api/offers/${notFoundId}/comments`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`Create comment`, () => {
    test(`When create comment result status code should be 200`, async () => {
      const res = await request(server)
        .post(`/api/offers/${mockOfferId}/comments/`)
        .send(mockNewComment);
      expect(res.statusCode).toBe(200);
    });
    test(`When create comment without required fields result status code should be 400`, async () => {
      const res = await request(server)
      .post(`/api/offers/${mockOfferId}/comments/`);
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`Delete comment`, () => {
    test(`When delete offer result status code should be 200`, async () => {
      const mockCommentId = mockOffer.comments[0].id;
      const res = await request(server)
        .delete(`/api/offers/${mockOfferId}/comments/${mockCommentId}`);
      expect(res.statusCode).toBe(200);
    });
    test(`When delete offer not found result status code should be 404`, async () => {
      const notFoundId = `_____`;
      const res = await request(server)
      .delete(`/api/offers/${mockOfferId}/comments/${notFoundId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe(`Delete offer`, () => {
    test(`When delete offer result status code should be 200`, async () => {
      const res = await request(server)
        .delete(`/api/offers/${mockOfferId}`);
      expect(res.statusCode).toBe(200);
    });
    test(`When delete offer not found result status code should be 404`, async () => {
      const notFoundId = `_____`;
      const res = await request(server)
        .delete(`/api/offers/${notFoundId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
