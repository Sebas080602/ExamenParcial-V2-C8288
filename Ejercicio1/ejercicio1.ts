// Creamos un tipo que define si es una microtarea o macrotarea.
type TaskType = 'macrotarea' | 'microtarea';

// Interfaz para describir la estructura general de una tarea asíncrona.
interface Task {
    type: TaskType; // Tipo de tarea
    description: string; // Descripcion de la tarea
    execute(): void; // Metodo que ejecuta la tarea
}

// Clase base abstracta que implementa la interfaz Task, clase base Tarea (abstracción), usando polimorfismo
abstract class AsyncTask implements Task {
    constructor(public type: TaskType, public description: string) {}

    // Método abstracto que será implementado por las subclases
    abstract execute(): void;

    // Método para mostrar la descripción de la tarea
    printDescription(): void {
        console.log(`Ejecutando ${this.type}: ${this.description}`);
    }
}

// Clase que representa una Macrotarea (utilizo setTimeout como ejemplo de macrotarea)
class MacroTask extends AsyncTask {
    // Implemento el metodo execute
    execute(): void {
        this.printDescription();
        // Simular la ejecucion de una macrotarea con setTimeout
        setTimeout(() => {
            console.log(`Macrotarea "${this.description}" completada`);
        }, 0); // Lo ejecuta después de 0 milisegundos (ojo: parte de la cola de macrotareas)
    }
}

/// Clase que representa una Microtarea (utilizo process.nextTick como ejemplo de microtarea)
class MicroTask extends AsyncTask {
    // Igual, implementamos el metodo execute
    execute(): void {
        this.printDescription();
        // Simular la ejecucion de una microtarea con process.nextTick
        process.nextTick(() => {
            console.log(`Microtarea "${this.description}" completada`);
        }); // Imprimimo la microtarea con su descripcion.
    }
}

// Clase que representa una tarea basada en Promesas, las cuales practicamente son microtareas especiales.
class PromiseTask extends AsyncTask {
    constructor(description: string) {
        super('microtarea', description); // Llamamos al constructor de la clase padre
    }

    // Uso async/await para manejar la tarea como una promesa
    async execute(): Promise<void> {
        this.printDescription();
        // Ejecutamos la promesa y esperamos su resolucion
        await new Promise<void>((resolve) => {
            console.log(`Promesa "${this.description}" iniciada`);
            resolve(); // Aqui simulamos la resolucion inmediata de la promesa
        });
        console.log(`Promesa "${this.description}" completada`);
    }
}


// Uso de herencia y polimorfismo para ejecutar diferentes tipos de tareas
// Aqui la funcion que recibe un array de tareas, las ejecuta usando polimorfismo
function ejecutarTareas(tasks: AsyncTask[]) {
    // Itera sobre las tareas y llama al metodo execute
    for (const task of tasks) {
        task.execute(); // Polimorfismo: porque se llama a execute sin saber que tipo de tarea es
    }
}

// Fase 1: Macrotarea (setTimeout)
// Fase 2: Microtarea (process.nextTick)
// Fase 3: Promesas (microtarea especial)
// Las tareas se dividen entre macrotareas y microtareas para demostrar como el Event Loop las maneja
const tareas: AsyncTask[] = [
    new MacroTask('macrotarea', 'Tarea con setTimeout'),
    new MicroTask('microtarea', 'Tarea con process.nextTick'),
    new PromiseTask('Promesa en microtarea')
];

// Ejecutar las tareas en el Event Loop
ejecutarTareas(tareas);

// Esta es otra macrotarea que se ejecuta despues de todas las microtareas. (setImmediate)
setImmediate(() => {
    console.log('Macrotarea con setImmediate completada');
});
