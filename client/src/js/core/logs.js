// Copyright (c) 2015 Gleb Bahmutov
// Copyright (c) 2018 Kell ideas Ltd


export const logs = function initConsoleLogDiv(logsElement) {
    if (console.log.toDiv) {
        return;
    }

    function toString(x) {
        return typeof x === 'string' ? x : JSON.stringify(x);
    }

    // let log = console.log.bind(console);
    const error = console.error.bind(console);
    // let warn = console.warn.bind(console);

    function printToDiv(...args) {
        const msg = Array.prototype.slice.call(args, 0)
            .map(toString)
            .join(' ');
        const item = document.createElement('div');
        item.classList.add('logs__row');
        item.classList.add('logs__error');
        item.textContent = msg;
        logsElement.appendChild(item);
    }

    console.log.toDiv = true;

    console.error = function errorWithCopy(...args) {
        error(...args);
        printToDiv(...args);
    };

    window.addEventListener('error', (err) => {
        printToDiv('EXCEPTION:', err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
    });
};
