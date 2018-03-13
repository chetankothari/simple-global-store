import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SimpleGlobalStore from '../src/SimpleGlobalStore';

chai.use(sinonChai);

describe('SimpleGlobalStore', () => {
  beforeEach(() => {
    SimpleGlobalStore.clear();
  });

  afterEach(() => {
    SimpleGlobalStore.clear();
  });

  describe('#initialize', () => {
    it('returns empty object initially', () => {
      expect(SimpleGlobalStore.data).to.deep.equal({});
    });

    it('sets the initial', () => {
      SimpleGlobalStore.initialize({ initialKey: 'initialValue' });

      expect(SimpleGlobalStore.data).to.deep.equal({ initialKey: 'initialValue' });
    });
  });

  describe('#clear', () => {
    it('clears the data', () => {
      SimpleGlobalStore.update({ key: 'value ' });

      SimpleGlobalStore.clear();

      expect(SimpleGlobalStore.data).to.deep.equal({});
    });
  });

  describe('#update', () => {
    it('adds the key someKey with value', () => {
      SimpleGlobalStore.update({ someKey: 'value' });

      expect(SimpleGlobalStore.data).to.deep.equal({ someKey: 'value' });
    });

    it('adds the key anotherKey with anotherValue', () => {
      SimpleGlobalStore.update({ anotherKey: 'anotherValue' });

      expect(SimpleGlobalStore.data).to.deep.equal({ anotherKey: 'anotherValue' });
    });

    it('updates the key someKey with newValue', () => {
      SimpleGlobalStore.update({ someKey: 'someValue' });

      SimpleGlobalStore.update({ someKey: 'newValue' });

      expect(SimpleGlobalStore.data).to.deep.equal({ someKey: 'newValue' });
    });

    it('add a nested key nestedKey with nestedValue for nestedObject', () => {
      SimpleGlobalStore.update({ nestedObject: {} });

      SimpleGlobalStore.update({ nestedObject: { nestedKey: 'nestedValue' } });

      expect(SimpleGlobalStore.data).to.deep.equal({ nestedObject: { nestedKey: 'nestedValue' } });
    });
  });

  describe('#addChangeListener', () => {
    it('adds subscriber for store updates', () => {
      const callBack = sinon.spy();

      SimpleGlobalStore.addChangeListener(callBack);
      SimpleGlobalStore.update({ someKey: 'value' });

      expect(callBack).to.have.been.called;
    });

    it('notifies multiple subscribers on store updates', () => {
      const aCallBack = sinon.spy();
      const anotherCallBack = sinon.spy();

      SimpleGlobalStore.addChangeListener(aCallBack);
      SimpleGlobalStore.addChangeListener(anotherCallBack);
      SimpleGlobalStore.update({ someKey: 'value' });

      expect(aCallBack).to.have.been.called;
      expect(anotherCallBack).to.have.been.called;
    });
  });

  describe('#removeChangeListener', () => {
    it('adds subscriber for store updates', () => {
      const callBack = sinon.spy();

      SimpleGlobalStore.addChangeListener(callBack);
      SimpleGlobalStore.removeChangeListener(callBack);
      SimpleGlobalStore.update({ someKey: 'value' });

      expect(callBack).to.not.have.been.called;
    });
  });
});
