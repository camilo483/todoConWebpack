import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        // this.todos = [] En este caso sobra cargar el arreglo vacío puesto que se inicializa vacio desde el "else" del método cargar
        this.cargarLocalStorage()
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage()
    }

    eliminarTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id )
        this.guardarLocalStorage() // se agrega aquí pues cuando se elimine uno por ID, este no deberia quedar en el Localstorage
    }

    marcarCompletado( id ){

        for( const todo of this.todos){
            if(todo.id == id){
                todo.completado = !todo.completado
                this.guardarLocalStorage() // Se agrega aquí por que se hizo una modificación con lo cual deberia quedar guardada dicha modificación
                break
            }
        }

    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado )
        this.guardarLocalStorage() // se agrega aquí por que cuando queden los no completados, estos deberian quedar en el Local storage
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos)); // aqui guardamos todo el arreglo de los todos
        // El JSON.stringify convierte objetos y/o arreglos en archivos json

    }

    cargarLocalStorage(){
        if( localStorage.getItem('todo') ){
            this.todos = JSON.parse(localStorage.getItem('todo'));
        } else {
            this.todos = [];
        }

        this.todos = this.todos.map( obj => Todo.fromJson( obj ) )
        // Forma compacta de la linea:
        /*
        this.todos = this.todos.map( Todo.fromJson )
        */
    }

}