export const Helper = function() {};

Helper.prototype.arrayToHex = function(arr) {
    var result = '';
    var value;

    for (var i = 0; i < arr.length; i++) {
        value = arr[i].toString(16);
        result += (value.length === 1 ? '0' + value : value);
    }
    return result;
};