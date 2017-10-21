	

var app=angular.module("HangmanApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout) {
	var words=["rat","cat","mat"];
	$scope.incorrectLettersChoosen=[];
	$scope.correctLettersChoosen=[];

	$scope.guesses=6;
	$scope.displayWord='';
	$scope.input={
	    letter:''
	}

	var selectRamdomWord = function(){
		var index= Math.round(Math.random() * words.length);
		return words[index];
	}
	var newGame = function(){
		$scope.incorrectLettersChoosen=[];
		$scope.correctLettersChoosen=[];
		$scope.guesses=6;
		$scope.displayWord='';

		selectedWord= selectRamdomWord();
		var tempDisplayWord='';
		for (var i = 0; i < selectedWord.length; i++) {
			tempDisplayWord +='*'; 
		}
		$scope.displayWord=tempDisplayWord;
	}

	$scope.letterChoosen=function(){
		console.log("Working");
		for (var i = 0; i < $scope.correctLettersChoosen.length; i++) {
			if($scope.correctLettersChoosen[i].toUpperCase()==$scope.input.letter.toUpperCase()){
				$scope.input.letter="";
				return;
			}
		}
		for (var i = 0; i < $scope.incorrectLettersChoosen.length; i++) {
			if($scope.incorrectLettersChoosen[i].toUpperCase()==$scope.input.letter.toUpperCase()){
				$scope.input.letter="";
				return;
			}
		}
		var correct=false;
		for (var i = 0; i < selectedWord.length; i++) {
			if(selectedWord[i].toUpperCase()==$scope.input.letter.toUpperCase())
			{
				$scope.displayWord= $scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				correct=true;				
			}
		}
		if(correct){
			console.log("In If Statement");
			$scope.correctLettersChoosen.push($scope.input.letter.toUpperCase());
		}else{
			$scope.incorrectLettersChoosen.push($scope.input.letter.toUpperCase());
			$scope.guesses--;
		}
		$scope.input.letter='';
		if($scope.guesses==0){
			alert("Oops! You Lost...");
			$timeout(function() {
				newGame();
			}, 500);
		}
		if($scope.displayWord.indexOf("*")==-1){
			alert("Yeh! you Win...");
			$timeout(function() {
				newGame();
			}, 500);	
		}
	}
	$("#demo").roundSlider({
  		min: 0,
		max: 6,

		step: 1,

		value:6,

		radius: 85,
		width: 18,
		sliderType: "min-range",
		circleShape: "pie",
		startAngle: 315,

		animation: true,

		readOnly: false,
		disabled: false,

		keyboardAction: true,
		roundedCorner: false,
		circleShape: "full",
		handleShape: "round",
		handleSize: "-1",

		beforeCreate: null,
		create: null,
		start: null,
		drag: null,
		change: null,
		stop: null,
		tooltipFormat: null


});

	newGame();

}]);