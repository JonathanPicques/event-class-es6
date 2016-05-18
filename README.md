event-class-es6 [![Build Status](https://travis-ci.org/JonathanPicques/event-class-es6.svg?branch=master)](https://travis-ci.org/JonathanPicques/event-class-es6)
===============

event-class-es6 is an ES6 ``` module ``` providing event communication to ES6 classes.

Installation
============

```sh
npm install --save event-class-es6
```

Example
=======

```javascript
import EventClass from "event-class-es6"

class EventTest extends EventClass {}

let event = new EventTest();

let cb = event.on("event-on", () => {
    console.log("I've been called");
});

event.once("event-once", () => {
    console.log("I will be called once");
});
```
```javascript
event.emit("event-on");
"I've been called"
event.emit("event-on");
"I've been called"
event.off("event-on", cb);
event.emit("event-name");
event.emit("event-once");
"I will be called once"
event.emit("event-once");

```

API
===

### .on(```event```, ```listener```)
---

This will register the given listener to the given event, multiple listeners can be added to the same event.

### .once(```event```, ```listener```)
---

Same as ```.on``` but will only calls the listener once for the given event.

### .off(```event```, ```[listener=undefined]```)
---

Removes the given listener from listening to the given event.
If listener is undefined, all listeners for the given event will be removed.

### .emit(```event```, ```[...arguments]```)
---

This will call every listeners registered for this given event with the given arguments.
