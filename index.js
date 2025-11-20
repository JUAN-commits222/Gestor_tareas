import { tareas } from './data.js';
import { add, toggle, remove, filterBy } from './funciones.js';
import readline from 'readline';

let estado = tareas;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarTabla(lista) {
  console.log('\n📋 Tareas actuales:');
  console.table(lista.map(t => ({
    ID: t.id,
    Título: t.titulo,
    Hecho: t.hecho
  })));
}

function menu() {
  mostrarTabla(estado);
  rl.question('\n¿Qué quieres hacer? (add | toggle | remove | filter | exit): ', opcion => {
    switch (opcion.trim()) {
      case 'add':
        rl.question('ID de la nueva tarea: ', id => {
          rl.question('Título de la nueva tarea: ', titulo => {
            estado = add(estado, id, titulo);
            menu();
          });
        });
        break;
      case 'toggle':
        rl.question('ID de la tarea a alternar: ', id => {
          estado = toggle(estado, id);
          menu();
        });
        break;
      case 'remove':
        rl.question('ID de la tarea a eliminar: ', id => {
          estado = remove(estado, id);
          menu();
        });
        break;
      case 'filter':
        rl.question('Estado a filtrar (todo | done): ', estadoFiltro => {
          const filtradas = filterBy(estado, estadoFiltro);
          mostrarTabla(filtradas);
          menu();
        });
        break;
      case 'exit':
        rl.close();
        break;
      default:
        console.log('❌ Opción no válida.');
        menu();
    }
  });
}

menu();
