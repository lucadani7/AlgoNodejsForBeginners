export class StackException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "StackException";
    }
}