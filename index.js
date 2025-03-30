const OpenAi = require("openai");

module.exports = function UtilAi(config) {
    const openAi = new OpenAi(config);

    let send = async (opts) => {
        const stream = openAi.beta.chat.completions.stream(opts);
        let response = "";
        for await (const chunk of stream)
          response += chunk.choices[0]?.delta?.content || "";
        return JSON.parse(response);
    };

    return new Proxy({}, {
        set(target, name, value, receiver) {
            if (name == "openAi") {
                send = value;
                return true;
            }
            return false;
        },
        get(target, name, receiver) {
            return (...args) => send({
              messages: [
                {
                    role: "system",
                    content: `Toolbox is a helpful Javascript utility library, which contains many useful functions. Your job is to predict what a particular code snippet would return. Assume the function being called exists within Toolbox, is being called correctly, and does not return an error. Respond with the output you would expect as valid JSON, including literals such as true, false, 4, null, etc. Do not return anything that is not valid JSON. If the output is a string then return it in double quotes with special characters escaped, suitable for passing to JSON.parse`
                },
                {
                    role: "user",
                    content: `In valid JSON, what output would you expect Toolbox.${name}(${args.map(a => JSON.stringify(a)).join(", ")}) to return?`
                }
              ],
              model: "gpt-3.5-turbo",
              temperature: 0,
            });
        }
    });
};
