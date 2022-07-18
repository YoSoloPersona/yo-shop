/**
 * Описывает ошибки API.
 */
export default class ErrorApi extends Error {

    /**
     * Конструктор ошибок API.
     * @param status код статуса
     * @param message сообщение об ошибке
     */
    constructor(public status: number, public message: string) {
        super();
    }

    /**
     * 
     * @param message 
     * @returns 
     */
    static badRequest(message: string) {
        return new ErrorApi(404, message);
    }

    /**
     * 
     * @param message 
     * @returns 
     */
    static internal(message: string) {
        return new ErrorApi(500, message);
    }

    /**
     * 
     * @param message 
     * @returns 
     */
    static forbiden(message: string) {
        return new ErrorApi(403, message);
    }
}