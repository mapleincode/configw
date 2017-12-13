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

exports.get = function get(obj, path) {
    let tmp = obj;
    path = path || '';

    const paths = path.split('.').filter(s => s);
    if(!paths.length) {
        return;
    }
    for(const p of paths) {
        tmp = tmp || {};
        tmp = tmp[p];
        if(tmp === undefined) {
            return;
        }
    }
    return tmp;
};
