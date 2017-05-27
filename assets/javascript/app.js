$(document).ready(function() {

	//hover function for css styling with start button on start page
	$("#startBTN").hover(function() {
		$("#startBTN").css({
			"margin-top" : "22px",
			"margin-bottom" : "18px",
			"margin-right" : "2px"
		});
	},function() {
		$("#startBTN").css({
			"margin-top" : "20px",
			"margin-bottom" : "20px",
			"margin-right" : "0px"
		});			
	});

	//variable for converting miliseconds to seconds
	var seconds = 1000;
	//variable for game length in seconds
	var maxCount = 120;

	//initialize the win and loss variables
	var wins = 0;
	var losses = 0;

	//make timer that will stop at 0 and go to checkAnswers function
	var counter = setInterval(function() {
			maxCount = maxCount-1;
			$("#timer").html("You have " + maxCount + " seconds left.");
			if (maxCount === 0) {
				clearInterval(counter);
				checkAnwers();
			}
		}, seconds)
	counter;

	//setting correct answers object
	var answers = {
		"one" : "a",
		"two" : "c",
		"three" : "b",
		"four" : "d",
		"five" : "a",
		"six" : "b",
		"seven" : "a",
		"eight" : "c",
		"9" : "c",
		"10" : "a",
		"11" : "d",
		"12" : "b",
		"13" : "a",
		"14" : "b",
		"15" : "d",
		"16" : "c",
		"17" : "a",
		"18" : "d"
	}


	//function for marking losses and passing them to a function for redirecting to a results page
	function markIncorrect(el){
		losses += el.length;
		pass(losses,wins);
	}

	//function for marking wins and passing them to a function for redirecting to a results page
	function markCorrect(el){
		wins += el.length;
		pass(losses,wins);
	}

	//function that utilizes HTML5 storage and redirecting to a results page
	function pass(losses,wins) {
		localStorage.setItem("lose", losses)
		localStorage.setItem("winner", wins)
		window.location.href = "results.html";
	}

	function checkAnwers(e) {
		$questions = $(".question");
		$questions.each(function(){
			var answer = $(this).find("input:checked"),
			key = answer.attr("name"),
			val = answer.attr("value");

			if(answer.length === 0){
				markIncorrect($(this));
			} else if (answers[key] !== val){
				markIncorrect($(this));
			} else {
				markCorrect(answer.parent());
			}
		});
	};

	$("form").on("submit", function(e){
		clearInterval(counter);
		e.preventDefault();
		$questions = $(".question");
		$questions.each(function(){
			var answer = $(this).find("input:checked"),
			key = answer.attr("name"),
			val = answer.attr("value");
			if(answer.length === 0){
				markIncorrect($(this));
			} else if (answers[key] !== val){
				markIncorrect($(this));
			} else {
				markCorrect(answer.parent());
			}
		});
	});

});