/**
 * Use or extend this class to trigger and listen to events
 * @class
 */
export default class EventClass {

    public constructor();

    /**
     * Adds a listener for the given event
     * @param {string} event - the event to listen to
     * @param {function} listener - the callback called when the given event is emitted
     * @returns {function} - event.off(event, listener);
     */
    public on(event: string, listener: () => void): typeof listener;

    /**
     * Adds an one-shot listener for the given event
     * @param {string} event - the event to listen to
     * @param {function} listener - the callback called once when the given event is emitted
     */
    public once(event: string, listener: () => void): void;

    /**
     * Removes the listener for the given event, or removes all listeners for the given event if listener is undefined
     * @param {string} event
     * @param {function} [listener]
     */
    public off(event: string, listener: () => void): void;

    /**
     * Emits an event
     * @param {string} event - all listeners to this event will be notified
     * @param {...*} args - all listeners to this event will be notified with the given arguments
     */
    public emit(event: string, ...args: any[]): void;

}