const minnum = 1;
const maxnum = 100;
const ans =Math.floor(Math.random() * maxnum - minnum + 1) + minnum ;



let attem = 0;
let run = true;
let guess ;

 while(run){
    guess = prompt("Guess a number between 1 and 100");
    guess = Number(guess);
 
    if (isNaN(guess))
    {
        window.alert(`Enter valid numt`)
    }
    else if( guess > 100 || guess < 1){
        window.alert(`Enter valid num`)
    }
    else {
     attem++;
      if (guess < ans){
        window.alert(`too low`)
      }
      else if(guess > ans){
        window.alert(`too high`)

      }
      else {
        window.alert(` Correct!! The answer  is ${ans} it took you ${attem} attempts`)
        run = false;  
    }

    }
}