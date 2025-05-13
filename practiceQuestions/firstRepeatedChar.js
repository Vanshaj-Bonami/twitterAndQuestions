function firstRepeatedChar (str){
    let map = {};
    for(const char of str){
        if(map[char]){
            return char;
        }else{
            map[char] = true;
        }
    }
    return null;
}

console.log(firstRepeatedChar("john doe"));
