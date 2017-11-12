let XRegExp = require('xregexp'),
    { typeOfChar, reducer, processor } = require('./utils');

function generateUid( text ) {
    return Array.from( 
        text
            .replace(XRegExp('[\\p{P}\\p{S}]+','g'),'-') //remove punctuations
            .replace(/\s+/g, ' ') //remove 1+ spaces
            .replace(/[-]+/g, '-')
    )
    .map( chr => [ typeOfChar(chr), chr ] ) //tag every char
    .filter( ([type,]) => type > 1 )
    //.map( ([type,chr]) => type === 2 ? '-' : chr )
    .reduce( reducer, [])
    .map( processor )
    .join('-')
    .replace(/[-]+/g, '-')
    .replace(/^-|-$/, '')
    .toLowerCase()
}

module.exports = { generateUid };