let py = require('pinyin'),
    XRegExp = require('xregexp'),
    wk = require('wanakana'),
    regexps = require('./regexps.js');

function typeOfChar( chr ) {
    if( /[a-zA-Z]/.test( chr ) ) return 2;
    if( /[0-9]/.test( chr ) ) return 3;
    if( regexps.fwn.test( chr ) ) return 4;
    if( regexps.p.test( chr ) ) return 5;
    if( regexps.cc.test( chr ) ) return 1001;
    if( regexps.hrgn.test( chr ) ) return 1002;
    if( regexps.ktkn.test( chr ) ) return 1003;
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

function _toHalfWidth( str ) {
    return str.replace(/[\uFF10-\uFF19]/g, (m) => 
        String.fromCharCode(m.charCodeAt(0) - 0xfee0)
    );
}

function processor( [type, str] ) {
    if( type === 1001 ) return _toPinyin( str );
    if( type === 1002 | type === 1003 ) return wk.toRomaji( str );
    if( type === 4 ) return _toHalfWidth( str );
    if( type === 5 ) return '-';
    return str;
}

module.exports = { typeOfChar, reducer, processor };