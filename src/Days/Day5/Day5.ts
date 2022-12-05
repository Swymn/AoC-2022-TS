import { IDay } from '../IDay';
import { FileHandler } from '../../Utils/FileHandler';
import { Instruction } from './Instruction';

export class Day5 implements IDay {

    private _inputDatas: string[];
    private _inputsArray: string[][];

    private _columnCount: number;
    private _rowCount: number;

    constructor() {
        this._inputDatas = new FileHandler("Day5/data.txt").getInputs();
        this._inputsArray = [];

        const column = this.getColumn();
        if (!column) {
            console.error("No column found");
            return;
        }

        this._columnCount = column[0];
        this._rowCount = column[1];

        this.generateTable();
    }

    /**
     * This method is used to get the column count and row count
     * 
     * @returns {[columnCount, rowCount]} or null if no column found
     */
    private getColumn(): [number, number] | null {
        const xy: [number, number] = [0, 0];

        for (let i = 0; i < this._inputDatas.length; i++) {
            const line: string = this._inputDatas[i];
            if (line.match(new RegExp("[0-9]")) && line.trim().length > 0) {
                const col = Number.parseInt(line.charAt(line.length - 2));
                xy[0] = isNaN(col) ? 0 : col;
                xy[1] = i;
                return xy;
            }
        }

        return null;
    }

    /**
     * This method is used to generate the table
     * 
     * @returns {void}
     */
    private generateTable(): void {
        let valueIndex: number = 1;

        for (let i = 0; i < this._columnCount; i++) {
            const arr = [];
            for (let j = 0; j < this._rowCount; j++) {
                const value: string = this._inputDatas[j].toString()[valueIndex];
                if (value.trim() === "") continue;
                arr.push(value);
            }
            this._inputsArray.push(arr.reverse());
            valueIndex += 4;
        }
    }

    /**
     * This method is used to show the stacks (debug).
     * 
     * @returns {void}
     */
    private showStacks(): void {
        console.table(this._inputsArray);
    }

    /**
     * This method is used to get the top item of the stacks.
     * 
     * @returns {string} the top item
     */
    private getTopItem(): string {
        let topItem: string = "";
        for (let i = 0; i < this._inputsArray.length; i++) {
            topItem += this._inputsArray[i][this._inputsArray[i].length - 1];
        }
        return topItem;
    }

    /**
     * This method is used to play the game.
     * 
     * @param {boolean} keepOrder if true, the order of the stack is kept
     * 
     * @returns {void}
     */
    private game(keepOrder: boolean = false): void {
        for (let i = this._rowCount + 2; i < this._inputDatas.length; i++) {
            const instruction: Instruction = new Instruction(this._inputDatas[i]);

            const stackFrom = this._inputsArray[instruction.columnFor];
            const stackTo = this._inputsArray[instruction.columnTo];

            const temp = stackFrom.splice(stackFrom.length - instruction.value);
            
            if (keepOrder) {
                stackTo.push(...temp);
            } else {
                stackTo.push(...temp.reverse());
            }
        }
    }

    public run(): void {
        this.game(true);
        console.log("Top item: " + this.getTopItem());
    }
}