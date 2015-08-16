function noop() {}


function extend(base, extension) {
    return { ...base, ...extension };
}


exports.noop = noop;
exports.extend = extend;
