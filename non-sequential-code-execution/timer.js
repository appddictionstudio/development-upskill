/*
Naive Attempt
I tried to provide the function plus argument as the first argument to setTimeout. When I got the error message I
tried running it to see how it would fail. The result was it just ignored the setTimeout method
*/
function printMessage(msg){
    console.log(msg);
}
setTimeout(printMessage('First'), 3000);
printMessage('Second');
printMessage('Third');

/*
Bug Validation
Before I went to google I wanted to make sure I did not have the syntax wrong somehow. I removed the argument and
changed the function definition to provide a default value. This means that printMessage2 would either print the
user provided msg variable or the string literal 'Hi'
 */
function printMessage2(msg = 'Hi'){
    console.log(msg);
}
setTimeout(printMessage2, 3000);
printMessage2('Second');
printMessage2('Third');

/*
Final Result
After making the google search I found two solutions to my problem. I went ahead and used both of them for maximum impact.
 */

function printMessage3(msg){
    console.log(msg);
}
setTimeout(function() {printMessage3('First')}, 3000);
printMessage3('Second');
window.setTimeout(printMessage3, 3000, 'Third');
