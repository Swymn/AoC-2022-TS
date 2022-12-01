import { IDay } from "../IDay";
import { readFileSync } from "fs";
import path from "path";

export class Day1 implements IDay {

    getInputs() {
        const datas: string = readFileSync(path.join(__dirname, "data.txt"), "utf8");
        return datas.split("\n");
    }

    getSumCalories() {
        const calories: number[] = [];
        let sum = 0;
        for (const input of this.getInputs()) {
            if (input !== '') {
                if (isNaN(parseInt(input))) {
                    throw new Error("Invalid input");
                }
                sum += parseInt(input);
            } else {
                calories.push(sum);
                sum = 0;
            }
        }

        return calories;
    }

    run(): void {
        const calories = this.getSumCalories();
        const sortedCalories = calories.sort((a, b) => b - a);

        console.log("Day 1 - Part 1: ", sortedCalories[0]);
        console.log(
			"Day 1 - Part 2: ",
			sortedCalories[0] + sortedCalories[1] + sortedCalories[2]
		);
    }
}