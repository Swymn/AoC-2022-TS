export class Instruction {
	private _value: number;
	private _columnFor: number;
	private _columnTo: number;

	constructor(instruction: string) {
        const instructionParts: string[] = instruction.split(" ");
        
        this._value = parseInt(instructionParts[1]);
        this._columnFor = parseInt(instructionParts[3])-1;
        this._columnTo = parseInt(instructionParts[5])-1;
    }

	get value(): number {
		return this._value;
	}

	get columnFor(): number {
		return this._columnFor;
	}

	get columnTo(): number {
		return this._columnTo;
	}
}