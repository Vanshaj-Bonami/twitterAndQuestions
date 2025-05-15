function foo() {
    if (this.name) {
        return this.name;
    } else {
        for (let key in this) {
            if (typeof this[key] === "string") {
                return key;
            }
        }
        return "no key of string type exist";
    }
}

const obj = {
    name: "vanshaj"
}

const obj2 = {
    huh: "sffd",
    shash: "dfdsfsf"
}

console.log(foo.call(obj));
console.log(foo.call(obj2));

const person = {
    name :"shashwat",
    details : {
        age:23,
    }
}

const person2 = {...person};
person.details.age = 30;
console.log(person2.details.age);

console.log("start")
setTimeout(() => {
    console.log("inside setTimeout")
}, 1000);
const p = new Promise((res,rej) => {
    console.log("promise")
    setTimeout(() => {
        console.log("promise resolved")
    }, 1000);
    res("promise resolved")
})
console.log("end")