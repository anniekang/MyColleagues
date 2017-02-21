/* global describe, it */

const { ITSelected, ITError, ITConfirmed, employeeSelected, employeeNotFound, employeeFound, employeeSubmitted, missingFieldsNew, employeeSaved, employeeFailure, idSearch, idFound, idNotFound, editRequested, editForm, editSubmitted, missingFieldsEdit, editFailure, editSaved, deleteEmployeeConfirmed, deleteEmployeeError, employeeDeleted } = require('../client/actions/employee-actions');
const { expect } = require('chai');

describe('Actions', () => {
  describe('Employee-Actions', () => {
    it(`'ITSelected' should return { type: 'IT_SELECTED' }`, () => {
      expect(ITSelected()).to.deep.equal({ type: 'IT_SELECTED' });
      expect(ITSelected()).to.be.an('object');
    })

    it(`'ITError' should return { type: 'IT_ERROR' }`, () => {
      expect(ITError()).to.deep.equal({ type: 'IT_ERROR' });
      expect(ITError()).to.not.be.an('array');
    })

    it(`'ITConfirmed' should return { type: 'IT_CONFIRMED' }`, () => {
      expect(ITConfirmed()).to.deep.equal({ type: 'IT_CONFIRMED' });
      expect(ITConfirmed()).to.be.an('object');
      expect(ITConfirmed()).to.not.be.a('string');
    })

    it(`'employeeSelected' should return { type: 'EMPLOYEE_SELECTED', employeeId }`, () => {
      expect(employeeSelected('AK1')).to.deep.equal({ type: 'EMPLOYEE_SELECTED', employeeId: 'AK1' });
      expect(employeeSelected('AK2')).to.be.an('object');
      expect(employeeSelected('BK1')).to.have.property('employeeId');
    })

    it(`'employeeNotFound' should return { type: 'EMPLOYEE_NOT_FOUND' }`, () => {
      expect(employeeNotFound()).to.deep.equal({ type: 'EMPLOYEE_NOT_FOUND' });
      expect(employeeNotFound()).to.be.an('object');
      expect(employeeNotFound()).to.not.be.a('number');
    })

    it(`'employeeFound' should return { type: 'EMPLOYEE_FOUND', response }`, () => {
      expect(employeeFound({id: 'AK1', first_name: 'Annie', last_name: 'Kang'})).to.deep.equal({ type: 'EMPLOYEE_FOUND', response: {id: 'AK1', first_name: 'Annie', last_name: 'Kang'} });
      expect(employeeFound({id: 'AK1'})).to.be.an('object');
      expect(employeeFound({id: 'AK1', first_name: 'Annie', last_name: 'Kang'})).to.include.keys('response');
      expect(employeeFound({id: 'AK2', first_name: 'Annie', last_name: 'Kang'})).to.have.deep.property('response.id', 'AK2');
    })

    it(`'employeeSubmitted' should return { type: 'EMPLOYEE_SUBMITTED' }`, () => {
      expect(employeeSubmitted()).to.deep.equal({ type: 'EMPLOYEE_SUBMITTED' });
      expect(employeeSubmitted()).to.be.an('object');
      expect(employeeSubmitted()).to.have.property('type');
    })

    it(`'missingFieldsNew' should return { type: 'MISSING_FIELDS_NEW', missing, photoError }`, () => {
      expect(missingFieldsNew(['ID', 'First_Name', 'Email'], true)).to.deep.equal({ type: 'MISSING_FIELDS_NEW', missing: ['ID', 'First_Name', 'Email'], photoError: true });
      expect(missingFieldsNew(['First_Name', 'Email'], false)).to.have.property('photoError').that.is.a('boolean');
      expect(missingFieldsNew(['Last_Name', 'Email', 'Manager_ID'], false)).to.have.property('missing').that.is.an('array');
    })

    it(`'employeeSaved' should return { type: 'EMPLOYEE_SAVED', response }`, () => {
      expect(employeeSaved({id: 'MM1', first_name: 'John', last_name: 'Doe', job_title: 'Marketing Manager'})).to.deep.equal({ type: 'EMPLOYEE_SAVED', response: {id: 'MM1', first_name: 'John', last_name: 'Doe', job_title: 'Marketing Manager'} });
      expect(employeeSaved({id: 'FB1', first_name: 'Jane', last_name: 'Doe', job_title: 'CFO'})).to.be.an('object');
      expect(employeeSaved({id: 'FB1', first_name: 'Jane', last_name: 'Doe', job_title: 'CFO'})).to.have.property('response').that.is.an('object');
    })

    it(`'employeeFailure' should return { type: 'EMPLOYEE_FAILURE', errorCode, errorDescription }`, () => {
      expect(employeeFailure('manager', 'AK1')).to.deep.equal({ type: 'EMPLOYEE_FAILURE', errorCode: 'manager', errorDescription: 'AK1' });
      expect(employeeFailure('id', 'AK2')).to.be.an('object');
      expect(employeeFailure('id', 'BK1')).to.have.property('errorCode').that.is.a('string');
    })

    it(`'idSearch' should return { type: 'ID_SEARCH', employeeId }`, () => {
      expect(idSearch('AK1')).to.deep.equal({ type: 'ID_SEARCH', employeeId: 'AK1' });
      expect(idSearch('AK2')).to.be.an('object');
      expect(idSearch('BK1')).to.have.property('employeeId').that.is.a('string');
    })

    it(`'idFound' should return { type: 'ID_FOUND', response }`, () => {
      expect(idFound({id: 'AK1', first_name: 'Annie', last_name: 'Kang'})).to.deep.equal({ type: 'ID_FOUND', response: {id: 'AK1', first_name: 'Annie', last_name: 'Kang'} });
      expect(idFound({id: 'JD1', first_name: 'John', last_name: 'Doe'})).to.be.an('object');
      expect(idFound({id: 'JD1', first_name: 'John', last_name: 'Doe'})).to.have.deep.property('response.first_name', 'John');
    })

    it(`'idNotFound' should return { type: 'ID_NOT_FOUND' }`, () => {
      expect(idNotFound()).to.deep.equal({ type: 'ID_NOT_FOUND' });
      expect(idNotFound()).to.be.an('object');
      expect(idNotFound()).to.have.property('type').that.is.a('string');
    })

    it(`'editRequested' should return { type: 'EDIT_REQUESTED' }`, () => {
      expect(editRequested()).to.deep.equal({ type: 'EDIT_REQUESTED' });
      expect(editRequested()).to.be.an('object');
      expect(editRequested()).to.have.property('type').that.is.a('string')
    })

    it(`'editForm' should return { type: 'EDIT_FORM', response }`, () => {
      expect(editForm({id: 'AK1', first_name: 'Annie', last_name: 'Kang'})).to.deep.equal({ type: 'EDIT_FORM', response: {id: 'AK1', first_name: 'Annie', last_name: 'Kang'} });
      expect(editForm({id: 'AK1', first_name: 'Annie', last_name: 'Kang'})).to.be.an('object');
      expect(editForm({id: 'JD1', first_name: 'John', last_name: 'Doe'})).to.have.deep.property('response.last_name', 'Doe')
    })

    it(`'editSubmitted' should return { type: 'EDIT_SUBMITTED' }`, () => {
      expect(editSubmitted()).to.deep.equal({ type: 'EDIT_SUBMITTED' });
      expect(editSubmitted()).to.be.an('object');
      expect(editSubmitted()).to.have.property('type').that.is.a('string')
    })

    it(`'missingFieldsEdit' should return { type: 'MISSING_FIELDS_EDIT', missing, photoError }`, () => {
      expect(missingFieldsEdit(['First_Name', 'Last_Name', 'Job_Title'], false)).to.deep.equal({ type: 'MISSING_FIELDS_EDIT', missing: ['First_Name', 'Last_Name', 'Job_Title'], photoError: false });
      expect(missingFieldsEdit(['ID', 'First_Name', 'Last_Name', 'Job_Title'], true)).to.be.an('object');
      expect(missingFieldsEdit(['ID', 'First_Name', 'Last_Name', 'Job_Title'], true)).to.have.property('missing').that.is.an('array');
      expect(missingFieldsEdit(['ID', 'First_Name', 'Last_Name', 'Job_Title'], false)).to.have.property('photoError').that.is.a('boolean');
    })

    it(`'editFailure' should return { type: 'EDIT_FAILURE', errorDescription }`, () => {
      expect(editFailure('AK1')).to.deep.equal({ type: 'EDIT_FAILURE', errorDescription: 'AK1' });
      expect(editFailure('AK2')).to.be.an('object');
      expect(editFailure('BK1')).to.have.property('errorDescription').that.is.a('string');
    })

    it(`'editSaved' should return { type: 'EDIT_SAVED', response}`, () => {
      expect(editSaved({id: 'AK1', first_name: 'Annie', last_name: 'Kang'})).to.deep.equal({ type: 'EDIT_SAVED', response: {id: 'AK1', first_name: 'Annie', last_name: 'Kang'} });
      expect(editSaved({id: 'JD1', first_name: 'John', last_name: 'Doe'})).to.be.an('object');
      expect(editSaved({id: 'FB1', first_name: 'Jane', last_name: 'Doe', job_title: 'CFO'})).to.have.deep.property('response.job_title', 'CFO');
    })

    it(`'deleteEmployeeConfirmed' should return { type: 'DELETE_EMPLOYEE_CONFIRMED' }`, () => {
      expect(deleteEmployeeConfirmed()).to.deep.equal({ type: 'DELETE_EMPLOYEE_CONFIRMED' });
      expect(deleteEmployeeConfirmed()).to.be.an('object');
      expect(deleteEmployeeConfirmed()).to.have.property('type').that.is.a('string');
    })

    it(`'deleteEmployeeError' should return { type: 'DELETE_EMPLOYEE_ERROR' }`, () => {
      expect(deleteEmployeeError()).to.deep.equal({ type: 'DELETE_EMPLOYEE_ERROR' });
      expect(deleteEmployeeError()).to.be.an('object');
      expect(deleteEmployeeError()).to.have.property('type').that.is.a('string');
    })

    it(`'employeeDeleted' should return { type: 'EMPLOYEE_DELETED' }`, () => {
      expect(employeeDeleted()).to.deep.equal({ type: 'EMPLOYEE_DELETED' });
      expect(employeeDeleted()).to.be.an('object');
      expect(employeeDeleted()).to.have.property('type').that.is.a('string');
    })

  })
})
