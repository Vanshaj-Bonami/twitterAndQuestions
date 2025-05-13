const person1 = {
    name: "abc",
    greet: function (city, country) {
        console.log(`hi ${this.name} from ${city} ${country}`)
    }
}

const person2 = {
    name: "def"
}
person1.greet("west Bengal","India")
person1.greet.apply(person2,["Surat","India"])