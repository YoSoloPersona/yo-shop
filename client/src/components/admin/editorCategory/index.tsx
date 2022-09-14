// local
import { Main } from './main';
import { TaskFactory } from '../../taskFactory';

/**
 * Компонент для работы с категориями товаров.
 * !Реализован без использования Redux.
 * @param props 
 * @returns JSX.Element.
 */
const EditorCategory = TaskFactory({
    ElementData: Main
});

export default EditorCategory;
