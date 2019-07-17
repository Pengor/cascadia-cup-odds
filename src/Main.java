class Main {
	public static void main(String[] args) {

		Game game1 = new Game("Vancouver", "Seattle",   0.0000, 0.0000);
		Game game2 = new Game("Vancouver", "Portland",  1.0000, 0.0000);
		Game game3 = new Game("Seattle",   "Vancouver", 1.0000, 0.0000);
		Game game4 = new Game("Seattle",   "Portland",  0.5162, 0.2514);
		Game game5 = new Game("Portland",  "Vancouver", 0.6922, 0.1264);
		Game game6 = new Game("Portland",  "Seattle",   0.5204, 0.2480);

		int scenarioNum = 1;
		int vanPoints, seaPoints, porPoints;
		double vanChampPct = 0;
		double seaChampPct = 0;
		double porChampPct = 0;
		double tiebreakPct = 0;
		double scenarioOdds;

		for (int a = 0; a < 3; a++) {
			for (int b = 0; b < 3; b++) {
				for (int c = 0; c < 3; c++) {
					for (int d = 0; d < 3; d++) {
						for (int e = 0; e < 3; e++) {
							for (int f = 0; f < 3; f++) {
								vanPoints  = game1.homePoints(a);
								seaPoints  = game1.awayPoints(a);
								vanPoints += game2.homePoints(b);
								porPoints  = game2.awayPoints(b);
								seaPoints += game3.homePoints(c);
								vanPoints += game3.awayPoints(c);
								seaPoints += game4.homePoints(d);
								porPoints += game4.awayPoints(d);
								porPoints += game5.homePoints(e);
								vanPoints += game5.awayPoints(e);
								porPoints += game6.homePoints(f);
								seaPoints += game6.awayPoints(f);

								scenarioOdds  = game1.getOdds(a);
								scenarioOdds *= game2.getOdds(b);
								scenarioOdds *= game3.getOdds(c);
								scenarioOdds *= game4.getOdds(d);
								scenarioOdds *= game5.getOdds(e);
								scenarioOdds *= game6.getOdds(f);
								//System.out.println(scenarioOdds);

								if (vanPoints > seaPoints && vanPoints > porPoints)
									vanChampPct += scenarioOdds * 100;
								else if (seaPoints > vanPoints && seaPoints > porPoints)
									seaChampPct += scenarioOdds * 100;
								else if (porPoints > vanPoints && porPoints > seaPoints )
									porChampPct += scenarioOdds * 100;
								else
									tiebreakPct += scenarioOdds * 100;

								//System.out.println("Scenario " + scenarioNum++ + ":");
								//System.out.println("\tVAN: " + vanPoints 
								//				   + " SEA: " + seaPoints 
								//				   + " POR: " + porPoints);
							}
						}
					}
				}
			}
		}
		System.out.println("Overall Title Odds:");
		System.out.printf("VAN:  %6.2f%%\nSEA:  %6.2f%%\nPOR:  %6.2f%%\nTied: %6.2f%%", 
				vanChampPct, seaChampPct, porChampPct, tiebreakPct);
	}
}
