import * as _ from 'lodash';
import { Common } from '../common';

export namespace Eval {
    export function replaceAt(input, search, replace, start, end) {
        return input.slice(0, start)
            + input.slice(start, end).replace(search, replace)
            + input.slice(end);
    }

    export function getIndexStart(arr, currentIndex) {
        if (currentIndex === 0) { return 0; }
        const getPreviousSize = (i, size) => {
            const index = i - 1;
            if (index === -1) { return size; }
            size += arr[index].length;
            return getPreviousSize(index, size);
        };
        return getPreviousSize(currentIndex, 0);
    }

    export function isVariable(str = '') {
        const firstChar = str.charAt(0);
        return /[a-zA-Z]/g.test(firstChar)
                || firstChar === '$'
                || firstChar === '_';
    }

    export function exec(source, context, prefix = '') {
        const referenceSelf = `this.${prefix ? prefix += '.' : ''}`, regex = /\$*[a-z0-9.$]+\s*/gi, keys = source.match(regex);
        keys.forEach((str, i) => {
            const key = str.replace(/\s/g, ''),
                indexStart = getIndexStart(keys, i);
            const indexEnd = indexStart + source.substring(indexStart, source.length).indexOf(key) + key.length;
            if (!key.includes(referenceSelf)) {
                const isVar = !prefix.trim() ? context.hasOwnProperty(Common.getFirstKey(key)) : isVariable(key);
                if (isVar) {
                    source = replaceAt(source, key, `${referenceSelf}${key}`, indexStart, indexEnd);
                }
            }
        });
        try {
            return function(str) {
                return eval(str);
            }.call(context, source);
        } catch (e) { }
    }
}
