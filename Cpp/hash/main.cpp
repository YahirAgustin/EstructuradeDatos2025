#include <iostream>
#include <vector>

using namespace std;

void imprimir(int A[], int tam)
{
    int i;
    for (i = 0; i< tam; i++)
    {
        cout<<" "<<A[i]<<" ";
    }
    cout<<endl;
}

void ShellSort(int A[],int tam)
{
    int paso,i,j,temp;

    paso = tam/2;

    while(paso>0)
    {
        for (i = paso ; i < tam ; i++)
        {
            temp = A[i];
            for(j=i; j>=paso; j-=paso)
            {
                if(A[j-paso]> temp)
                {
                     A[j] = A[j-paso];
                }else{
                break;
            }

        }
       A[j] = temp;
    }
paso = paso /2;
}
}


int main()
{
    int A[] = {36,34,43,11,15,20,28,45};
    int tam = sizeof(A)/sizeof(A[0]);

    cout<<"Arreglo en desorden: ";
    imprimir(A,tam);

    ShellSort(A,tam);

    cout<<"Arreglo en orden : ";
    imprimir(A,tam);
    return 0;
}


