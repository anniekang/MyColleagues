/* global describe, it */

const { searchSubmitted, renderResults } = require('../client/actions/search-actions');
const { expect } = require('chai');

describe('Actions', () => {
  describe('Search-Actions', () => {
    it(`'searchSubmitted' should return { type: 'SEARCH_SUBMITTED', search }`, () => {
      expect(searchSubmitted('AK1')).to.deep.equal({ type: 'SEARCH_SUBMITTED', search: 'AK1' });
      expect(searchSubmitted('a a')).to.have.property('search').that.is.a('string');
    })

    it(`'renderResults' should return { type: 'RENDER_RESULTS', results }`, () => {
      expect(renderResults([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}])).to.deep.equal({ type: 'RENDER_RESULTS', results: [{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}] });
      expect(renderResults([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}, {id: 'JD1', first_name: 'John', last_name: 'Doe'}])).to.have.property('results').that.is.an('array');
    })

  })
})
