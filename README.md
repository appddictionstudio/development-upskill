#Development Level Up!
> Curiosity demands to be extinguished.

##What Is This Repository

I am creating this repository in coordination with Anthony and Kevin to answer the unasked questions that come up during
web development. A correct solution works because it builds upon underlying properties of the language specifications, 
network architecture, and human centered creation of a code base. These hidden factors are often invisible, and much
pain and frustration can be spared if someone can shine a light on them before a learner knows they need to ask about 
these invisible concerns. This repository aims to be that light.

It is my intent to stay at the foundational level. Discussing HTML, CSS, JavaScript, and Java instead of any libraries
or frameworks that build on top of them. There is much productive discussion to be had here before marrying ourselves
to a framework or library. However the ultimate goal is to make your work as developers less arcane and easier to 
succeed at. Please open up pull requests with challenges you would like to see addressed. I can also collect these 
challenges via slack.

The format of each directory is an exploration of the ecosystem around a challenge in web development. I will go far 
afield of simply answering the direct question at hand. This exploration is of great benefit, and I hope elevates you
to new levels of professional success. 

In creating this material I will capture both the google queries and page urls where I gather the information from. The 
only advantage I have is knowing more of the *right* questions to ask. I would highly encourage following the links and 
thinking about what kinds of google searches I am making. This will pay dividends in finding the answer to questions 
that come up over the course of working on stories.

## Topics

###Non Sequential Code Execution

Web applications have a server that services many client applications over the network. This means that we need to build
our functions to allow for asynchronous network calls occurring. If you have ever had a view fail to load because the 
GET request to the server had not finished yet, you have felt this pain.(The console message would mention it can not 
do use X of undefined). 
