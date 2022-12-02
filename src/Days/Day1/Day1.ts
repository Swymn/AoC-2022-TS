import { IDay } from "../IDay";
import { FileHandler } from "../../Utils/FileHandler";

export class Day1 implements IDay {

    getSumCalories() {
        const calories: number[] = [];
        let sum = 0;
        for (const input of new FileHandler("Day1/data.txt").getInputs()) {
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