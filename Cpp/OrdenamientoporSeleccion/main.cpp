#include <iostream>
#include <cstdlib>
#include<ctime>
using namespace std;

int main()
{
    srand(time(0));

    int arreglo[10];
    int minimo;
    int aux= 0;
    int posmin;

    for(int i =0; i<10; i++)
    {
        arreglo[i] = rand() %101;
    }

    cout<<"Arreglo antes de Ordenar: "<<endl;

    for (int i= 0; i<10; i++)
    {
        cout<<arreglo[i]<<" ";
    }
    cout<<endl;


    for(int i= 0; i<10; i++)
    {
        minimo = arreglo [i];
        posmin = i;

        for(int j=i+1; j<10; j++)
        {
            if(arreglo[j]<minimo )
            {
                minimo = arreglo[j];
                posmin = j;
            }
        }
        aux = arreglo[i];
        arreglo[i] = arreglo[posmin];
        arreglo[posmin] = aux;



    }

    cout<<"Arreglo Ordenado: "<<endl;

    for (int i= 0; i<10; i++)
    {
        cout<<arreglo[i]<<" ";
    }






    return 0;
}
