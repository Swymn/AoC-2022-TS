import { IDay } from "../IDay";
import { FileHandler } from "../../Utils/FileHandler";

export class Day4 implements IDay {
	private inputDatas: string[];

	constructor() {
		this.inputDatas = new FileHandler("Day4/data.txt").getInputs();
	}

	/**
	 * This method is used to get the pairs of the current line.
	 *
	 * @param {string} line - The line to parse.
	 *
	 * @returns {[string, string, string, string]} - The pairs of the line.
	 */
	private getPairs(line: string): [string, string, string, string] {
		const pairs = line.split(",");
		const digits: string[] = [];

		for (let i = 0; i < pairs.length; i++) {
			const pair: string[] = pairs[i].split("-");
			digits.push(pair[0]);
			digits.push(pair[1]);
		}

		return digits as [string, string, string, string];
	}

	/**
	 * This method is used to convert the string array to integer array.
	 *
	 * @param {[string, string, string, string]} digits - The string array to convert.
	 *
	 * @returns {[number, number, number, number]} - The integer array.
	 */
	private convertToInteger(
		digits: [string, string, string, string]
	): [number, number, number, number] {
        
		return [
			parseInt(digits[0]),
			parseInt(digits[1]),
			parseInt(digits[2]),
			parseInt(digits[3]),
		];
	}

	/**
	 * This method is used to check if one of the pair contains the other.
	 *
	 * @param {string} line - The line to check.
	 *
	 * @returns {boolean} - True if one of the pair contains the other, false otherwise.
	 */
	private isContainsAllDigits(line: string): boolean {
        
        const digits: [number, number, number, number] =
        this.convertToInteger(this.getPairs(line));

		if (digits.length !== 4) return false;
        
		return (
			(digits[0] <= digits[2] && digits[1] >= digits[3]) ||
			(digits[1] <= digits[3] && digits[0] >= digits[2])
		);
	}

	/**
	 * This method is used to check if pairs are overlapping.
	 *
	 * @param {string} line - The first line to check.
	 *
	 * @return {boolean} - True if pairs are overlapping, false otherwise.
	 */
	private isOverlapping(line: string): boolean {
        const digits = this.convertToInteger(this.getPairs(line));

        if (digits.length !== 4) {
			return false;
		}

		for (let i = digits[0]; i <= digits[1]; i++) {
			for (let j = digits[2]; j <= digits[3]; j++) {
				if (i === j) {
					return true;
				}
			}
		}

		return false;
	}

	private getResult(): [number, number] {
		let contains: number = 0;
		let overlapping: number = 0;

		for (const line of this.inputDatas) {
			if (this.isContainsAllDigits(line)) {
				contains++;
			}

			if (this.isOverlapping(line)) {
				overlapping++;
			}
		}

		return [contains, overlapping];
	}

	public run(): void {
		const result: [number, number] = this.getResult();
		console.log("Total contains: " + result[0]);
		console.log("Total overlappng: " + result[1]);
	}
}
