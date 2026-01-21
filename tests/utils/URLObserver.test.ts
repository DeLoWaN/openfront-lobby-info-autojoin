/**
 * Tests for URLObserver utility
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { URLObserver } from '@/utils/URLObserver';

const expectAny = expect as unknown as (value: unknown) => any;

describe('URLObserver', () => {
  beforeEach(() => {
    // Reset the observer state between tests
    URLObserver.callbacks = [];
    URLObserver.initialized = false;
    URLObserver.lastUrl = location.href;
  });

  it('should initialize only once', () => {
    expectAny(URLObserver.initialized).toBe(false);

    URLObserver.init();
    expectAny(URLObserver.initialized).toBe(true);

    // Second call should not reinitialize
    URLObserver.init();
    expectAny(URLObserver.initialized).toBe(true);
  });

  it('should add callbacks via subscribe', () => {
    const callback = vi.fn();

    expectAny(URLObserver.callbacks.length).toBe(0);

    URLObserver.subscribe(callback);

    expectAny(URLObserver.callbacks.length).toBe(1);
    expectAny(URLObserver.callbacks[0]).toBe(callback);
  });

  it('should initialize when subscribing', () => {
    expectAny(URLObserver.initialized).toBe(false);

    const callback = vi.fn();
    URLObserver.subscribe(callback);

    expectAny(URLObserver.initialized).toBe(true);
  });

  it('should notify all subscribers', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    URLObserver.subscribe(callback1);
    URLObserver.subscribe(callback2);

    URLObserver.notify();

    expectAny(callback1).toHaveBeenCalledWith(location.href);
    expectAny(callback2).toHaveBeenCalledWith(location.href);
  });
});
