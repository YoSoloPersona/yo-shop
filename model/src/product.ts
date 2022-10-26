/** Продукт. */
export interface Product {
    /** Идентификатор в БД. */
    id?: number;

    /** Наименование. */
    name: string;

    /** Цена. */
    price: string;

    /** Рейтинг. */
    rating: number;

    /** Картинка. */
    img: string;
}
