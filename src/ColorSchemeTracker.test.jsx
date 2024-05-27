import React from 'react'
import { render, act } from '@testing-library/react';
import ColorSchemeTracker from './ColorSchemeTracker';

describe('ColorSchemeTracker', () => {
    let matchMedia;
    let onSchemeChange;
    let removeEventListenerSpy

    beforeEach(() => {
        onSchemeChange = jest.fn();
        removeEventListenerSpy = jest.fn();
        matchMedia = window.matchMedia;
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query === '(prefers-color-scheme: dark)',
            addEventListener: (_, callback) => callback({ matches: query === '(prefers-color-scheme: dark)' }),
            removeEventListener: removeEventListenerSpy,
        }));
    })
    afterEach(() => {
        window.matchMedia = matchMedia;
    });

    it('selects dark', () => {
        act(() => {
            render(<ColorSchemeTracker onSchemeChange={onSchemeChange} />);
        })
        expect(onSchemeChange).toHaveBeenCalledWith('dark');
    });

    it('selects light', () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: query !== '(prefers-color-scheme: dark)',
            addEventListener: (_, callback) => callback({ matches: query !== '(prefers-color-scheme: dark)' }),
            removeEventListener: jest.fn(),
        }));
        act(() => {
            render(<ColorSchemeTracker onSchemeChange={onSchemeChange} />); 
        })
        expect(onSchemeChange).toHaveBeenCalledWith('light');
    });

    it('cleans up the event listener on unmount', () => {
        const { unmount } = render(<ColorSchemeTracker onSchemeChange={onSchemeChange} />);
        expect(removeEventListenerSpy).not.toHaveBeenCalled();
        unmount();
        expect(removeEventListenerSpy).toBeCalledTimes(1)
    });
});