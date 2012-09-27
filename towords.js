/**
 *  Copyright (C) 2012 Marcin Kurzyna
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to
 *  deal in the Software without restriction, including without limitation the
 *  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 *  sell copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *  IN THE SOFTWARE.
 *
 *  Usage:
 *
 *  var wordString = new toWords(number, locale).translate();
 *
 *  Example:
 *
 *  var wordString =
 *      new toWords(11).
 *      translate(); // "jedenaście"
 *
 *  var wordString =
 *      new toWords(11, 'es').
 *      setDict(toWordsDictionaryES).
 *      translate(); // "once"
 *
 */
var toWords = (function () {
    var toWordsClass, dicts = {};

    // main object definition
    toWordsClass = function toWordsConstructor(number, locale) {
        this.locale = locale || 'pl';
        this.number = parseInt(number, 10);

        if (isNaN(this.number)) {
            throw new Error('Argument is not a number');
        }
    };

    // static dictionary setter
    toWordsClass.setDict = function(dict, locale) {
        if (typeof dict !== 'function') {
            throw new Error('Dictionary must be a function');
        }

        dicts[locale] = dict;
    };

    toWordsClass.prototype.setDict = function(dict, locale) {
        toWordsClass.setDict(dict, locale || this.locale);
        return this;
    };

    toWordsClass.prototype.translate = function() {
        var me = this;

        if (typeof dicts[this.locale] === 'undefined') {
            throw new Error('Dictionary for this locale is not set');
        }

        return dicts[this.locale].call(me, this.number);
    };

    return toWordsClass;
})();

