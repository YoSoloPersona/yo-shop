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
     * Не удалось обработать запрос, так как он представлен в неправильном формате или является некорректным.
     * @param message описание ошибки.
     * @returns ErrorApi.
     */
    static badRequest(message: string) {
        return new ErrorApi(400, message);
    }

    /**
     * Необходимые данные для проверки подлинности отсутствуют или не являются допустимыми для ресурса.
     * @param message описание ошибки.
     * @returns ErrorApi.
     */
    static unauthorized(message: string) {
        return new ErrorApi(401, message);
    }

    /**
     * Отказано в доступе к запрашиваемому ресурсу. Возможно, у пользователя недостаточно разрешений.
     * @param message описание ошибки.
     * @returns ErrorApi.
     */
    static forbidden(message: string) {
        return new ErrorApi(403, message);
    }

    /**
     * Запрашиваемый ресурс не существует.
     * @param message описание ошибки.
     * @returns ErrorApi.
     */
    static notFound(message: string) {
        return new ErrorApi(404, message);
    }

    /**
     * Указанная учетная запись уже существует.
     * @param message описание ошибки.
     * @returns ErrorApi.
     */
    static accountAlreadyExists(message: string) {
        return new ErrorApi(409, message);
    }

    /**
     * При обработке запроса возникла внутренняя ошибка сервера.
     * @param message описание ошибки.
     * @returns ErrorApi.
     */
    static internal(message: string) {
        return new ErrorApi(500, message);
    }

    /**
     * Запрашиваемая функция не реализована.
     * @param message описание ошибки.
     * @returns ErrorApi.
     */
    static notImplemented(message: string) {
        return new ErrorApi(501, message);
    }
}
