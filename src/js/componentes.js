import { Todo } from '../classes' //  importa Todo
import { todoList } from '../index'; // importa TodoList

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
// Constante para traer el elemento de la clase filters del UL
const ulFiltros = document.querySelector('.filters');
// Constante para traer los elementos con la clase filtro
const anchorFiltros = document.querySelectorAll('.filtro')

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div')
    div.innerHTML = htmlTodo

    divTodoList.append( div.firstElementChild )

    return div.firstElementChild
}

// Eventos - Totalmente nuevo
txtInput.addEventListener('keyup', (event) => {
    
    if( event.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo( txtInput.value )
        todoList.nuevoTodo( nuevoTodo )
        crearTodoHtml( nuevoTodo )
        txtInput.value = ''
    }

})

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName
    const todoElemento = event.target.parentElement.parentElement
    const todoId = todoElemento.getAttribute('data-id')

    if( nombreElemento.includes('input') ){

        todoList.marcarCompletado( todoId )
        todoElemento.classList.toggle('completed')

    } else if( nombreElemento.includes('button') ) {
        
        todoList.eliminarTodo( todoId )
        divTodoList.removeChild( todoElemento )
    } 

})

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    
    for( let i = divTodoList.children.length-1; i>=0; i-- ){

        const elemento = divTodoList.children[i]
        
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento)
        }
    }

});

ulFiltros.addEventListener('click', (event) => {

    // constante para recoger el texto del elemento sobre el cual se hace click
    const filtro = event.target.text;
    // Condicional para verificar si alguien toca algo que no es un texto
    // Si alguien toca algo que no es texto retornará undefined y no hará nada
    if( !filtro ){ return }

    // Recorre el arreglo de clases filtro y les remueve la clase selected
    anchorFiltros.forEach( e => e.classList.remove('selected'))
    // Agrega la clase filtro al elemento al cual se le dió click
    event.target.classList.add('filtro')

    // Ciclo for el cual va recorrer todos los elementos dentro de la clase filters
    // osea: todos, completados y pendientes
    for( const elemento of divTodoList.children ){

        // primero elimina la clase hidden de todos los elementos
        elemento.classList.remove('hidden')

        // constante de true o false si contiene la clase completed
        const completado = elemento.classList.contains('completed')
        
        // switch para ocultar y desocultar según el boton
        switch(filtro) {
            case 'Pendientes':
                // Si tiene la clase completados (true)
                if( completado ){
                    // oculta los elementos completados
                    elemento.classList.add('hidden')
                }
            break

            case 'Completados':
                // Si no tiene la clase completados (false) 
                if( !completado ){
                    // oculta los elementos pendientes
                    elemento.classList.add('hidden')
                }
            break
        }


    }


})









