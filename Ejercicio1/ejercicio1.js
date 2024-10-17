var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Clase base abstracta que implementa la interfaz Task, clase base Tarea (abstracción), usando polimorfismo
var AsyncTask = /** @class */ (function () {
    function AsyncTask(type, description) {
        this.type = type;
        this.description = description;
    }
    // Método para mostrar la descripción de la tarea
    AsyncTask.prototype.printDescription = function () {
        console.log("Ejecutando ".concat(this.type, ": ").concat(this.description));
    };
    return AsyncTask;
}());
// Clase que representa una Macrotarea (utilizo setTimeout como ejemplo de macrotarea)
var MacroTask = /** @class */ (function (_super) {
    __extends(MacroTask, _super);
    function MacroTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Implemento el metodo execute
    MacroTask.prototype.execute = function () {
        var _this = this;
        this.printDescription();
        // Simular la ejecucion de una macrotarea con setTimeout
        setTimeout(function () {
            console.log("Macrotarea \"".concat(_this.description, "\" completada"));
        }, 0); // Lo ejecuta después de 0 milisegundos (ojo: parte de la cola de macrotareas)
    };
    return MacroTask;
}(AsyncTask));
/// Clase que representa una Microtarea (utilizo process.nextTick como ejemplo de microtarea)
var MicroTask = /** @class */ (function (_super) {
    __extends(MicroTask, _super);
    function MicroTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Igual, implementamos el metodo execute
    MicroTask.prototype.execute = function () {
        var _this = this;
        this.printDescription();
        // Simular la ejecucion de una microtarea con process.nextTick
        process.nextTick(function () {
            console.log("Microtarea \"".concat(_this.description, "\" completada"));
        }); // Imprimimo la microtarea con su descripcion.
    };
    return MicroTask;
}(AsyncTask));
// Clase que representa una tarea basada en Promesas, las cuales practicamente son microtareas especiales.
var PromiseTask = /** @class */ (function (_super) {
    __extends(PromiseTask, _super);
    function PromiseTask(description) {
        return _super.call(this, 'microtarea', description) || this; // Llamamos al constructor de la clase padre
    }
    // Uso async/await para manejar la tarea como una promesa
    PromiseTask.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.printDescription();
                        // Ejecutamos la promesa y esperamos su resolucion
                        return [4 /*yield*/, new Promise(function (resolve) {
                                console.log("Promesa \"".concat(_this.description, "\" iniciada"));
                                resolve(); // Aqui simulamos la resolucion inmediata de la promesa
                            })];
                    case 1:
                        // Ejecutamos la promesa y esperamos su resolucion
                        _a.sent();
                        console.log("Promesa \"".concat(this.description, "\" completada"));
                        return [2 /*return*/];
                }
            });
        });
    };
    return PromiseTask;
}(AsyncTask));
// Uso de herencia y polimorfismo para ejecutar diferentes tipos de tareas
// Aqui la funcion que recibe un array de tareas, las ejecuta usando polimorfismo
function ejecutarTareas(tasks) {
    // Itera sobre las tareas y llama al metodo execute
    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
        var task = tasks_1[_i];
        task.execute(); // Polimorfismo: porque se llama a execute sin saber que tipo de tarea es
    }
}
// Fase 1: Macrotarea (setTimeout)
// Fase 2: Microtarea (process.nextTick)
// Fase 3: Promesas (microtarea especial)
// Las tareas se dividen entre macrotareas y microtareas para demostrar como el Event Loop las maneja
var tareas = [
    new MacroTask('macrotarea', 'Tarea con setTimeout'),
    new MicroTask('microtarea', 'Tarea con process.nextTick'),
    new PromiseTask('Promesa en microtarea')
];
// Ejecutar las tareas en el Event Loop
ejecutarTareas(tareas);
// Esta es otra macrotarea que se ejecuta despues de todas las microtareas. (setImmediate)
setImmediate(function () {
    console.log('Macrotarea con setImmediate completada');
});
