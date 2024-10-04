// Inicializamos la lista de tareas desde el localStorage o una lista vacía si no hay tareas guardadas
const todos = JSON.parse(localStorage.getItem('todos')) || [];

// Función principal para renderizar la lista de tareas en la página
const render = () => {
    const todoList = document.getElementById('todo-list');
    
    // Creamos el HTML de la lista de tareas, cada tarea dentro de un <li> con un <span> para el texto
    const todosTemplate = todos.map((todo, i) => `
        <li>
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <button onclick="deleteTodo(${i})">Eliminar</button>
        </li>`);

    // Insertamos la lista de tareas en el elemento <ul> del DOM
    todoList.innerHTML = todosTemplate.join('');

    // Añadimos eventos a cada tarea para marcarla como completada al hacer clic en el <span>
    const elementos = document.querySelectorAll('#todo-list li span');
    elementos.forEach((elemento, i) => {
        elemento.addEventListener('click', () => {
            // Cambiamos el estado de completado (true o false) de la tarea al hacer clic
            todos[i].completed = !todos[i].completed;  
            // Actualizamos el localStorage y volvemos a renderizar
            actualizaTodos(todos);
        });
    });
};

// Función para eliminar una tarea según su índice en la lista
const deleteTodo = (i) => {
    // Eliminamos la tarea de la lista de tareas en la posición indicada
    todos.splice(i, 1);
    // Actualizamos el localStorage y renderizamos la lista nuevamente
    actualizaTodos(todos);
};

// Función para actualizar el localStorage con la lista actualizada de tareas
const actualizaTodos = (todos) => {
    // Convertimos la lista de tareas a un string en formato JSON y lo guardamos en localStorage
    const todoStrings = JSON.stringify(todos);
    localStorage.setItem('todos', todoStrings);
    // Renderizamos la lista actualizada en la página
    render();
};

// Función que se ejecuta cuando la página termina de cargar
window.onload = () => {
    // Capturamos el formulario de agregar tarea
    const form = document.getElementById('todo-form');
    
    // Manejador del evento 'submit' del formulario, se ejecuta al enviar el formulario
    form.onsubmit = (e) => {
        e.preventDefault();  // Prevenimos que la página se recargue al enviar el formulario

        // Capturamos el input de texto donde el usuario escribe la tarea
        const todo = document.getElementById('todo');
        const todoText = todo.value;  // Guardamos el valor del input (el texto de la tarea)
        
        // Verificamos que el input no esté vacío o compuesto solo por espacios
        if (todoText.trim() === '') {
            return;  // Si está vacío, salimos de la función y no agregamos nada
        }

        todo.value = '';  // Limpiamos el campo de entrada para que quede vacío
        // Agregamos la nueva tarea a la lista de tareas con un estado inicial de no completada (completed: false)
        todos.push({ text: todoText, completed: false });
        
        // Actualizamos la lista de tareas en localStorage y renderizamos la nueva lista
        actualizaTodos(todos);
    };

    // Renderizamos la lista de tareas al cargar la página para mostrar las tareas guardadas previamente
    render();
};
