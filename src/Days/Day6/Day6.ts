import { FileHandler } from '../../Utils/FileHandler';
import { IDay } from '../IDay';

export class Day6 implements IDay {

    private _input: string[];

    constructor() {
        this._input = new FileHandler("Day6/data.txt").getInputs();
    }

    private hasAllUniqueCHaracters(input: string): boolean {
        return new Set(input).size === input.length;
    }

    private getLastMarkerIndex(size: number = 4): number {
        const line: string = this._input[0];

        for (let i = 0; i < line.length - (size); i++) {
            const marker: string = line.substring(i, i+size);

            if (this.hasAllUniqueCHaracters(marker)) {
                return i+size;
            }
        }

        return -1;
    }

    public run(): void {

        console.log("Day 6 - Part 1 : ", this.getLastMarkerIndex());
        console.log("Day 6 - Part 2 : ", this.getLastMarkerIndex(14));
    }
}