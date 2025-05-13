const person1 = {
    name: "abc",
    greet: function (city) {
        console.log(`hi ${this.name} from ${city}`)
    }
}

const person2 = {
    name: "def"
}

const getPerson = person1.greet.bind(person2);
getPerson("Surat");
