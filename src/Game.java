class Game {
	private String HomeTeam;
	private String AwayTeam;
	private double HomeOdds;
	private double AwayOdds;

	public Game(String homeTeam, String awayTeam, double homeOdds, double awayOdds) {
		this.HomeTeam = homeTeam;
		this.AwayTeam = awayTeam;
		this.HomeOdds = homeOdds;
		this.AwayOdds = awayOdds;
	}

	public double getOdds(int index) {
		double rtnVal;
		if (index == 0)
			rtnVal = this.HomeOdds;
		else if (index == 1)
			rtnVal = 1 - this.HomeOdds - this.AwayOdds;
		else
			rtnVal = this.AwayOdds;
		return rtnVal;
	}

	public int homePoints(int index) {
		int rtnVal;
		if (index == 0)
			rtnVal = 3;
		else if (index == 1)
			rtnVal = 1;
		else
			rtnVal = 0;
		return rtnVal;
	}

	public int awayPoints(int index) {
		int rtnVal;
		if (index == 0)
			rtnVal = 0;
		else if (index == 1)
			rtnVal = 1;
		else
			rtnVal = 3;
		return rtnVal;
	}
}
