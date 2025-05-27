const obj = { name: "John" };

function greet(greeting1, greeting2) {
    // Use 'this' to access the context
    console.log(this,"inside greet");
    console.log(greeting1 + " " + greeting2 + " " + this.name);
}

// Custom implementation of call
Function.prototype.myCall = function (context, ...args) {
    console.log(args);
    // Set the context to the function being called
    context.fn = this;
    console.log(this, context, context.fn);
    // Call the function with the provided context and arguments
    const result = context.fn(...args);
    // Delete the temporary function from the context
    delete context.fn;
    // Return the result of the function call
    console.log(this, context, context.fn);
    return result;
}

greet.myCall(obj, "Hello", "World");