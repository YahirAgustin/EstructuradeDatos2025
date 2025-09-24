#include <iostream>

using namespace std;

int main()
{
    int arreglo;
    int conpar = 0,conimpar = 0;
    float promedio,suma = 0 ;

    for(int i= 0; i<10; i++)
    {
        cout<<"N"<<i+1<<" : ";
        cin>>arreglo;
        if(arreglo % 2 == 0)
        {
            conpar += 1;
        }else{
            conimpar +=1;
        }
        suma+= arreglo;


    }
    promedio = suma/10;
    cout<<"Conatdor de Pares: "<<conpar<<endl;
    cout<<"Conatdor de Imares: "<<conimpar<<endl;
    cout<<"Promedio: "<< promedio;




    return 0;
}
