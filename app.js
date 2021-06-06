document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
    e.preventDefault(); // cancela que la pagina se refrezque
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    const task = {
        title: title,
        description: description
    };
    if (localStorage.getItem('tasks') === null) { // si el localstorag esta vacio empeza a agregar nuevas tareas
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))

    } else { // si ya existen valores ahi previamente, actualizo y almaceno
        let tasks = JSON.parse(localStorage.getItem('tasks')); // obtengo las tareas del local storage y las guardo en una variable
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    getTasks();
    document.getElementById('formTask').reset();

}; // guardo las tareas en el local storag a traves de un array de objetos, cada unjeto una tarea

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class="card mb-3">
            <div class= "card-body">
                <p>${title} - ${description} </p>
                <a type="submit" class="btn btn-danger" onclick="deleteTask('${title}')">
                    borrar
                </a>
            </div>
        </div>`;
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title) {
            tasks.splice(i, 1); // quita esa tarea desade nuestro arreglo
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); // actualiza con el elementro borrado
    getTasks();
}

getTasks();