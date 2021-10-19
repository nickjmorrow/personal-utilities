export class NotImplementedException extends Error {
    public name = 'NotImplementedException';

    constructor(message?: string) {
        super();
        this.message = message;
    }
}
