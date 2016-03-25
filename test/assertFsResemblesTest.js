var assert = require('assert');
var mock = require('mock-fs');
var resembles = require('..');

describe('assertFsResembles', function () {

    afterEach(function () {
        mock.restore();
    });

    describe('Acceptance:', function () {
        it('passes if directory contains all files/directories in array', function () {
            mock({ foo: 'hi', bar: 'hello', baz: 'cia', someDir: {} });
            resembles([ 'foo', 'bar', 'baz', 'someDir' ]);
        });

        it('passes if file content is same as specified in object', function () {
            mock({ foo: 'hi', bar: 'hello', baz: 'cia' });
            resembles({ foo: 'hi', bar: 'hello', baz: 'cia' });
        });

        it('passes if nested directory contain all files/directories in array', function () {
            mock({ this_is_a_dir: { foo: 'hi', bar: 'hello', baz: 'cia' } });
            resembles({ this_is_a_dir: [ 'foo', 'bar', 'baz' ] });
        });

        it('passes if nested directory content is same as specified in object', function () {
            mock({ this_is_a_dir: { foo: 'hi', deeper: { bar: 'hello', baz: 'cia' } } });
            resembles({ this_is_a_dir: { foo: 'hi', deeper: { bar: 'hello', baz: 'cia' } } });
        });

    });

    describe('Rejection:', function () {
        it('throws if directory contains files not passed in array', function () {
            mock({ foo: 'hi', bar: 'hello', baz: 'cia' });
            assert.throws(function () {
                resembles([ 'foo', 'bar' ]);
            }, /AssertionError/);
        });

        it('throws if directory contains files not passed in object', function () {
            mock({ foo: 'hi', bar: 'hello', baz: 'cia' });
            assert.throws(function () {
                resembles({ foo: 'hi', bar: 'hello' });
            }, /AssertionError/);
        });

        it('throws if existing file content is different than specified in object', function () {
            mock({ foo: 'hi', bar: 'hello', baz: 'cia' });
            assert.throws(function () {
                resembles({ foo: 'wrong', bar: 'text', baz: 'blah' });
            }, /AssertionError/);
        });
    });
});
