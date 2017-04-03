exports.enumerate = length => {
    return [...new Array(length)].map((_, i) => i);
};

exports.pick = array => {
    return array[Math.floor(Math.random() * array.length)];
};

exports.difference = (array, values) => {
    return array.filter(item => !values.includes(item));
};
