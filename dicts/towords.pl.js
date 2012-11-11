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
 */
(function polishToWordsDictionaryDefiner() {
    var words = {};

    if (typeof toWords === 'undefined')
        return;

    words.digits = [
        '', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć' ,
        'dziesięc', 'jedenaście', 'dwanascie', 'trzynaście', 'czternaście', 'piętanście', 'szesnaście',
        'siedemnaście', 'osiemnaście', 'dziewiętnaście'
    ];

    words.tens = [
        '', '', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt',
        'osiemdziesiąt', 'dziewięćdziesiąt'
    ];

    words.hundrets = [
        '', 'sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset', 'sześćset', 'siedemset',
        'osiemset', 'dziewięćset'
    ];

    words.groups = [
        ['','',''],
        ['tysiąc','tysiące','tysięcy'],
        ['milion','miliony','milionów'],
        ['miliard','miliardy','miliardów'],
        ['bilion','biliony','bilionów'],
        ['biliard','biliardy','biliardów'],
        ['trylion','tryliony','trylionów'],
        ['tryliard','tryliardy','tryliardów'],
        ['kwadrylion','kwadryliony','kwadrylionów'],
        ['kwadryliard','kwadryliardy','kwadryliardów'],
        ['kwintylion','kwintyliony','kwintylionów'],
        ['kwintyliiard','kwintyliardy','kwintyliardów'],
        ['sekstylion','sekstyliony','sekstylionów'],
        ['sekstyliard','sekstyliardy','sekstyliardów'],
        ['septylion','septyliony','septylionów'],
        ['septyliard','septyliardy','septyliardów'],
        ['oktylion','oktyliony','oktylionów'],
        ['oktyliard','oktyliardy','oktyliardów'],
        ['nonylion','nonyliony','nonylionów'],
        ['nonyliard','nonyliardy','nonyliardów'],
        ['decylion','decyliony','decylionów'],
        ['decyliard','decyliardy','decyliardów'],
        ['centylion','centyliony','centylionów'],
        ['centyliard','centyliardy','centyliardów'],
        ['wicylion','wicylion','wicylion'],
        ['wicyliard','wicyliardy','wicyliardów'],
        ['trycylion','trycylion','trycylion'],
        ['trycyliard','trycyliardy','trycyliardów'],
        ['kwadragilion','kwadragilion','kwadragilion'],
        ['kwadragiliard','kwadragiliardy','kwadragiliardów'],
        ['kwinkwagilion','kwinkwagilion','kwinkwagilion'],
        ['kwinkwagiliard','kwinkwagiliardy','kwinkwagiliardów'],
        ['seskwilion','seskwilion','seskwilion'],
        ['seskwiliard','seskwiliardy','seskwiliardów'],
        ['septagilion','septagilion','septagilion'],
        ['septagiliard','septagiliardy','septagiliardów'],
        ['oktogilion','oktogilion','oktogilion'],
        ['oktogiliard','oktogiliardy','oktogiliardów'],
        ['nonagilion','nonagilion','nonagilion'],
        ['nonagiliard','nonagiliardy','nonagiliardów'],
        ['centylion','centyliony','centylionów'],
        ['centyliard','centyliardy','centyliardów']
    ];

    toWords.setDict(function toWordsDictionaryPL(number) {
        var s = 0, d = 0, j = 0, k = 0, g = 0,
            result = '', isLessThenZero = false;

        if (number === 0) {
            return 'zero';
        }

        if (number < 0) {
            isLessThenZero = true;
            number = Math.abs(number);
        }

        while (number > 0) {

            s = Math.floor((number % 1000)/100),
            d = Math.floor((number % 100)/10),
            j = Math.floor(number % (d==1?20:10));

            if (d === 0 && j === 1) {
                k = 0; // "tysiąc"
            } else if ( j > 1 && j < 5) {
                k = 1; // "tysiące"
            } else {
                k = 2; // "tysięcy"
            }

            // exists at least one...
            if (s+d+j > 0) {
                result =
                    words.hundrets[s] + ' ' +
                    words.tens[d] + ' ' +
                    words.digits[j] + ' ' +
                    words.groups[g][k] + ' ' +
                    result;
            }

            g++;
            number = Math.floor(number/1000);
        }

        return (isLessThenZero ? 'minus ' : '') + result;

    }, 'pl');
})();