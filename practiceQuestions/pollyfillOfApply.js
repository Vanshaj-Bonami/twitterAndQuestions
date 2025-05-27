const obj = { name: "john" };

function greet(...argsArray) { // here argsArray is an array of arguments passed to the function by using rest operator
    console.log(this.name, ...argsArray);
}

// greet.apply(obj, ["Hello", "World"]);

// Custom implementation of apply
Function.prototype.myApply = function (context, args){
    console.log(context, this, args);
    context.fn = this; // here context is the object which is passed to the function
    const result = context.fn(...args); // here we are calling the function with the context and arguments
    delete context.fn; // here we are deleting the function from the context
    return result; // here we are returning the result of the function
}

greet.myApply(obj, ["Hello", "World"]);