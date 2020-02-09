# Application Code and Time
*Abstract: Some form of asynchronous functions are required for distributed systems. The nature of asynchronicity
 implies a stream of data. This data stream is handled using callback functions and other artifacts of functional
 programming models. Knowing how JavaScript can be asynchronous while having a single execution thread and how callback
 functions built into Promises and Async/Await will make working with network calls a routine procedure* 
## Section Headings
##### Synchronous Versus Asynchronous
##### JavaScript as a Single Threaded Language
##### Functional Programming and JavaScript
##### Callback Functions
##### Callbacks, Promises and Async/Await

##Synchronous Versus Asynchronous
Synchronous code runs serially. That is one line after another, the classic example is:
```
function printMessage(msg){
    console.log(msg);
}
printMessage('First');
printMessage('Second');
printMessage('Third');
//Outputs
First
Second
Third
```
We can make this code asynchronous by adding a timer([set timer js](https://www.w3schools.com/js/js_timing.asp)) 
to one or more of the method calls.
```
function printMessage(msg){
    console.log(msg);
}
setTimeout(function() {printMessage('First')}, 3000);
printMessage('Second');
window.setTimeout(printMessage, 3000, 'Third');
//Outputs
Second
First
Third
```
Here are the highlights from the above code block.
* setTimeout is a function that takes a function as its argument. This argument is called a callback function.
We will explore those in more depth later.
* setTimeout is part of the [window object](https://www.w3schools.com/jsref/obj_window.asp). Therefore timers and
intervals are tied to open browser windows. Explicitly declaring window is optional.
* setTimeout only works with static functions, see the related *Troubleshooting Aside*.
    * First uses a separate call back function to wrap our argument taking function and satisfy setTimout.
    * Third uses the fact that setTimeout has a variable argument list in its definition. Any extra arguments we apply
    will try to be applied to our given function.
* When multiple items are given the same time to wait they behave as though they were synchronous. This will be important
when discussing JavaScript execution.

This idea of timeouts is important because any JavaScript we make a network request with must wait for a response.
Depending on many conditions(distance to server, internet speed) this will be faster or slower.
#### Troubleshooting Aside
See timer.js for a breakdown of my troubleshooting. This is the google query I made: 
[set timeout function ith variable](https://electrictoolbox.com/javascript-settimeout-variable-parameters/)
##JavaScript as a Single Threaded Language
Outside of our scope here but node.js has 
[worker threads](https://blog.logrocket.com/node-js-multithreading-what-are-worker-threads-and-why-do-they-matter-48ab102f8b10/).
I am not familiar with node.js and am going to keep the focus on client side JavaScript for now.

A multithreaded process is able to take advantage of multiple CPUs in a system. Code can be broken out across these 
different threads to increase performance. This idea is called concurrency, and can introduce some very very tricky
problems to an application. For now we are only concerned with a single thread. Specifically the fact that JavaScript
uses a single thread for code execution. There is a key question we have to answer:

**How did our code earlier keep executing while waiting for the timeout functions?**
[javascript single thread explained](https://www.sohamkamani.com/blog/2016/03/14/wrapping-your-head-around-async-programming/)

While that blog post provides a great example of how a single thread and asynchronous execution can work together. To 
really understand **HOW** JavaScript works we should talk about the 
[javascript event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop).

>JavaScript has a concurrency model based on an event loop, which is responsible for executing the code, collecting and 
>processing events, and executing queued sub-tasks. This model is quite different from models in other languages 
>like C and Java.

I'm going to defer here to an amazing explanation about
[What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ). Watching and understanding this
video should be the one thing you take away from this subsection, possibly even this whole document.
##Functional Programming and JavaScript
>In functional code, the output value of a function depends only on its arguments, so calling a function with the 
>same value for an argument always produces the same result.
>[Functional Programming](https://en.wikipedia.org/wiki/Functional_programming)

There are many different programming paradigms in the world. You are familiar with Object Oriented Programming from Java,
and are already using functional programming though you might now know it by that name. Of interest to us are higher
order functions, and showcasing some examples of functional programming you already use inside of JavaScript day to day.
The concept of higher order functions is critical to callback functions, and is leveraged in implementation of
asynchronous data calls.

A higher order function is a function that can accept another function as an argument. This means that setTimeout from
earlier was a higher order function, and we see this used in many places inside of JavaScript.
```
const people = [
    {name: 'Joe', age: 19, contact: 1234567890},
    {name: 'Jane', age: 17, contact: 1234567890},
    {name: 'Amy', age: 16, contact: 1234567890},
    {name: 'Ted', age: 22, contact: 1234567890},
]
//eligibleVoters is included as an intermediary step
const eligibleVoters = people.filter((person) => person.age >= 18);
const eligibleVoterContactList = people
.filter((person) => person.age >= 18)
.map((person) => {return {person.name, person.contact}})
```
Here we apply the filter and map methods to an array of person objects. Note that map and filter meet the definition of
functional code. The output only depends on the input, the list they are method chained from, and nothing else.
Also note that these functional methods are often logically chained together. The order of chaining may or may not matter.
To create a contact list of eligible voters from our list of people, we first choose to filter anyone who is not old
enough to vote. Here our input is the whole list, and our output excludes anyone with an age property under 18. This
new list immediately feeds into the map function as input. In this case now that we know we have pruned anyone not 
meeting the age requirement from our list, we can condense the list to names and phone numbers to make the data easier
to work with for the campaign volunteers.

We see this same model used inside of network requests.
```
I would like to have data about what parts we have in stock in order to know what to order.
I make an API call to retrieve the list of all parts in stock.
When the API call completes then I can process the data.
I apply a filter on the list for objects with less than a certain quantity
A user alert is generated of each of the items in this list
```
##Callback Functions
By the time I reached this section I felt like I had explained and/or referenced call back functions enough for the 
purposes of this document. Open a PR or slack me if you want more expansion on this subsection. 

##Callbacks, Promises, and Async/Await
Finally we arrive at the crux of our challenge. Promises and Async/Await are syntactically equivalent ways to make 
network call responses blocking for everything that depends on them and non blocking for everything else. 

The following article explains this topic quite well.
[promises and callbacks](https://scotch.io/courses/10-need-to-know-javascript-concepts/callbacks-promises-and-async)

The last point of interest for us is [promises javascript event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
Those notes explain among other things how to create a promise using basic JavaScript callbacks. This is what runs
under the hood in both Promises and Async/Await.

