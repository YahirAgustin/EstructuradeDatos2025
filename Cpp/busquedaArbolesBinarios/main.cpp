#include "ArbolBinarioBusqueda.h"
#include <sstream>

using namespace std;


void mostrarAyuda() {
    cout << "\n--- Comandos Disponibles ---" << endl;
    cout << "**insertar <numero>** - Inserta un numero en el arbol." << endl;
    cout << "**buscar <numero>** - Busca un número y muestra la ruta." << endl;
    cout << "**eliminar <numero>** - Elimina un numero del arbol." << endl;
    cout << "**inorden** - Muestra el recorrido Inorden (orden ascendente)." << endl;
    cout << "**preorden** - Muestra el recorrido Preorden." << endl;
    cout << "**postorden** - Muestra el recorrido Postorden." << endl;
    cout << "**altura** - Muestra la altura del arbol." << endl;
    cout << "**tamano** - Muestra el numero total de nodos." << endl;
    cout << "**exportar <archivo>** - Guarda el recorrido Inorden a un archivo de texto." << endl;
    cout << "**ayuda** - Muestra este menu de ayuda." << endl;
    cout << "**salir** - Sale de la aplicación." << endl;
    cout << "---------------------------\n" << endl;
}

int main() {
    ArbolBinarioBusqueda arbol;
    string linea;

    cout << "Gestor de Numeros con Arbol Binario de Busqueda (BST)." << endl;
    cout << "Escriba 'ayuda' para ver los comandos." << endl;
    cout << "---------------------------------------------------------" << endl;

    while (true) {
        cout << "BST> ";

        if (!getline(cin, linea) || linea == "salir") {
            break;
        }

        stringstream ss(linea);
        string comando;
        ss >> comando;

        int numero;
        string nombreArchivo;
        string ruta;


        if (comando == "insertar") {
            if (ss >> numero) {
                arbol.insertar(numero);
                cout << "Numero " << numero << " insertado." << endl;
            } else {
                cout << "Uso: insertar <numero>" << endl;
            }
        } else if (comando == "buscar") {
            if (ss >> numero) {
                Nodo* resultado = arbol.buscar(numero, ruta);
                if (resultado) {
                    cout << "Numero " << numero << " **ENCONTRADO**." << endl;
                    cout << "Ruta de busqueda: " << ruta << endl;
                } else {
                    cout << "Numero " << numero << " **NO ENCONTRADO**." << endl;
                }
            } else {
                cout << "Uso: buscar <numero>" << endl;
            }
        } else if (comando == "eliminar") {
            if (ss >> numero) {

                cout << "Altura antes de eliminar: " << arbol.altura() << endl;
                arbol.eliminar(numero);
                cout << "Altura después de eliminar: " << arbol.altura() << endl;
                arbol.inorden();
            } else {
                cout << "Uso: eliminar <numero>" << endl;
            }
        } else if (comando == "inorden") {
            arbol.inorden();
        } else if (comando == "preorden") {
            arbol.preorden();
        } else if (comando == "postorden") {
            arbol.postorden();
        } else if (comando == "altura") {
            cout << "Altura del arbol: " << arbol.altura() << endl;
        } else if (comando == "tamano") {
            cout << "Numero de nodos: " << arbol.tamano() << endl;
        } else if (comando == "exportar") {
            if (ss >> nombreArchivo) {
                if (arbol.exportarInorden(nombreArchivo)) {
                    cout << "Recorrido inorden exportado exitosamente a: " << nombreArchivo << endl;
                }
            } else {
                cout << "Uso: exportar <nombre_archivo>" << endl;
            }
        } else if (comando == "ayuda") {
            mostrarAyuda();
        } else if (comando == "salir") {
            break;
        } else if (!comando.empty()) {
            cout << "Comando desconocido: " << comando << ". Escriba 'ayuda'." << endl;
        }
    }

    cout << "\n¡Saliendo del gestor de nu1meros!" << endl;
    return 0;
}
