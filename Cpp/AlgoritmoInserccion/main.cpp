#include <iostream>
#include <cstdlib>
#include <ctime>


using namespace std;

int main()
{
    srand(time(0));

    int arreglo[10];
    int aux = 0;

    for (int i=0; i < 10; i++ )
    {
      arreglo[i] = rand() %101;

    }

    cout<<"Arreglo antes de Ordenar : "<<endl;


     for (int i=0; i < 10; i++ )
    {
      cout<<arreglo[i]<<" ";

    }
    cout<<endl;

    for (int i = 1; i<10; i++)
    {
        for(int j=i; j>0; j--)
        {
            if(arreglo[j]<arreglo[j-1])
            {
                aux = arreglo[j];
                arreglo[j] = arreglo[j-1];
                arreglo[j-1] = aux;
            }
        }
    }



    cout<<"Arreglo Ordenado: "<<endl;

    for (int i=0; i <10; i++ )
    {
      cout<<arreglo[i]<<" ";

    }

    return 0;
}


