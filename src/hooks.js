import { useCallback, useRef, useState } from "react";

// Хук добавляющий задержку перед обработкой 
export function useDebounce(callback, delay) {
    const timer = useRef();

    const debouncedCallback = useCallback((...args) => {
        if(timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay)
    }, [callback, delay]); 

    return debouncedCallback;
};

// Хук контралирующий инпут 
export function useInput(defaultValue, callback) {
    const [value, setValue] = useState(defaultValue);

    const onChange = (event) => { 
        const val = event.target.value;
        setValue(val);
        callback(val); 
    }

    const clear = () => setValue('');

    return {
        bind: { value, onChange },
        clear
    }
}