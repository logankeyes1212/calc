$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyAVYlWZhalzqrHqgsqxBbTQ7tUGNj7jnrA",
        authDomain: "calc-ad153.firebaseapp.com",
        databaseURL: "https://calc-ad153.firebaseio.com",
        projectId: "calc-ad153",
        storageBucket: "calc-ad153.appspot.com",
        messagingSenderId: "999764578038",
        appId: "1:999764578038:web:08ec97153c283e8a"
    };
    firebase.initializeApp(firebaseConfig);
    let database = firebase.database();

    let firstNumber = 0;
    let secondNumber = 0;
    let operator = "";
    let result = 0;
    let isOperatorChosen = false;
    let isCalculated = false;

    function initializeCalculator() {
        firstNumber = "";
        secondNumber = "";
        operator = "";
        isOperatorChosen = false;
        isCalculated = false;

        $("#first-number, #second-number, #operator, #result").empty();

    }
    $(".number").on("click", function () {
        if (isCalculated) {
            return false;
        }
        if (isOperatorChosen) {
            secondNumber += $(this).val();
            $("#second-number").text(secondNumber);        
        }
        else {
            firstNumber += $(this).val();
            $("#first-number").text(firstNumber);          
        }      
    });
    
    $(".operator").on("click", function () {
        if (!firstNumber || isCalculated) {
            return false;
        }
        isOperatorChosen = true;
        operator = $(this).val();
        $("#operator").text($(this).text());
       
    });
    $(".equal").on("click", function () {
        if (isCalculated) {
            return false;
        }
        isCalculated = true;
        firstNumber = parseInt(firstNumber);
        secondNumber = parseInt(secondNumber);
        if (operator === "plus") {
            result = firstNumber + secondNumber;
        }
        else if (operator === "minus") {
            result = firstNumber - secondNumber;
        }

        else if (operator === "times") {
            result = firstNumber * secondNumber;
        }

        else if (operator === "divide") {
            result = firstNumber / secondNumber;
        }
        $("#result").text(result);

        database.ref().push({
            firstNumber: firstNumber,
            operator: operator,
            secondNumber: secondNumber,
            result: result   
          });

         
    });
    database.ref().on("child_added", function(snapshot) {
        plus   = "+";
        divide = "/";
        times  = "x";
        minus  = "-";
        operatorResult = snapshot.val().operator;

        
        if(operatorResult === "plus"){
            operatorResult = plus
        }
        else if(operatorResult === "divide"){
            operatorResult = divide
        }
        else if(operatorResult === "minus"){
            operatorResult = minus
        }
        else if(operatorResult === "times"){
            operatorResult = times
        }
        firstNumberResult = snapshot.val().firstNumber;
        secondNumberResult = snapshot.val().secondNumber;
        resultResult = snapshot.val().result;
 



        let res = [];
        
            // data.push(createSomeObject());
        
                res.push(
                    "<tr>" +
                    "<td>" + firstNumberResult+ "</td>" +
                    "<td>" + operatorResult + "</td>" +
                    "<td>" + secondNumberResult + "</td>" +
                    "<td>" + "=" + "</td>"+
                    "<td>" + resultResult + "</td>" +
                    
                    "</tr>")
                
        // res = Array(4).fill(res)
        console.log(operatorResult)
       $('#div').prepend(res);
       
    
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    $(".clear").on("click", function () {
        initializeCalculator();
    });
    initializeCalculator()

})