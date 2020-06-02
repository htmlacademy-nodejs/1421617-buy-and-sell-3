'use strict';

class CategoryService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    const categories = this._offers.reduce((acc, offer) => ([...acc, ...offer.category]), []);

    return [...new Set(categories)];
  }
}

module.exports = CategoryService;
