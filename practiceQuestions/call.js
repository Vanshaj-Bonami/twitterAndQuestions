// function demo() {
//     const argsArray = Array.prototype.slice.call(arguments);
//     console.log(argsArray); // [1, 2, 3]
// }
// demo(1, 2, 3);

const person1 = {
    name: "vanshaj",
    greet: function (city) {
        console.log(`Hello, ${this.name} from ${city}`);
    }
}

const person2 = {
    name: "Bob"
}

person1.greet.call(person2,"Surat");
