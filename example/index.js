const { apiKey } = require("./creds.json");

const UtilAi = require("..");

const utilAi = UtilAi({ apiKey });

(async function () {
    for (let i = 1; i <= 10; ++i) {
        const p = await utilAi.isPrime(i);
        console.log(`${i} is ${p ? "prime" : "not prime"}`);
    }

    for (let i = 1; i <= 10; ++i) {
        const a = await utilAi.isAbove(i, 5);
        console.log(`${i} is ${a ? "above" : "not above"} five`);
    }

    for (let i = 1; i <= 10; ++i) {
        const d = await utilAi.isOneBelowANumberDivisibleByThree(i);
        console.log(`${i} is ${d ? "" : "not "}one below a number divisible by three`);
    }

    const words = ["FISHY", "PHPHT", "BLANG", "GHSDF", "TIMER"];
    for (const word of words) {
        const w = await utilAi.isAllowedInWordle(word);
        console.log(`${i} is ${w ? "allowed" : "not allowed"} in Wordle`);
    }
}());

