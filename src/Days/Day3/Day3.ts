import { IDay } from "../IDay";
import { FileHandler } from '../../Utils/FileHandler';

export class Day3 implements IDay {

    private inputDatas: string[];

    constructor() {
        this.inputDatas = new FileHandler("Day3/data.txt").getInputs();
    }

    /**
     * Cut the string in two
     * 
     * @param {string} input - String to cut
     * 
     * @returns {[string, string]} - Array of two string
     */
    private cutString(input: string): [string, string] {
        const MID: number = input.length / 2;
        return [input.substring(0, MID), input.substring(MID)];
    }

    /**
     * Find the letter in both string
     * 
     * @param {string} input - String to cut
     * 
     * @returns {string} - Letter in both string
     */
    private findLetterInBothString(input: string): string {
        let result: string = '';
        const [first, second] = this.cutString(input);
        for (let i = 0; i < first.length; i++) {
            if (second.indexOf(first.charAt(i)) !== -1) {
                result += first.charAt(i);
                break;
            }
        }
        return result;
    }

    /**
     * Find the letter in all string
     * 
     * @param {[string, string, string]} str - String to cut
     */
    private findLetterInGroups(str: [string, string, string]): string {
        let result: string = '';
        
        for (let i = 0; i < str[0].length; i++) {
            for (let j = 0; j < str[1].length; j++) {
				if (str[0].charAt(i) === str[1].charAt(j)) {
                    if (str[2].indexOf(str[0].charAt(i)) !== -1) {
                        result = str[0].charAt(i);                        
                        break;
                    }
				}
			}
        }
        return result;
    }

    /**
     * Get the value of the letter
     * 
     * @param {string} letter - Letter to get the value
     * 
     * @returns {number} - Value of the letter
     */
    private valueOfLetter(letter: string): number { 
        if (letter.toUpperCase() === letter)
            return letter.charCodeAt(0) - 38;
        return letter.charCodeAt(0) - 96;
    }

    /**
     * Sum of the value of the letter
     * 
     * @returns {number} - Sum of the value of the letter
     */
    private sumOfLetters(): number {
        let result: number = 0;
        for (let i = 0; i < this.inputDatas.length; i++) {
            result += this.valueOfLetter(this.findLetterInBothString(this.inputDatas[i]));
        }
        return result;
    }

    /**
     * Sum of the value of the letter in groups
     * 
     * @returns {number} - Sum of the value of the letter in groups
     */
    private sumOfGroups(): number {
        let result: number = 0;
        for (let i = 0; i < this.inputDatas.length; i+=3) {
            const str: [string, string, string] = [this.inputDatas[i], this.inputDatas[i + 1], this.inputDatas[i + 2]];
            result += this.valueOfLetter(this.findLetterInGroups(str));  
        }
        return result;
    }        

    run(): void {
        console.log("Day 3 - Part 1: ", this.sumOfLetters());
        console.log("Day 3 - Part 2: ", this.sumOfGroups());
    }
}