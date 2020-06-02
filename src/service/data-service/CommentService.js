'use strict';
const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

class CommentService {
  constructor(offers) {
    this._offers = offers;
  }

  create(offer, text) {
    const comment = {id: nanoid(MAX_ID_LENGTH), text};
    offer.comments = [...offer.comments, comment];

    return comment;
  }

  drop(offer, commentId) {
    const {comments = []} = offer;
    const commentIndex = comments.findIndex((item) => item.id === commentId);

    if (commentIndex === -1) {
      return null;
    }

    return offer.comments.splice(commentIndex, 1);
  }

  findAll(offer) {
    const {comments = []} = offer;

    return comments;
  }
}

module.exports = CommentService;
