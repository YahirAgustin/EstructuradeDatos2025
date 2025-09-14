
//Insercion Elementos

#include <iostream>

using namespace std;

int main()
{
    int Array[5];

    Array[0] = 2;
    Array[1] = 4;
    Array[2] = 6;
    Array[3] = 8;
    Array[4] = 10;


    cout<<"Arreglo Antes de Insertar Elemento : "<<endl;
    for (int i = 0; i<5; i++)
    {

        cout<<Array[i]<<" ";
    }
    cout<<endl;

    int Element = 9;
    int Posicion = 3;
    int Aux = 0;

    for (int i=0; i<5; i++)
    {
        if (Posicion == i )
        {
            Aux = Array[i];
            Array[i] = Element;
            Element = Aux;
            Posicion +=1;
        }
    }
    cout<<"Arreglo Despues de Insertar Elemento : "<<endl;
    for (int i = 0; i<5; i++)
    {

        cout<<Array[i]<<" ";
    }


    return 0;
}
