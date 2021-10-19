export class InvalidArgumentException extends Error {
    name = 'InvalidArgument';

    constructor(message?: string) {
        super();
        this.message = message;
    }
}
