let { generateUid:g } = require('.');

let tests = [
    //[string, description]
    ['阿暖あにクロイ-122UUU&&&^-……「」', 'default test'],
    ['冰封1000アイス１０００', 'full-width numbers'],
    ['ABC・abc', 'full-width punctuations'],
    ['aa---bb', 'multiple dashes'],
];

for( let item of tests ) {
    console.log(`Result for \x1b[33m${item[0]}\x1b[0m${item[1]?' ('+item[1]+')':''}: \x1b[34m${g(item[0])}\x1b[0m`);
}