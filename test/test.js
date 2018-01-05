import sinon from "sinon";
import {assert, expect} from "chai";
import EventClass from "../event-class-es6";

describe("event-class-es6 tests", () => {
    it("should listen to a given event", () => {
        const event = new EventClass();
        const spy = sinon.spy();
        event.on("stuff", spy);
        event.emit("stuff");
        assert.ok(spy.called);
    });
    it("should listen to a given event only once", () => {
        const event = new EventClass();
        const spy = sinon.spy();
        event.once("stuff", spy);
        event.emit("stuff");
        event.emit("stuff");
        assert.ok(spy.calledOnce);
    });
    it("should listen to a given event and get the emitted arguments", () => {
        const event = new EventClass();
        const spy = sinon.spy();
        event.on("stuff", spy);
        event.emit("stuff", 3, null, false);
        assert.ok(spy.calledWith(3, null, false));
    });
    it("should listen to a given event and remove the listener", () => {
        const event = new EventClass();
        const spy = sinon.spy();
        event.on("stuff", spy);
        event.off("stuff");
        event.emit("stuff");
        assert.ok(spy.notCalled);
        event.on("stuff", spy);
        event.emit("stuff");
        assert.ok(spy.called);
    });
    it("should listen to the given events", () => {
        const event = new EventClass();
        const stuffSpy = sinon.spy();
        const randomSpy = sinon.spy();
        event.on("stuff", stuffSpy);
        event.on("random", randomSpy);
        assert.ok(stuffSpy.notCalled);
        assert.ok(randomSpy.notCalled);
        event.emit("random");
        assert.ok(stuffSpy.notCalled);
        assert.ok(randomSpy.called);
        event.emit("stuff");
        assert.ok(stuffSpy.called);
        assert.ok(randomSpy.called);
    });
    it("should listen multiple times to a given event", () => {
        const event = new EventClass();
        const spy = sinon.spy();
        event.on("stuff", spy);
        event.on("stuff", spy);
        event.on("stuff", spy);
        event.emit("stuff");
        assert.ok(spy.calledThrice);
    });
    it("should remove the specified listener for a given event", () => {
        const event = new EventClass();
        const spy = sinon.spy();
        const listener = event.on("stuff", () => {
            spy();
        });
        event.on("stuff", spy);
        event.on("stuff", spy);
        event.off("stuff", listener);
        event.emit("stuff");
        assert.ok(spy.calledTwice);
    });
    it("should remove all listeners for a given event", () => {
        const event = new EventClass();
        const stuffSpy = sinon.spy();
        const randomSpy = sinon.spy();
        event.on("stuff", stuffSpy);
        event.on("stuff", stuffSpy);
        event.on("stuff", stuffSpy);
        event.on("random", randomSpy);
        event.on("random", randomSpy);
        event.off("stuff");
        event.emit("stuff");
        event.emit("random");
        assert.ok(stuffSpy.notCalled);
        assert.ok(randomSpy.calledTwice);
    });
    it("should listen to a given event within a class extending EventClass", () => {
        const spy = sinon.spy();
        const eventClass = new class extends EventClass {
            constructor() {
                super();
                this.randomNumber = Math.random();
                this.on("stuff", spy);
            }

            doStuff() {
                this.emit("stuff", this.randomNumber);
            }
        };
        eventClass.doStuff();
        assert.ok(spy.calledWith(eventClass.randomNumber));
    });
    it("should do magic", () => {
        const event = new EventClass();
        const spy = sinon.spy();
        const a = () => {
            spy();
        };
        const b = () => {
            spy();
        };
        const c = () => {
            spy();
        };
        event.on("a", a);
        event.on("b", b);
        event.on("c", c);
        event.off("a", b);
        event.off("a", c);
        event.off("b", a);
        event.off("b", c);
        event.off("c", a);
        event.off("c", b);
        event.emit("a");
        event.emit("b");
        event.emit("c");
        assert(spy.calledThrice);
    });
    it("should ensure that once is correctly unregistered event if the listener throws", () => {
        const event = new EventClass();
        const spy = sinon.spy();
        event.once("once", () => {
            spy();
            throw new Error();
        });
        try {
            event.emit("once");
        } catch (e) {
        }
        try {
            event.emit("once");
        } catch (e) {
        }
        assert(spy.calledOnce);
    })
});
