export default class NotFoundException extends Error {
    private statusCode: number;

    constructor(message = 'Not found') {
        super(message);
        this.name = 'NotFoundException';
        this.statusCode = 404;
    }
}