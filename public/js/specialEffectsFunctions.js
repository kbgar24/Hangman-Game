'use strict';

	function clickWheel() {
		$("#wheelStopValue").text("");
		$("#statusBox").text("");
		console.log(guessedWordArray);
		var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', '/img/sounds/wheelCut.wav');
			audioElement.setAttribute('autoplay', 'autoplay');
		var randomDegIndex = Math.floor(Math.random()*(27));
		var currentDegSpin = (spinPossibilities[randomDegIndex])+1080;
		var currentDeg = (spinPossibilities[randomDegIndex]);
		var negCurrentDeg = -currentDeg;

		$("#wheelStopValue").text("");
		$(".wofWheel").css("transition","transform 2s ease out");
    	
    	if (currentDeg == 15) {spinValue = 500}
    	else if (currentDeg == 30) {spinValue = 175}
    	else if (currentDeg == 45) {spinValue = 300}
    	else if (currentDeg == 60) {spinValue = 200}
    	else if (currentDeg == 75) {spinValue = 75}
    	else if (currentDeg == 90) {spinValue = 125}
    	else if (currentDeg == 105) {spinValue = 100}
    	else if (currentDeg == 120) {spinValue = 25}
    	else if (currentDeg == 135) {spinValue = 200}
    	else if (currentDeg == 150) {spinValue = "Free Spin!"}
    	else if (currentDeg == 165) {spinValue = 100}
    	else if (currentDeg == 180) {spinValue = 200}
    	else if (currentDeg == 195) {spinValue = 50}
    	else if (currentDeg == 210) {spinValue = 450}
    	else if (currentDeg == 225) {spinValue = "Lose a Turn!"}
    	else if (currentDeg == 240) {spinValue = 100}
    	else if (currentDeg == 255) {spinValue = 275}
    	else if (currentDeg == 270) {spinValue = 75}
    	else if (currentDeg == 285) {spinValue = 150}
    	else if (currentDeg == 300) {spinValue = "Buy a Vowel!"}
    	else if (currentDeg == 315) {spinValue = 100}
    	else if (currentDeg == 330) {spinValue = 250}
    	else if (currentDeg == 345) {spinValue = 50}
    	else if (currentDeg == 360) {spinValue = "BANKRUPT!"}

    	var wheelDegree = -currentDegSpin;
	    var rotateWheel = "rotate(" + wheelDegree + "deg)";
	    console.log(rotateWheel);
	    $(".wofWheel").css("transform",rotateWheel);
	 
	    function findSpinValue(){
		    if (isNaN(spinValue)){
		    	$(".inputStuff").hide();
				$(".solveStuff").hide();
		    	 $("#wheelStopValue").text(spinValue);
		    	 if(spinValue == "BANKRUPT!"){
	    	 		var audioElement = document.createElement('audio');
						audioElement.setAttribute('src', '/img/sounds/bankrupt.wav');
						audioElement.setAttribute('autoplay', 'autoplay');
		    	 	currentMoneyArray = [];
		    	 	$("#currentMoneyBox").text("$0");
		    	 	if (currentMoney > 0) {
		    	 		$("#currentMoneyBox").text("$0");
		    	 	}
		    	 	setTimeout(function(){
			    	 	$(".inputStuff").hide();
			    	 	$("#inputBox").val(null);
			    	 	$(".solveStuff").hide();
			    	 	$(".wofWheel").css("transition","transform 0s");
						$(".wofWheel").css("transform","");
					},44000);
		    	 }
		    	 if(spinValue == "Buy a Vowel!"){
		    	 	$(".vowelStuff").show();
		    	 	$(".inputStuff").hide();
		    	 	$(".solveStuff").show();
		    	 	$("#inputBox").val(null);
		    	}
		    	if(spinValue == "Free Spin!"){
		    	 	$(".inputStuff").hide();
					$(".solveStuff").hide();
					$("#inputBox").val(null);
					setTimeout(function(){
			    	 	$(".wofWheel").css("transition","transform 0s");
						$(".wofWheel").css("transform","");
					},6400);
		    	 }
		    	if(spinValue == "Lose a Turn!") {
		    	 	$(".inputStuff").hide();
					$(".solveStuff").hide();
					$("#inputBox").val(null);
					setTimeout(function(){
			    	 	$(".wofWheel").css("transition","transform 0s");
						$(".wofWheel").css("transform","");
					},6400);
		    	}
		    }
		    else if (!isNaN(spinValue)) {
		    	$("#wheelStopValue").text("$" + spinValue)
	    		$(".inputStuff").show();
				$(".solveStuff").show();
		    }
		};
		setTimeout(findSpinValue,4400);
	};

	function solveButton(){
		$(".inputStuff").hide();
		$(".solveStuff").hide();
		$(".vowelStuff").hide();
		console.log($("#solveBox").val());
			console.log(currentWord);
			if ($("#solveBox").val() == currentWord){
				isGameWon();
			}
			else {
				var audioElement = document.createElement('audio');
					audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
					audioElement.setAttribute('autoplay', 'autoplay')
				$("#statusBox").text("Sorry, " + $("#solveBox").val() + " is not the correct word! You lose $1000!");
				$(".solveStuff").val(null);
				console.log(currentMoney);
				currentMoneyArray.push(-1000);
				currentMoney = currentMoneyArray.reduce(add,0);
				console.log(currentMoney);
				if (currentMoney < 0) {
					$("#currentMoneyBox").text("-$" + (-1 * currentMoney));
					$("#currentMoneyBox").css("color","red");
				}
				else {
					$("#currentMoneyBox").text("$" + currentMoney);
					$("#currentMoneyBox").css("color","gold");
				}
			isGameLost();
			}
	};


	function inputClick(){
		// console.log($("#inputBox").val());
			$(".inputStuff").hide();
			// $("#inputBox").val(null);
			$(".solveStuff").hide();
			var currentLetter = isInputValid();
			var whereIsCurrentLetter = findCurrentLetterInWord(currentWordArray, currentLetter);
			// findCurrentLetterInWord(currentWordArray, currentLetter);
			if (!isLetterinWord(currentLetter) && currentLetter) {
				if (addIncorrectGuess(currentLetter)) {
					var audioElement = document.createElement('audio');
						audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
						audioElement.setAttribute('autoplay', 'autoplay');
					$("#statusBox").text("Sorry, the letter '" + currentLetter + "' is not in the word.");
					$("#incorrectGuessBox").text(incorrectGuesses);

					$("#numIncorrectAnswerBox").text("Total Number of Incorrect Guesses: " + incorrectGuesses.length);
				}
				else { 
					$("#statusBox").text("You've already guessed the letter '" + currentLetter + "'.");
				}
			}
			
			if (isLetterinWord(currentLetter)) { 
				if (addCorrectGuess(currentLetter)) {
					if (whereIsCurrentLetter.length > 1) {
						var audioElement = document.createElement('audio');
							audioElement.setAttribute('src', '/img/sounds/applause.wav');
							audioElement.setAttribute('autoplay', 'autoplay');
						$("#statusBox").html("Congrats! There are " + whereIsCurrentLetter.length + " " +currentLetter + "'s.");
							console.log(whereIsCurrentLetter);
							console.log(spinValue);
							console.log((whereIsCurrentLetter.length*spinValue));
							currentMoneyArray.push((whereIsCurrentLetter.length*spinValue));
							console.log(currentMoneyArray);
							currentMoney = currentMoneyArray.reduce(add,0);
							if (currentMoney < 0) {
								$("#currentMoneyBox").text("-$" + (-1 * currentMoney));
								$("#currentMoneyBox").css("color","red");
							}
							else {
								$("#currentMoneyBox").text("$" + currentMoney);
								$("#currentMoneyBox").css("color","gold");
							}

						console.log("You've won $" + currentMoney);
						if (whereIsCurrentLetter){
							console.log("The letter '" + currentLetter + "' is at position(s): "  + whereIsCurrentLetter);
							// guessedWordArray = [];
							// guessedWordArray
						}
					}
					else {
						var audioElement = document.createElement('audio');
							audioElement.setAttribute('src', '/img/sounds/applause.wav');
							audioElement.setAttribute('autoplay', 'autoplay');
						$("#statusBox").html("Congrats! There is one " + currentLetter + ".");
							console.log(whereIsCurrentLetter);
							console.log(spinValue);
							console.log((whereIsCurrentLetter.length*spinValue));
							currentMoneyArray.push((whereIsCurrentLetter.length*spinValue));
							console.log(currentMoneyArray);
							currentMoney = currentMoneyArray.reduce(add,0);
							if (currentMoney < 0) {
								$("#currentMoneyBox").text("-$" + (-1 * currentMoney));
								$("#currentMoneyBox").css("color","red");
							}
							else {
								$("#currentMoneyBox").text("$" + currentMoney);
								$("#currentMoneyBox").css("color","gold");
							}

						console.log("You've won $" + currentMoney);
						if (whereIsCurrentLetter){
							console.log("The letter '" + currentLetter + "' is at position(s): "  + whereIsCurrentLetter);
							// guessedWordArray = [];
							// guessedWordArray;
						}
					}
				}
				else {
					$("#statusBox").html("You've already guessed the letter '" + currentLetter);
				}
			}
		updateGuessLetterBoxes1(whereIsCurrentLetter,guessedWordArray,currentLetter);
			setTimeout(function(){
				updateGuessLetterBoxes2(whereIsCurrentLetter,guessedWordArray,currentLetter);
			},1500)	;

			
			$(".wofWheel").css("transition","transform 0s");
			$(".wofWheel").css("transform","");
		isGameWon();
		isGameLost();

	};
	function vowelClick(){
	// console.log($("#inputBox").val());
			$(".vowelStuff").hide();
			// $("#inputBox").val(null);
			$(".solveStuff").hide();
			var currentVowel = isVowelValid();
			var whereIsCurrentVowel = findCurrentVowelInWord(currentWordArray, currentVowel);
			// findCurrentLetterInWord(currentWordArray, currentLetter);
			if (!isVowelinWord(currentVowel) && currentVowel) {
				if (addIncorrectGuess(currentVowel)) {
					var audioElement = document.createElement('audio');
						audioElement.setAttribute('src', '/img/sounds/wrongBuzzer.wav');
						audioElement.setAttribute('autoplay', 'autoplay');
					$("#statusBox").text("Sorry, the vowel '" + currentVowel + "' is not in the word.");
					$("#incorrectGuessBox").text(incorrectGuesses);

					$("#numIncorrectAnswerBox").text("Total Number of Incorrect Guesses: " + incorrectGuesses.length);
				}
				else { 
					$("#statusBox").text("You've already guessed the vowel '" + currentVowel + "'.");
				}
			}
			
			if (isVowelinWord(currentVowel)) { 
				if (addVowelCorrectGuess(currentVowel)) {
					if (whereIsCurrentVowel.length > 1) {
						var audioElement = document.createElement('audio');
							audioElement.setAttribute('src', '/img/sounds/applause.wav');
							audioElement.setAttribute('autoplay', 'autoplay');
						$("#statusBox").html("Congrats! There are " + whereIsCurrentVowel.length + " " +currentVowel + "'s.");
							console.log(whereIsCurrentVowel);
							console.log(whereIsCurrentVowel.length*(-250));
							currentMoneyArray.push((whereIsCurrentVowel.length*(-250)));
							console.log(currentMoneyArray);
							currentMoney = currentMoneyArray.reduce(add,0);
							if (currentMoney < 0) {
								$("#currentMoneyBox").text("-$" + (-1 * currentMoney));
								$("#currentMoneyBox").css("color","red");
							}
							else {
								$("#currentMoneyBox").text("$" + currentMoney);
								$("#currentMoneyBox").css("color","gold");
							}

						console.log("You've won $" + currentMoney);
						if (whereIsCurrentVowel){
							console.log("The vowel '" + currentVowel + "' is at position(s): "  + whereIsCurrentVowel);
							// guessedWordArray = [];
							// guessedWordArray
						}
					}
					else {
						var audioElement = document.createElement('audio');
							audioElement.setAttribute('src', '/img/sounds/applause.wav');
							audioElement.setAttribute('autoplay', 'autoplay');
						$("#statusBox").html("Congrats! There is one " + currentVowel + ".");
							console.log(whereIsCurrentVowel);
							console.log((whereIsCurrentVowel.length*(-250)));
							currentMoneyArray.push((whereIsCurrentVowel.length*(-250)));
							console.log(currentMoneyArray);
							currentMoney = currentMoneyArray.reduce(add,0);
							if (currentMoney < 0) {
								$("#currentMoneyBox").text("-$" + (-1 * currentMoney));
								$("#currentMoneyBox").css("color","red");
							}
							else {
								$("#currentMoneyBox").text("$" + currentMoney);
								$("#currentMoneyBox").css("color","gold");
							}

						console.log("You've won $" + currentMoney);
						if (whereIsCurrentVowel){
							console.log("The letter '" + currentVowel + "' is at position(s): "  + whereIsCurrentVowel);
							// guessedWordArray = [];
							// guessedWordArray;
						}
					}
				}
				else {
					$("#statusBox").html("You've already guessed the letter '" + currentVowel);
				}
			}
		updateVowelGuessLetterBoxes1(whereIsCurrentVowel,guessedWordArray,currentVowel); 
		
		setTimeout(function(){
			updateVowelGuessLetterBoxes2(whereIsCurrentVowel,guessedWordArray,currentVowel);
		},1500)	;

			
			$(".wofWheel").css("transition","transform 0s");
			$(".wofWheel").css("transform","");
		isGameWon();
		isGameLost();

		};
