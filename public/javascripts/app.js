var url = "/";
var primus = Primus.connect(url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

primus.on('data', function message(data) {
	// updates scores, fouls & total shots
	if (data.score) {
		var className = data.score[0];
		var score = data.score[1];
		var temp = className.split(" ");
		var target = temp[1] + "--live";
		$("." + target).text(score);
	}

	if (data.team) {
		var className = data.team[0];
		var value = data.team[1];
		var temp = className.split(" ");
		var target = temp[1] + "--live";
		$("." + target).text(value);
	};

	if (data.update) {
		var value = data.update[0];
		$('.updateAfter--live').after("<div></div><div><p>" + value + "</p></div><div></div>");
	};
});

// send data to server

// sends data of the scores, fouls & total shots
$('a').click(function () {
	var dad = $(this).parent();
	var target = dad.find("p");
	var number = parseInt(target.text());
	if ($(this).hasClass("increase")) {
		number++;
	} else if ($(this).hasClass("decrease")) {
		if (number > 0) {
			number--;
		}
	} else {
	};
	target.text(number);
	var className = target.attr("class");
	var numberInString = number.toString();
	var list = [className, numberInString];
	primus.write({score: list});
});

// sends data of the teams
$('.team').keypress(function(e) {
	if (e.keyCode == 13) {
		var className = $(this).attr("class");
		var value = $(this).val();
		var list = [className, value];
		primus.write({team: list});
	};
});

// sends data of the realtime updates
$('.update').keypress(function(e) {
	if (e.keyCode == 13) {
		var value = $(this).val();
		var list = [value];
		$('.updateAfter').after("<div></div><div><p>" + value + "</p></div><div></div>");
		primus.write({update: list});
	}
});