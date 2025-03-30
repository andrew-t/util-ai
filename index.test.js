const UtilAi = require(".");

const utilAi = UtilAi({
    apiKey: "EXAMPLE"
});

describe("index", () => {
    it("should call ChatGPT and return the result", async () => {
        let passedOpts = null;
        // stub out the server because i'm not paying for an api key
        utilAi.openAi = async (opts) => {
            passedOpts = opts;
            return true;
        };
        expect(await utilAi.isPrime(7)).toBe(true);
        expect(passedOpts).toEqual({
            "messages": [
                {
                    "content": "Toolbox is a helpful Javascript utility library, which contains many useful functions. Your job is to predict what a particular code snippet would return. Assume the function being called exists within Toolbox, is being called correctly, and does not return an error. Respond with the output you would expect as valid JSON, including literals such as true, false, 4, null, etc. Do not return anything that is not valid JSON. If the output is a string then return it in double quotes with special characters escaped, suitable for passing to JSON.parse",
                    "role": "system",
                },
                {
                    "content": "In valid JSON, what output would you expect Toolbox.isPrime(7) to return?",
                    "role": "user",
                },
            ],
            "model": "gpt-3.5-turbo",
            "temperature": 0,
        });
    });

    it("should handle multiple parameters", async () => {
        let passedOpts = null;
        // stub out the server because i'm not paying for an api key
        utilAi.openAi = async (opts) => {
            passedOpts = opts;
            return true;
        };
        expect(await utilAi.isGreaterThan(7, "three")).toBe(true);
        expect(passedOpts).toEqual({
            "messages": [
                {
                    "content": "Toolbox is a helpful Javascript utility library, which contains many useful functions. Your job is to predict what a particular code snippet would return. Assume the function being called exists within Toolbox, is being called correctly, and does not return an error. Respond with the output you would expect as valid JSON, including literals such as true, false, 4, null, etc. Do not return anything that is not valid JSON. If the output is a string then return it in double quotes with special characters escaped, suitable for passing to JSON.parse",
                    "role": "system",
                },
                {
                    "content": "In valid JSON, what output would you expect Toolbox.isGreaterThan(7, \"three\") to return?",
                    "role": "user",
                },
            ],
            "model": "gpt-3.5-turbo",
            "temperature": 0,
        });
    });

    it("should handle other data types", async () => {
        let passedOpts = null;
        // stub out the server because i'm not paying for an api key
        utilAi.openAi = async (opts) => {
            passedOpts = opts;
            return "seven";
        };
        expect(await utilAi.toEnglishName(7)).toBe("seven");
        expect(passedOpts).toEqual({
            "messages": [
                {
                    "content": "Toolbox is a helpful Javascript utility library, which contains many useful functions. Your job is to predict what a particular code snippet would return. Assume the function being called exists within Toolbox, is being called correctly, and does not return an error. Respond with the output you would expect as valid JSON, including literals such as true, false, 4, null, etc. Do not return anything that is not valid JSON. If the output is a string then return it in double quotes with special characters escaped, suitable for passing to JSON.parse",
                    "role": "system",
                },
                {
                    "content": "In valid JSON, what output would you expect Toolbox.toEnglishName(7) to return?",
                    "role": "user",
                },
            ],
            "model": "gpt-3.5-turbo",
            "temperature": 0,
        });
    });
});
