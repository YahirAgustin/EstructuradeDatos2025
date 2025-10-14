using System;

class HeapSort
{
   
    static void Heapify(int[] arr, int n, int i)
    {
        int largest = i;       
        int left = 2 * i + 1;   
        int right = 2 * i + 2; 

       
        if (left < n && arr[left] > arr[largest])
            largest = left;

      
        if (right < n && arr[right] > arr[largest])
            largest = right;

      
        if (largest != i)
        {
  
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;


            Heapify(arr, n, largest);
        }
    }


    static void HeapSortAlgorithm(int[] arr)
    {
        int n = arr.Length;

        for (int i = n / 2 - 1; i >= 0; i--)
            Heapify(arr, n, i);

        for (int i = n - 1; i > 0; i--)
        {

            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;


            Heapify(arr, i, 0);
        }
    }

    static void PrintArray(int[] arr)
    {
        foreach (int num in arr)
            Console.Write(num + " ");
        Console.WriteLine();
    }


    static void Main()
    {
        int[] lista = { 12, 11, 13, 5, 6, 7 };

        Console.WriteLine("Antes de ordenar:");
        PrintArray(lista);

        HeapSortAlgorithm(lista);

        Console.WriteLine("Después de ordenar:");
        PrintArray(lista);
    }
}
