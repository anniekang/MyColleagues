/* global describe, it */

const { orgSubmitted, orgDataReceived, renderManager, renderEmployee, renderPeers, renderReports } = require('../client/actions/org-chart-actions');
const { expect } = require('chai');

describe('Actions', () => {
  describe('Org-Chart-Actions', () => {
    it(`'orgSubmitted' should return { type: 'ORG_SUBMITTED' }`, () => {
      expect(orgSubmitted()).to.deep.equal({ type: 'ORG_SUBMITTED' });
      expect(orgSubmitted()).to.be.an('object');
    })

    it(`'orgDataReceived' should return { type: 'ORG_DATA_RECEIVED' }`, () => {
      expect(orgDataReceived()).to.deep.equal({ type: 'ORG_DATA_RECEIVED' });
      expect(orgDataReceived()).to.not.be.an('array');
    })

    it(`'renderManager' should return { type: 'RENDER_MANAGER', response }`, () => {
      expect(renderManager({id: 'AK1', first_name: 'Annie', last_name: 'Kang'})).to.deep.equal({ type: 'RENDER_MANAGER', response: {id: 'AK1', first_name: 'Annie', last_name: 'Kang'} });
      expect(renderManager({id: 'JD1', first_name: 'John', last_name: 'Doe', job_title: 'Marketing Manager'})).to.have.deep.property('response.last_name', 'Doe')
    })

    it(`'renderEmployee' should return { type: 'RENDER_EMPLOYEE', response }`, () => {
      expect(renderEmployee([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}])).to.deep.equal({ type: 'RENDER_EMPLOYEE', response: [{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}] });
      expect(renderEmployee([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}, {id: 'JD1', first_name: 'John', last_name: 'Doe'}])).to.have.property('response').that.is.an('array');
    })

    it(`'renderPeers' should return { type: 'RENDER_PEERS', response }`, () => {
      expect(renderPeers([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}])).to.deep.equal({ type: 'RENDER_PEERS', response: [{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}] });
      expect(renderPeers([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}, {id: 'JD1', first_name: 'John', last_name: 'Doe'}])).to.have.property('response').that.is.an('array');
    })

    it(`'renderReports' should return { type: 'RENDER_REPORTS', response }`, () => {
      expect(renderReports([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}])).to.deep.equal({ type: 'RENDER_REPORTS', response: [{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}] });
      expect(renderReports([{id: 'AK1', first_name: 'Annie', last_name: 'Kang'}, {id: 'JD1', first_name: 'John', last_name: 'Doe'}])).to.have.property('response').that.is.an('array');
    })

  })
})
