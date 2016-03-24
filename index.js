var fs = require('fs');
var path = require('path');
var assert = require('assert');

var objectToString =  Object.prototype.toString

function isObject(something) {
    return objectToString.apply(something) === '[object Object]';
}

function isArray(something) {
    return objectToString.apply(something) === '[object Array]';
}

function isString(something) {
    return typeof something === 'string' || objectToString(something) === '[object String]';
}

function resembles(representation, currentLocation) {
    currentLocation = currentLocation || '';

    // Basic file comparison...
    // [ 'filename1', 'filename2' ]
    if (isArray(representation)) {
        compareDirectory(representation.sort(), currentLocation);

    }

    // Comparison with contents...
    // { filename1: 'some content', filename2: 'some more content' }
    else if (isObject(representation)) {
        compareDirectory(Object.keys(representation).sort(), currentLocation);

        representation.each(function (content, key) {
            var newLocation = path.join(currentLocation, key)

            if (isString(content)) {
                compareFileContent(content, newLocation);
            }

            if (isArray(content) ||  isObject(content)) {
                resembles(content, newLocation);
            }
        });
    } }

function compareDirectory(expected, location) {
    var actual = fs.readdirSync(location).sort();
    assert.deepEqual(actual, expected, location + ': Directory contents should match');
}

function compareFileContent(expected, location) {
    var actual = fs.readFileSync(location, 'utf-8');
    assert.equal(actual, expected, 'File contents should match');
}

module.exports = resembles;
