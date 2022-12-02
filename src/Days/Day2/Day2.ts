import { FileHandler } from '../../Utils/FileHandler';
import { IDay } from '../IDay';

export class Day2 implements IDay {
	private LOSE: number = 0;
	private DRAW: number = 3;
	private WIN: number = 6;

	private ROCK: number = 1;
	private PAPER: number = 2;
	private SCISSORS: number = 3;

    /**
     * Get the score of the fight
     * 
     * @param {string} p1 - Player 1
     * @param {string} p2 - Player 2
     * 
     * @returns {number} - Score of the fight
     */
	private fight(p1: string, p2: string): number {
		switch (p2) {
			case "X":
				switch (p1) {
					case "A":
						return this.DRAW + this.ROCK;
					case "B":
						return this.LOSE + this.ROCK;
					case "C":
						return this.WIN + this.ROCK;
				}
			case "Y":
				switch (p1) {
					case "A":
						return this.WIN + this.PAPER;
					case "B":
						return this.DRAW + this.PAPER;
					case "C":
						return this.LOSE + this.PAPER;
				}
			case "Z":
				switch (p1) {
					case "A":
						return this.LOSE + this.SCISSORS;
					case "B":
						return this.WIN + this.SCISSORS;
					case "C":
						return this.DRAW + this.SCISSORS;
				}
			default:
				return 0;
		}
	}

	/**
	 * Get the score of the matches with the trick
	 *
	 * @param {string} p1 - Player 1
	 * @param {string} state - State of the trick
	 *
	 * @returns {number} - Score of the matches with the trick
	 */
	private trickedFight(p1: string, state: string): number {
		switch (state) {
			case "X": {
				switch (p1) {
					case "A":
						return this.LOSE + this.SCISSORS;
					case "B":
						return this.LOSE + this.ROCK;
					case "C":
						return this.LOSE + this.PAPER;
				}
			}
			case "Y": {
				switch (p1) {
					case "A":
						return this.DRAW + this.ROCK;
					case "B":
						return this.DRAW + this.PAPER;
					case "C":
						return this.DRAW + this.SCISSORS;
				}
			}
			case "Z": {
				switch (p1) {
					case "A":
						return this.WIN + this.PAPER;
					case "B":
						return this.WIN + this.SCISSORS;
					case "C":
						return this.WIN + this.ROCK;
				}
			}
			default:
				return 0;
		}
	}

	/**
	 * Get the score of the matches
	 *
	 * @returns {[number, number]} - [score1, score2]
	 */
	private getMatches(): [number, number] {
		let scores: [number, number] = [0, 0];

		for (const fight of new FileHandler("Day2/data.txt").getInputs()) {
			if (fight !== "") {
				const [p1, p2] = fight.split(" ");
				scores[0] += this.fight(p1, p2);
				scores[1] += this.trickedFight(p1, p2);
			}
		}

		return scores;
	}

	run(): void {
		const [score1, score2] = this.getMatches();
		console.log("Day 2 - Part 1: ", score1);
		console.log("Day 2 - Part 2: ", score2);
	}
}