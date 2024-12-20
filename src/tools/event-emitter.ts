export type EventNames = 'API:UN_AUTH' | 'API:INVALID'

type ListenerMap = {
  [K in EventNames]: Set<Function>
}

class EventEmitter {
  private listeners: ListenerMap = {
    'API:UN_AUTH': new Set(),
    'API:INVALID': new Set(),
  }

  on(event: EventNames, listener: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set()
    }
    if (typeof listener !== 'function') {
      throw new TypeError(`[${event} on] Listener must be a function.`)
    }
    this.listeners[event].add(listener)
    return () => this.off(event, listener)
  }

  emit(event: EventNames, ...args: any[]) {
    this.listeners[event].forEach((listener) => listener(...args))
    return this
  }

  off(event: EventNames, listener: Function) {
    if (!this.listeners[event]) return true

    if (typeof listener !== 'function') {
      throw new TypeError(`[${event} off] Listener must be a function.`)
    }

    return this.listeners[event].delete(listener)
  }
}

/**
 * 抛出单例模式
 */
export default new EventEmitter()
