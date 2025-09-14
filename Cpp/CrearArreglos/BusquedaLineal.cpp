//Busqueda Elemento
#include <iostream>

using namespace std;

int main()
{
    int Array[5];
    int encontrado,posicion;
    Array[0] = 2;
    Array[1] = 4;
    Array[2] = 6;
    Array[3] = 8;
    Array[4] = 10;

    int Buscar = 6;

    for (int i = 0; i<5; i++)
    {
        if (Array[i] == Buscar )
        {
            encontrado = 1;
            posicion = i;
        }
    }

    if (encontrado == 1)
    {
        cout<<"El elemento se encontro en la posicion : "<<posicion;
    }else {
        cout<<"Elemento no encontrado";
    }


    return 0;
}
