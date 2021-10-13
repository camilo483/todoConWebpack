import './styles.css';
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList(); // Se exporta el todoList para ser usado en componentes

todoList.todos.forEach( todo => crearTodoHtml( todo ) )
// Cuando dentro del forEach o cualquier método similar se realiza la ejecución
// dentro del metodo y la función utiliza el mismo elemento del arreglo para 
// ejecutar la función (todo = elemento) (crearTodoHtml(todo) = función con mismo elemento)
// Entonces se puede abreviar de la siguiente forma
/*
    todoList.todos.forEach( crearTodoHtml )
*/

