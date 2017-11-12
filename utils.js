let py = require('pinyin'),
    XRegExp = require('xregexp'),
    wk = require('wanakana');

let chineseCharacterRegex = /^[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]$/;

function typeOfChar( chr ) {
    if( /[a-zA-Z]/.test( chr ) ) return 2;
    if( /[0-9]/.test( chr ) ) return 3;
    if( chineseCharacterRegex.test(chr) ) return 1001;
    if( XRegExp('^[\\p{Hiragana}]$').test( chr ) ) return 1002;
    if( XRegExp('^[\\p{Katakana}]$').test( chr ) ) return 1003;
    if( chr === '-' ) return 1;
    return 0;
}

function reducer( prev, curr ) {
    if( prev.length && prev[prev.length-1][0] === curr[0] ) prev[prev.length-1][1] += curr[1];
    else prev.push( curr );

    return prev;
}

function _toPinyin( str ) {
    return py( str, { style: py.STYLE_NORMAL } )
        .map( v => v[0] )
        .join('-');
}

function processor( [type, str] ) {
    if( type === 1001 ) return _toPinyin( str );
    if( type === 1002 | type === 1003 ) return wk.toRomaji( str );
    return str;
}

module.exports = { typeOfChar, reducer, processor };