#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main()
{
    srand(time(0));

    int arreglo[10];
    int limite = 10;
    int aux = 0;

    for (int i=0; i<10; i++)
    {
        arreglo[i] = rand() %101;
    }

    cout<<"Arreglo antes de ordenar: "<<endl;

    for (int i= 0 ; i< 10; i++)
    {
        cout<<arreglo[i]<<" ";
    }
    cout<<endl;

    for(int i= 0; i<10; i++)
    {

    for (int j= 1; j<limite;j++)
    {
        if(arreglo[j-1]>arreglo[j])
        {
            aux = arreglo[j-1];
            arreglo[j-1] = arreglo[j];
            arreglo[j] = aux;
        }
    }
    }


    cout<<"Arreglo Ordenado; "<<endl;

    for (int i= 0; i<10;i++)
    {
        cout<<arreglo[i]<<" ";
    }


    return 0;
}
