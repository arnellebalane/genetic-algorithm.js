function noop() {}


function merge(base, extension) {
    return { ...base, ...extension };
}


function extend(base, extension) {
    for (let key of extension) {
        base[key] = extension[key];
    }
    return base;
}


exports.noop = noop;
exports.merge = merge;
exports.extend = extend;
