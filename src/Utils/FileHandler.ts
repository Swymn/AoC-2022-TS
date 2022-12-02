import { readFileSync } from "fs";
import { join } from "path";

export class FileHandler {
    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    /**
     * Get the inputs from the file (BASE DIR: src/Days/)
     * 
     * @returns {string[]} - Inputs from the file
     */
    public getInputs(): string[] {
        const path = process.env.PWD;
        if (path === undefined) return [];

        const datas: string = readFileSync(join(path, "src/Days/", this.filename), "utf8");
        return datas.split("\n");
    }
}