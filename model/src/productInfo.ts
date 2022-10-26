/** Описание продукта. */
export interface ProductInfo {
    /** Идентификатор в БД. */
    id: number;

    /** Заголовок. */
    title: string;

    /** Описание. */
    description: string;
}