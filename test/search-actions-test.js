/* global describe, it */

const { searchSubmitted, renderEmployeeResults } = require('../client/actions/search-actions');
const { expect } = require('chai');

describe('Actions', () => {
  describe('Search-Actions', () => {
    it(`'searchSubmitted' should return { type: 'SEARCH_SUBMITTED', isEmployee, search }`, () => {
      expect(searchSubmitted(true, 'AK1')).to.deep.equal({ type: 'SEARCH_SUBMITTED', isEmployee: true, search: 'AK1' });
      expect(searchSubmitted(false, 'a a')).to.have.property('search').that.is.a('string');
    })

    it(`'renderEmployeeResults' should return { type: 'RENDER_EMPOYEE_RESULTS', results }`, () => {
      expect(renderEmployeeResults([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}])).to.deep.equal({ type: 'RENDER_EMPLOYEE_RESULTS', results: [{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}] });
      expect(renderEmployeeResults([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}, {id: 'JD1', first_name: 'John', last_name: 'Doe'}])).to.have.property('results').that.is.an('array');
    })

  })
})
