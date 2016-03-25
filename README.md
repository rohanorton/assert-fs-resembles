assert-fs-resembles
===================

Assertion that check state of filesystem directory

A simple assertion module that compares an object passed in to the state of the
current working directory. It's very useful when using fs-mock. Used
successfully in mocha. It's pretty dumb still.

API is basically something like this:

```js
assertFsResembles({
    mydir: {
        myfile: 'my file content'
    }
})
```

I wrote this for testing
[batch-file-renamer](https://github.com/rohanorton/batch-file-renamer), please
feel free to check out how I've used it in the tests for that.
