import { EventEmitter } from 'events';

const SIMPLE_GLOBAL_STORE_CHANGE = 'simple-global-store-change';

class SimpleGlobalStore extends EventEmitter {
  constructor() {
    super();
    this._data = {};
  }

  initialize(data) {
    this._data = { ...data };
  }

  addChangeListener(callback) {
    this.on(SIMPLE_GLOBAL_STORE_CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(SIMPLE_GLOBAL_STORE_CHANGE, callback);
  }

  _emitChange() {
    this.emit(SIMPLE_GLOBAL_STORE_CHANGE);
  }

  get data() {
    return { ...this._data };
  }

  update(data) {
    this._data = { ...this._data, ...data };
    this._emitChange();
  }

  clear() {
    this._data = {};
    this._emitChange();
  }
}

module.exports = new SimpleGlobalStore();
