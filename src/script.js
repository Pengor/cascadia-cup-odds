function calcOdds() {

	var t1 = document.getElementById('t1');
	var t2 = document.getElementById('t2');
	var t3 = document.getElementById('t3');
	var t4 = document.getElementById('t4');

	var matches = [];

	// Parse match data from CSV file
	Papa.parse("https://projects.fivethirtyeight.com/soccer-api/club/spi_matches.csv", {
		download: true,
		header: true,
		complete: function(results) {
			for (const x of results.data) {
				if (x.season === "2023") {
					if (
					(x.team1 == "Vancouver Whitecaps" || x.team1 == "Seattle Sounders FC" || x.team1 == "Portland Timbers") 
					&&
					(x.team2 == "Vancouver Whitecaps" || x.team2 == "Seattle Sounders FC" || x.team2 == "Portland Timbers") 
					) {
						console.log(x);
						matches.push(x);
					}
				}
			}

			// Calculate Odds
			var scenarioNum = 1;
        	
			var van_odds = 0;
			var sea_odds = 0;
			var por_odds = 0;
			var tie_odds = 0;
			var scenario_odds;
	
			var outcomes = ["home", "tie", "away"];

			for (var a of outcomes) {
				for (var b of outcomes) {
					for (var c of outcomes) {
						for (var d of outcomes) {
							for (var e of outcomes) {
								for (var f of outcomes) {
									for (var g of outcomes) {
										for (var h of outcomes) {
											for (var i of outcomes) {

												var van_pts = 0;
												var sea_pts = 0;
												var por_pts = 0;

												van_pts += homePoints(a);
												por_pts += awayPoints(a);
												por_pts += homePoints(b);
												sea_pts += awayPoints(b);
												por_pts += homePoints(c);
												van_pts += awayPoints(c);
												van_pts += homePoints(d);
												sea_pts += awayPoints(d);
												sea_pts += homePoints(e);
												por_pts += awayPoints(e);
												van_pts += homePoints(f);
												sea_pts += awayPoints(f);
												por_pts += homePoints(g);
												van_pts += awayPoints(g);
												sea_pts += homePoints(h);
												por_pts += awayPoints(h);
												sea_pts += homePoints(i);
												van_pts += awayPoints(i);

												console.log(van_pts);
												console.log(sea_pts);
												console.log(por_pts);

												scenario_odds  = getOdds(matches[0], a);
												scenario_odds *= getOdds(matches[1], b);
												scenario_odds *= getOdds(matches[2], c);
												scenario_odds *= getOdds(matches[3], d);
												scenario_odds *= getOdds(matches[4], e);
												scenario_odds *= getOdds(matches[5], f);
												scenario_odds *= getOdds(matches[5], g);
												scenario_odds *= getOdds(matches[5], h);
												scenario_odds *= getOdds(matches[5], i);

												if (van_pts > sea_pts && van_pts > por_pts)
													van_odds += scenario_odds * 100;
												else if (sea_pts > van_pts && sea_pts > por_pts)
													sea_odds += scenario_odds * 100;
												else if (por_pts > van_pts && por_pts > sea_pts)
													por_odds += scenario_odds * 100;
												else
													tie_odds += scenario_odds * 100;
											}
										}
									}
								}
							}
						}
					}
				}
			}

			// Display Results
			t1.innerHTML = 'Vancouver:   ' + van_odds.toFixed(2).toString().padStart(5) + '%';
			t2.innerHTML = 'Seattle:     ' + sea_odds.toFixed(2).toString().padStart(5) + '%';
			t3.innerHTML = 'Portland:    ' + por_odds.toFixed(2).toString().padStart(5) + '%';
			t4.innerHTML = 'Tiebreakers: ' + tie_odds.toFixed(2).toString().padStart(5) + '%';
            
		}
	});
}

function homePoints(who_won) {
	switch (who_won) {
		case "home":
			return 3;
		case "tie":
			return 1;
		case "away":
			return 0;
	}
}

function awayPoints(who_won) {
	switch (who_won) {
		case "home":
			return 0;
		case "tie":
			return 1;
		case "away":
			return 3;
	}
}

function getOdds(game, home_tie_away) {
	// Handle games already played
	if (game.score1 && game.score2) {
		var completed_prob1   = 0;
		var completed_probtie = 0;
		var completed_prob2   = 0;

		if (game.score1 > game.score2)
			completed_prob1 = 1;
		else if (game.score1 < game.score2)
			completed_prob2 = 1;
		else
			completed_probtie = 1;

		switch (home_tie_away) {
			case "home":
				return completed_prob1;
			case "tie":
				return completed_probtie;
			case "away":
				return completed_prob2;
		}
	}

	// Handle future games
	switch (home_tie_away) {
		case "home":
			return game.prob1;
		case "tie":
			return game.probtie;
		case "away":
			return game.prob2;
	}
}
