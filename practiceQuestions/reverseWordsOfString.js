const str = "vanshaj gangwar";

function reverseTheWordOfString(input) {
    let resversedChars = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
        resversedChars[i] = input[input.length - 1 - i];
    }
    return resversedChars.join("");
}

function reverseTheString(input) {
    const words = input.split(" ");
    const reversedWords = [];
    for(let word of words){
        reversedWords.push(reverseTheWordOfString(word));
    }
    return reversedWords.join(" ");
}

console.log(reverseTheString(str));