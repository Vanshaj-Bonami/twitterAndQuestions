const obj = {name: "John"};

function greet(...argsArray){
    // console.log(this, "inside greet");
    return function (){
        console.log(this, "inside greet");
        console.log(argsArray);
        console.log(this.name, ...argsArray);
    }
}

// greet.bind(obj, ["Hello", "World"])();

// Custom implementation of bind
Function.prototype.myBind = function (context, ...args){
    context.fn = this; // here context is the object which is passed to the function
}

greet.myBind(obj, ["Hello", "World"])();