let readline = require("readline");
let secretNumber;
let numAttempts;

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

function checkGuess(n){
    let num = Number(n);
    if(num > secretNumber){
        console.log('Too high');
        return false;
    }else if(num < secretNumber){
        console.log('Too low');
        return false;
    }else{
        console.log('Correct');
        return true;
    }
}

function askGuess(){
    rl.question("Enter a guess: ", answer => {
        if(numAttempts === 0){
            console.log('You Lose');
            rl.close();
        }else if(!checkGuess(answer)){
            numAttempts--;
            askGuess();  
        } else{
            console.log("You win!");
            rl.close();
        }
    });
}

function randomInRange(min, max){
    let range = max - min; 
    let rand = Math.random();
    let decimal = min + (range * rand);
    if(rand <= 0.5){
        return Math.floor(decimal);
    }else{
        return Math.ceil(decimal)
    }
}

function askRange(){
    rl.question("Enter a max number: ", max => {
        rl.question("Enter a min number: ", min => {
            console.log("I'm thinking of a number between " + min + " and " + max + "...");
            let minNum = Number(min);
            let maxNum = Number(max);
            secretNumber = randomInRange(minNum, maxNum);
            numAttempts--;
            askGuess();
        })
    })
}

function askLimit(){
    rl.question("How many guesses: ", guesses => {
        numAttempts = guesses;
        askRange();
    })
}

askLimit();




