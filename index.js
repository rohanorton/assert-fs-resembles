var fs = require('fs');
var path = require('path');
var assert = require('assert');
var _ = require('lodash');

function resembles(representation, currentLocation) {
    currentLocation = currentLocation || '';

    // Basic file comparison...
    // [ 'filename1', 'filename2' ]
    if (_.isArray(representation)) {
        compareDirectory(representation.sort(), currentLocation);

    }

    // Comparison with contents...
    // { filename1: 'some content', filename2: 'some more content' }
    else if (_.isObject(representation)) {
        compareDirectory(_.keys(representation).sort(), currentLocation);

        _.each(representation, function (content, key) {
            var newLocation = path.join(currentLocation, key)

            if (_.isString(content)) {
                compareFileContent(content, newLocation);
            }

            if (_.isArray(content) ||  _.isObject(content)) {
                resembles(content, newLocation);
            }
        });
    } }

function compareDirectory(expected, location) {
    var actual = fs.readdirSync(location).sort();
    assert.deepEqual(actual, expected, location + ': Directory contents should match');
}

function compareContent(representation, location) {

}

function compareFileContent(expected, location) {
    var actual = fs.readFileSync(location, 'utf-8');
    assert.equal(actual, expected, 'File contents should match');
}

module.exports = resembles;
