	var words = ["cookies"]; 

	var currentWord;
	var currentWordUpCase;
	var currentWordArray = [];
	console.log(currentWordArray);
		
	function randomWord(){
		var wordRandomizer = Math.floor(Math.random()*(words.length + 1));
        currentWord = words[wordRandomizer];
	};

	function pickWord(){
        console.log(currentWord);
        if (typeof currentWord === 'undefined'){
        	currentWord = "blackbird";
        }
        currentWordUpCase = currentWord.toUpperCase();
		currentWordArray = currentWordUpCase.split("");
	};
	function setupGuessLetterBoxes(){
		currentWordArray.forEach(function (element,index){
			var selectGuessLetterDiv = "#guessLetter" + index;
			$(selectGuessLetterDiv).css("background-color","white");
		});
	};
	var correctGuesses = [];
	var incorrectGuesses = [];
	var guessedWordArray = [];
	var spinPossibilities = [15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,315,330,345,360];
    var currentMoneyArray = [];
    var spinValue;
    
    function add(a,b){
		return (a+b);
	};
    
    var currentMoney = currentMoneyArray.reduce(add,0);

	function isInputValid() {
       var inputValue = ($("#inputBox").val());
       var trimInputValue = $.trim(inputValue);
       if(trimInputValue.length == 1){ //<--- Checks for only one character
       		if (!(/[A-Z]/ig).test(trimInputValue)){  //<-Tests 4only letters
				var audioElement = document.createElement('audio');
					audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
					audioElement.setAttribute('autoplay', 'autoplay');
   				$("#inputBox").val(null);
   				$("#statusBox").text("You may only use letters. No numbers or special characters allowed.");
   				$(".inputStuff").show();
				$(".solveStuff").show();
   				return false;
			}
			else if (!(/[a,e,i,o,u]/ig).test(trimInputValue)) {
				$("#inputBox").val(null);
				var validInput = trimInputValue.toUpperCase();
				return validInput;
			}
			else if ((/[a,e,i,o,u]/ig).test(trimInputValue)) {
				var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
				audioElement.setAttribute('autoplay', 'autoplay');
				$("#statusBox").text("Please guess a consonant.");
				$(".inputStuff").show();
				$(".solveStuff").show();
			}
       	}
       	else if (!trimInputValue.length){
			var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
				audioElement.setAttribute('autoplay', 'autoplay');
       		$("#statusBox").text("You must guess a letter.");
   			$("#inputBox").val(null);
   			$(".inputStuff").show();
			$(".solveStuff").show();
   			return false;
       	} 
       	else {
			var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
				audioElement.setAttribute('autoplay', 'autoplay');
       		$("#statusBox").text("You may only guess one letter at a time.");
   			$("#inputBox").val(null);
   			$(".inputStuff").show();
			$(".solveStuff").show();
   			return false;
       	} 
    };


    function isVowelValid() {
        var vowelValue = ($("#vowelBox").val());
        var trimVowelValue = $.trim(vowelValue);
        if(trimVowelValue.length == 1){ //<--- Checks for only one character
       		if (!(/[A-Z]/ig).test(trimVowelValue)){  //<-Tests 4only letters
   					var audioElement = document.createElement('audio');
        				audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
        				audioElement.setAttribute('autoplay', 'autoplay');
   				$("#vowelBox").val(null);
   				$("#statusBox").text("You may only use letters. No numbers or special characters allowed.");
   				$(".vowelStuff").show();
				$(".solveStuff").show();
   				return false;
			}
			if ((/[a,e,i,o,u]/ig).test(trimVowelValue)) {
				$("#vowelBox").val(null);
				var validVowel = trimVowelValue.toUpperCase();
				return validVowel;
			}
			if (!(/[a,e,i,o,u]/ig).test(trimVowelValue)) {
				var audioElement = document.createElement('audio');
        				audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
        				audioElement.setAttribute('autoplay', 'autoplay');
				$("#statusBox").text("Please guess a vowel.");
				$(".vowelStuff").show();
				$(".solveStuff").show();
			}
       	}
       	else if (!trimVowelValue.length) {
   			var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
				audioElement.setAttribute('autoplay', 'autoplay');
       		console.log(vowelValue);
       		console.log(trimVowelValue);
       		console.log(trimVowelValue.length);
       		$("#statusBox").text("Please must guess a vowel.");
   			$("#vowelBox").val(null);
   			$(".vowelStuff").show();
			$(".solveStuff").show();
   			return false;
       	} 
       	else {
   			var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
				audioElement.setAttribute('autoplay', 'autoplay');
       		console.log(vowelValue);
       		console.log(trimVowelValue);
       		console.log(trimVowelValue.length);
       		$("#statusBox").text("Please guess a vowel.");
   			$("#vowelBox").val(null);
   			$(".vowelStuff").show();
			$(".solveStuff").show();
   			return false;
       	} 
    };

    function isLetterinWord(currentLetter){
		if (currentLetter) {
			if (currentWordArray.indexOf(currentLetter) == -1){
				return false;
			}
			else { 
				return true;
			}
		}
	};

	function isVowelinWord(currentVowel){
		if (currentVowel) {
			if (currentWordArray.indexOf(currentVowel) == -1){
				return false;
			}
			else { 
				return true;
			}
		}
	};


	function findCurrentLetterInWord(currentWordArray, currentLetter){
		var indexOfCurrentLetterArray = [];
		for (i = 0; i < currentWordArray.length; i++) {
			if (currentWordArray[i] === currentLetter) {
				indexOfCurrentLetterArray.push(i);
				indexOfCurrentLetterArray.forEach(function(element) {
					guessedWordArray.push(currentLetter);
				});
			}
		}
			return indexOfCurrentLetterArray;
	};


	function isGameWon(){
		if (($(guessedWordArray).not(currentWordArray).length === 0 && $(currentWordArray).not(guessedWordArray).length === 0) 
			|| ($("#solveBox").val() == currentWord)) {
			currentMoneyArray.push(1000);
			currentMoney = currentMoneyArray.reduce(add,0);
			$("#currentMoneyBox").text("$" + currentMoney);
			$("#currentMoneyBox").css("color","gold");
			$(".winScreen").show();
			$("#victoryP").text("You Win $" + currentMoney + "!");
			var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', '/img/sounds/winCheer.wav');
				audioElement.setAttribute('autoplay', 'autoplay');
		}
		// else if ($("#solveBox").val() == currentWord){
		// 	$(".winScreen").show();
		// 	var audioElement = document.createElement('audio');
		// 		audioElement.setAttribute('src', '/img/sounds/winCheer.wav');
		// 		audioElement.setAttribute('autoplay', 'autoplay');
		// }
		// else {console.log("Game is not yet won.");}
	};



	function isGameLost(){
		if ((currentMoney < -999) || (incorrectGuesses.length > 4)){
			console.log("Game over!")
			$(".loseScreen").show();
			var audioElement = document.createElement('audio');
				audioElement.setAttribute('src', '/img/sounds/crowdLaugh.wav');
				audioElement.setAttribute('autoplay', 'autoplay');
		}
	};



	function findCurrentVowelInWord(currentWordArray, currentVowel){
		var indexOfCurrentVowelArray = [];
		for (i = 0; i < currentWordArray.length; i++) {
			if (currentWordArray[i] === currentVowel) {
				indexOfCurrentVowelArray.push(i);
				indexOfCurrentVowelArray.forEach(function(element) {
					guessedWordArray.push(currentVowel);
				});
			}
		}
			return indexOfCurrentVowelArray;
	};



	function addCorrectGuess(currentLetter){
		if (isLetterinWord(currentLetter) && correctGuesses.indexOf(currentLetter) == -1) {
			correctGuesses.push(currentLetter);
			return true;
		}
		else {
			return false;
		}
	};



	function addVowelCorrectGuess(currentVowel){
		if (isVowelinWord(currentVowel) && correctGuesses.indexOf(currentVowel) == -1) {
			correctGuesses.push(currentVowel);
			return true;
		}
		else {
			return false;
		}
	};



	function addIncorrectGuess(currentLetter){
		if (currentLetter && !isLetterinWord(currentLetter)) { 
	 		if (incorrectGuesses.indexOf(currentLetter) == -1) {
				incorrectGuesses.push(currentLetter);
				return true;
			}
			else {
				return false;
			}
		}		
	};


	function addVowelIncorrectGuess(currentVowel){
		if (currentVowel && !isVowelinWord(currentVowel)) { 
	 		if (incorrectGuesses.indexOf(currentVowel) == -1) {
				incorrectGuesses.push(currentVowel);
				return true;
			}
			else {
				return false;
			}
		}		
	};



	function updateGuessLetterBoxes1(indexOfCurrentLetterArray,guessedWordArray,currentLetter){
			// whereIsCurrentLetter;
			console.log(guessedWordArray);
			indexOfCurrentLetterArray.forEach(function (element){
				var selectGuessLetterDiv = "#guessLetter" + element;
				$(selectGuessLetterDiv).css("background-color","blue")
			});
	};



	function updateVowelGuessLetterBoxes1(indexOfCurrentVowelArray,guessedWordArray,currentVowel){
			console.log(indexOfCurrentVowelArray);
			console.log(currentVowel);
			console.log(guessedWordArray);
			indexOfCurrentVowelArray.forEach(function (element){
				var selectGuessLetterDiv = "#guessLetter" + element;
				$(selectGuessLetterDiv).css("background-color","blue")
			});
	};



	function updateGuessLetterBoxes2(indexOfCurrentLetterArray,guessedWordArray,currentLetter){   
			indexOfCurrentLetterArray.forEach(function (element,index){
				setTimeout(function(){
					var audioElement = document.createElement('audio');
    				audioElement.setAttribute('src', '/img/sounds/inPuzz.wav');
    				audioElement.setAttribute('autoplay', 'autoplay');
					var selectGuessLetterDiv = "#guessLetter" + element;
					$(selectGuessLetterDiv).text(currentLetter);
					$(selectGuessLetterDiv).css("background-color","#faebd7");
				}.bind(null,index),index*1500);
			});
			
	};



	function updateVowelGuessLetterBoxes2(indexOfCurrentVowelArray,guessedWordArray,currentVowel){   
			indexOfCurrentVowelArray.forEach(function (element,index){
				setTimeout(function(){
					var audioElement = document.createElement('audio');
        				audioElement.setAttribute('src', '/img/sounds/inPuzz.wav');
        				audioElement.setAttribute('autoplay', 'autoplay');
					var selectGuessLetterDiv = "#guessLetter" + element;
					$(selectGuessLetterDiv).text(currentVowel);
					$(selectGuessLetterDiv).css("background-color","#faebd7");
				}.bind(null,index),index*1500);
			});
			
	};


	function startGame(){
		$("#solveBox").val("");
		$("#statusBox").text("");
    	$(".wofWheel").css("transition","transform 0s");
		$(".wofWheel").css("transform","");
    	$("#numIncorrectAnswerBox").text("");
    	$("#incorrectGuessBox").text("");
   		$("#currentMoneyBox").text("$0");
   		$("#currentMoneyBox").css("color","gold");
    	$(".loseScreen").hide();
    	$(".winScreen").hide();
    	$(".startScreen").hide();
		$(".guessLetterBoxes").css("background-color","green");
		$(".guessLetterBoxes").text("");
		$("#wheelStopValue").text("");
		$("#statusBox").text("Let the game begin!");
		currentMoneyArray = [];
		correctGuesses = [];
		incorrectGuesses = [];
		guessedWordArray = [];
		currentMoney = 0;
		setTimeout(function(){
			pickWord();
			setupGuessLetterBoxes();
			var audioElement = document.createElement('audio');
					audioElement.setAttribute('src', '/img/sounds/newCategory.wav');
					audioElement.setAttribute('autoplay', 'autoplay');
		},2000);
		
	};

