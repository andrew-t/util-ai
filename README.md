# util-ai

Are you tired of packages like [lodash](https://lodash.com/) and all their missing functions? Are you sick of having to import dozens of helper libraries to get everything you need? Are you done with having to remember whether a particular function is called `includes` or `contains`? `util-ai` is a new package based on the pioneering work of the team at [is-even-ai](https://github.com/Calvin-LL/is-even-ai) that uses the power of AI to do anything, and of Javascript to _let you_ do anything, to make one package that contains literally every function imaginable (as long as the input and output of that function can be serialised into text for ChatGPT).

Try the example code:

```js
const AiUtil = require("util-ai");
const aiUtil = AiUtil({ apiKey: "YOUR_OPENAI_API_KEY" });

console.log("7 is prime?",
    await aiUtil.isPrime(7));

console.log("Lowest common multiple of 7, 12 and 5",
    await aiUtil.lowestCommonMultiple(7, 12, 5));

console.log("9 is one below a number divisible by three?",
    await aiUtil.isOneBelowANumberDivisibleByThree(9));

console.log("CRAWL is allowed in Wordle?",
    await aiUtil.isAllowedInWordle("CRAWL"));
```

# How does this work?

It probably doesn't, AI is garbage! You'll get wrong answers, more slowly than with real code, and at huge expense both to yourself and the planet! In any case I haven't tested this code because I don't have an OpenAI API key, and refuse to pay for one.

# How is this _supposed_ to work?

In Javascript, `Obj.methodName` is the same as `Obj["methodName"]`, using the regular string indexer. Also, Javascript allows you to make a "proxy" object, which can run any behaviour you like when the string indexer is called. So if we define an object like this:

```js
const aiUtil = new Proxy({}, {
    get(target, name, receiver) {
        return name + " AI";
    }
});
```

then we can index it however we want and that code will run.

```js
console.log(aiUtil["test"]); // -> "test AI"
console.log(aiUtil.secondTest); // -> "secondTest AI"
```

If we return a function, we can run that function like a normal method:

```js
const aiUtil = new Proxy({}, {
    get(target, name, receiver) {
        return () => name + " AI";
    }
});

const value = aiUtil.test();

console.log(value); // -> "test AI"
```

Now all we need to do is have the returned function call ChatGPT, and we can effectively use any function we want!

```js
const aiUtil = new Proxy({}, {
    get(target, name, receiver) {
        return async (...args) => {
            const response = await callChatGpt(
                `Toolbox is a helpful Javascript utility library,
                which contains many useful functions.
                What value would you expect the code
                Toolbox.${name}(${args.map(JSON.stringify).join(", ")})
                to return?
                
                Answer in valid JSON, do not return anything that is not valid JSON.
                Assume the function ${name} exists, is being used correctly,
                and does not throw an error.`
            );
            return JSON.parse(response);
        };
    }
});

const value = await aiUtil.isPrime(7);

console.log(value); // true
```
