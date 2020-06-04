'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  search(key) {
    const result = this._offers.filter((offer) => offer.title.indexOf(key) !== -1);

    return result;
  }
}

module.exports = SearchService;
