// Copyright (c) 2015 Gleb Bahmutov
// Copyright (c) 2018 Kell ideas Ltd


export const logs = function initConsoleLogDiv(logTo) {

    if (console.log.toDiv) {
        return;
    }

    function toString(x) {
        return typeof x === 'string' ? x : JSON.stringify(x);
    }

    let log = console.log.bind(console);
    let error = console.error.bind(console);
    let warn = console.warn.bind(console);
    let table = console.table ? console.table.bind(console) : null;
    let consoleId = 'console-log-div';

    function printToDiv() {
        let msg = Array.prototype.slice.call(arguments, 0)
            .map(toString)
            .join(' ');
        let item = document.createElement('div');
        item.classList.add('logs__row');
        item.textContent = msg;
        logTo.appendChild(item);
    }

    function logWithCopy() {
        log(...arguments);
        printToDiv(...arguments);
    }

    console.log = logWithCopy;
    console.log.toDiv = true;

    console.error = function errorWithCopy() {
        error(...arguments);
        let args = Array.prototype.slice.call(arguments, 0);
        args.unshift('ERROR:');
        printToDiv(...args);
    };

    console.warn = function logWarning() {
        warn(...arguments);
        let args = Array.prototype.slice.call(arguments, 0);
        args.unshift('WARNING:');
        printToDiv(...args);
    };

    function printTable(objArr, keys) {
        let numCols = keys.length;
        let len = objArr.length;
        let $table = document.createElement('table');
        $table.style.width = '100%';
        $table.setAttribute('border', '1');
        let $head = document.createElement('thead');
        let $tdata = document.createElement('td');
        $tdata.innerHTML = 'Index';
        $head.appendChild($tdata);

        for (let k = 0; k < numCols; k++) {
            $tdata = document.createElement('td');
            $tdata.innerHTML = keys[k];
            $head.appendChild($tdata);
        }
        $table.appendChild($head);

        for (let i = 0; i < len; i++) {
            let $line = document.createElement('tr');
            $tdata = document.createElement('td');
            $tdata.innerHTML = i;
            $line.appendChild($tdata);

            for (let j = 0; j < numCols; j++) {
                $tdata = document.createElement('td');
                $tdata.innerHTML = objArr[i][keys[j]];
                $line.appendChild($tdata);
            }
            $table.appendChild($line);
        }
        let div = document.getElementById('console-log-text');
        div.appendChild($table);
    }

    console.table = function logTable() {
        if (typeof table === 'function') {
            table(...arguments);
        }

        let objArr = arguments[0];
        let keys;

        if (typeof objArr[0] !== 'undefined') {
            keys = Object.keys(objArr[0]);
        }
        printTable(objArr, keys);
    };

    window.addEventListener('error', (err) => {
        printToDiv('EXCEPTION:', err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
    });
};
