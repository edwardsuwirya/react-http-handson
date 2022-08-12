import {act, renderHook} from "@testing-library/react";
import {useLocalStorage} from "../../../shared/hook/UseLocalStorage";

const localStorageMock = (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key];
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        },
        removeItem(key) {
            delete store[key];
        }
    };
})();

describe('Local Storage Hook', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock
        });
    })
    test('Set Value', () => {
        const {result} = renderHook(() => useLocalStorage('dummy', ''));
        act(() => {
            result.current[1]('123');
        });
        expect(result.current[0]).toBe('123')
    });
    test('Return existing Value', () => {
        window.localStorage.setItem('dummy', '234')
        const {result} = renderHook(() => useLocalStorage('dummy', ''));
        expect(result.current[0]).toBe('234')
    });
    test('Local storage exception when set value', () => {
        window.localStorage.setItem = () => {
            throw new Error('error')
        }
        const {result} = renderHook(() => useLocalStorage('dummy', ''));
        expect(() => result.current[1]('999')).toThrow()
    });
    test('Local storage exception', () => {
        window.localStorage.getItem = () => {
            throw new Error('error')
        }
        const {result} = renderHook(() => useLocalStorage('dummy', '???'));
        expect(result.current[0]).toBe('???')
    });
})