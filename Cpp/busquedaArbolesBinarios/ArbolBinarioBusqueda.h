#ifndef ARBOLBINARIOBUSQUEDA_H
#define ARBOLBINARIOBUSQUEDA_H

#include <iostream>
#include <fstream>
#include <string>
#include <vector>


using namespace std;


struct Nodo {
    int clave;
    Nodo *izquierda;
    Nodo *derecha;


    Nodo(int val) : clave(val), izquierda(nullptr), derecha(nullptr) {}
};

class ArbolBinarioBusqueda {
private:
    Nodo* raiz;
    int contadorNodos;




    Nodo* insertarRecursivo(Nodo* nodo, int clave);


    Nodo* buscarRecursivo(Nodo* nodo, int clave, string& ruta);


    Nodo* eliminarRecursivo(Nodo* nodo, int clave);
    Nodo* encontrarMinimo(Nodo* nodo);


    void inordenRecursivo(Nodo* nodo, ostream& os);
    void preordenRecursivo(Nodo* nodo);
    void postordenRecursivo(Nodo* nodo);


    int calcularAlturaRecursivo(Nodo* nodo);
    void destruirRecursivo(Nodo* nodo);

public:

    ArbolBinarioBusqueda() : raiz(nullptr), contadorNodos(0) {}
    ~ArbolBinarioBusqueda();


    void insertar(int clave);
    Nodo* buscar(int clave, string& ruta);
    void eliminar(int clave);

    void inorden();
    void preorden();
    void postorden();
    int altura();
    int tamano();


    bool exportarInorden(const string& nombreArchivo);
};

void ArbolBinarioBusqueda::destruirRecursivo(Nodo* nodo) {
    if (nodo) {
        destruirRecursivo(nodo->izquierda);
        destruirRecursivo(nodo->derecha);
        delete nodo;
    }
}


ArbolBinarioBusqueda::~ArbolBinarioBusqueda() {
    destruirRecursivo(raiz);
}


Nodo* ArbolBinarioBusqueda::encontrarMinimo(Nodo* nodo) {
    Nodo* actual = nodo;
    while (actual && actual->izquierda != nullptr) {
        actual = actual->izquierda;
    }
    return actual;
}


Nodo* ArbolBinarioBusqueda::insertarRecursivo(Nodo* nodo, int clave) {

    if (nodo == nullptr) {
        contadorNodos++;
        return new Nodo(clave);
    }


    if (clave < nodo->clave) {
        nodo->izquierda = insertarRecursivo(nodo->izquierda, clave);
    }

    else if (clave > nodo->clave) {
        nodo->derecha = insertarRecursivo(nodo->derecha, clave);
    }


    return nodo;
}


Nodo* ArbolBinarioBusqueda::buscarRecursivo(Nodo* nodo, int clave, string& ruta) {
    if (nodo == nullptr) {
        return nullptr;
    }


    ruta += to_string(nodo->clave) + " -> ";

    if (clave == nodo->clave) {
        return nodo;
    } else if (clave < nodo->clave) {
        return buscarRecursivo(nodo->izquierda, clave, ruta);
    } else {
        return buscarRecursivo(nodo->derecha, clave, ruta);
    }
}


Nodo* ArbolBinarioBusqueda::eliminarRecursivo(Nodo* nodo, int clave) {
    if (nodo == nullptr) {
        return nullptr;
    }


    if (clave < nodo->clave) {
        nodo->izquierda = eliminarRecursivo(nodo->izquierda, clave);
    } else if (clave > nodo->clave) {
        nodo->derecha = eliminarRecursivo(nodo->derecha, clave);
    }

    else {


        if (nodo->izquierda == nullptr) {
            Nodo* temporal = nodo->derecha;
            delete nodo;
            contadorNodos--;
            return temporal;
        } else if (nodo->derecha == nullptr) {
            Nodo* temporal = nodo->izquierda;
            delete nodo;
            contadorNodos--;
            return temporal;
        }


        Nodo* sucesor = encontrarMinimo(nodo->derecha);


        nodo->clave = sucesor->clave;


        nodo->derecha = eliminarRecursivo(nodo->derecha, sucesor->clave);
    }
    return nodo;
}

void ArbolBinarioBusqueda::inordenRecursivo(Nodo* nodo, ostream& os) {
    if (nodo) {
        inordenRecursivo(nodo->izquierda, os);
        os << nodo->clave << " ";
        inordenRecursivo(nodo->derecha, os);
    }
}


void ArbolBinarioBusqueda::preordenRecursivo(Nodo* nodo) {
    if (nodo) {
        cout << nodo->clave << " ";
        preordenRecursivo(nodo->izquierda);
        preordenRecursivo(nodo->derecha);
    }
}


void ArbolBinarioBusqueda::postordenRecursivo(Nodo* nodo) {
    if (nodo) {
        postordenRecursivo(nodo->izquierda);
        postordenRecursivo(nodo->derecha);
        cout << nodo->clave << " ";
    }
}

int ArbolBinarioBusqueda::calcularAlturaRecursivo(Nodo* nodo) {
    if (nodo == nullptr) {
        return -1;
    }

    return 1 + max(calcularAlturaRecursivo(nodo->izquierda), calcularAlturaRecursivo(nodo->derecha));
}



void ArbolBinarioBusqueda::insertar(int clave) {
    raiz = insertarRecursivo(raiz, clave);
}

Nodo* ArbolBinarioBusqueda::buscar(int clave, string& ruta) {
    ruta.clear();
    return buscarRecursivo(raiz, clave, ruta);
}

void ArbolBinarioBusqueda::eliminar(int clave) {
    int conteoInicial = contadorNodos;
    raiz = eliminarRecursivo(raiz, clave);
    if (conteoInicial == contadorNodos) {
        cout << "Clave " << clave << " no encontrada para eliminar." << endl;
    } else {
        cout << "Clave " << clave << " eliminada exitosamente." << endl;
    }
}

void ArbolBinarioBusqueda::inorden() {
    cout << "Recorrido Inorden: ";
    inordenRecursivo(raiz, cout);
    cout << endl;
}

void ArbolBinarioBusqueda::preorden() {
    cout << "Recorrido Preorden: ";
    preordenRecursivo(raiz);
    cout << endl;
}

void ArbolBinarioBusqueda::postorden() {
    cout << "Recorrido Postorden: ";
    postordenRecursivo(raiz);
    cout << endl;
}

int ArbolBinarioBusqueda::altura() {
    return calcularAlturaRecursivo(raiz);
}

int ArbolBinarioBusqueda::tamano() {
    return contadorNodos;
}

bool ArbolBinarioBusqueda::exportarInorden(const string& nombreArchivo) {
    ofstream archivoSalida(nombreArchivo);
    if (!archivoSalida.is_open()) {
        cerr << "Error: No se pudo abrir el archivo " << nombreArchivo << " para escribir." << endl;
        return false;
    }

    inordenRecursivo(raiz, archivoSalida);
    archivoSalida.close();
    return true;
}



#endif // ARBOLBINARIOBUSQUEDA_H_INCLUDED
