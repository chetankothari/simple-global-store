### Simple Global Store

Install

```
yarn add simple-global-store
```
or
```
npm install --save simple-global-store
```

Usage
```
import store from 'simple-global-store'
```

You have the following methods available on the store.

`.initialize(data)`

Allows you to set the initial data.

`.data`

Is the state of the store

`.addChangeListener(callback)`

Adds a change listener to the store which will be notified whenever any change is done to the store.

`.removeChangeListener(callback)`

Removes the change listener from further change notifications.

`.update(data)`

Updates the data to the current store data. Will add the data if the key to the object does not exist, overrides otherwise. It expects a object.

`.clear()`

Sets the store data to an empty object `{}`.
