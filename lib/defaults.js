'use strcit';

exports.assign = function(one, two) {
    if(typeof one !== 'object') {
        one = {};
    }
    if(typeof two !== 'object') {
        two = {};
    }
    for(const key in two) {
        if(!two.hasOwnProperty(key)) continue;
        if(two[key] !== null && two[key] !== undefined) {
            one[key] = two[key];
        }
    }
    return one;
};
