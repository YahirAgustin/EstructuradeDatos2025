#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int getMax(const vector<int>&arreglo)
{
    int maxi = arreglo[0];
    for(int n:arreglo)
    {
        if(n>maxi)
        {
            maxi = n;
        }
    }
    return maxi;
}


void helper(vector<int>&arreglo,int digit)
{
    vector<int> countArray(10,0);
    vector<int> sortArray(arreglo.size(),0);

    int wichDigit = pow(10,digit);

    for(int num:arreglo)
    {
        int countIndex = (num/wichDigit)%10;
        countArray[countIndex]++;
    }

    for(int i =1; i<10; i++)
    {
        countArray[i] += countArray[i-1];
    }

    for(int i = arreglo.size() -1 ; i>=0;i--)
    {
        int countIndex = (arreglo[i]/wichDigit)%10;
        countArray[countIndex]--;
        int sortIndex = countArray[countIndex];
        sortArray[sortIndex] = arreglo[i];
    }
    for(int i=0; i<arreglo.size();i++)
    {
        arreglo[i] = sortArray[i];
    }

}

void radixSort(vector<int>&arreglo)
{
    int maxNum = getMax(arreglo);
    int digit = 0;

    while(maxNum/(int)pow(10,digit)>0)
    {
        helper(arreglo,digit);
        digit++;
    }


}

int main()
{
    vector<int>arreglo = {1, 4, 5, 90, 23, 43, 65, 23, 12, 78};

    radixSort(arreglo);

    cout<<"Ordenado: ";
    for(int num:arreglo)
    {
        cout<<num<<" ";
    }
    cout<<endl;



    return 0;
}
