#include <iostream>
#include <utility>
#include <ctime>
#include <cstdlib>

using namespace std;


void quickSort(int arreglo[],int lenght);
void quickSort_recursive(int arreglo[], int low , int high);
int particion(int arreglo[], int high , int low);

int main()
{
    int a[]={10,11,23,44,8,15,3,9,12,45,56,45,45};
    int lenght = 13;

    quickSort(a,lenght);

    for(int i= 0; i<lenght; i++)
    {
        cout<<a[i]<<" ";
    }
    cout<<endl;


    return 0;
}
void quickSort(int arreglo[],int lenght)
{
   quickSort_recursive(arreglo , 0 ,lenght-1);
}

void quickSort_recursive(int arreglo[],int low,int high)
{
    if(low<high)
    {


   int pivot_index = particion(arreglo,low,high);
   quickSort_recursive(arreglo,low,pivot_index-1);
   quickSort_recursive(arreglo,pivot_index+1,high);
   }
}

int particion(int arreglo[],int low, int high)
{
    int pivot_value = arreglo[high];
    int i = low;

    for (int j = low; j<high ; j++)
    {
        if(arreglo[j]<= pivot_value)
        {
            swap(arreglo[i],arreglo[j]);
            i+=1;
        }
    }
    swap ( arreglo[i],arreglo[high]);

    return i;
}
