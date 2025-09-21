using System;

class Program
{
    static void Main()
    {
        Random rand = new Random();
        int[] arreglo = new int[10];

      
        for (int i = 0; i < 10; i++)
        {
            arreglo[i] = rand.Next(0, 101);
        }

        Console.WriteLine("Arreglo antes de ordenar:");
        foreach (int num in arreglo)
        {
            Console.Write(num + " ");
        }
        Console.WriteLine();


        for (int i = 1; i < arreglo.Length; i++)
        {
            for (int j = i; j > 0; j--)
            {
                if (arreglo[j] < arreglo[j - 1])
                {
                    int aux = arreglo[j];
                    arreglo[j] = arreglo[j - 1];
                    arreglo[j - 1] = aux;
                }
                else
                {
                    break; 
                }
            }
        }

        Console.WriteLine("Arreglo ordenado:");
        foreach (int num in arreglo)
        {
            Console.Write(num + " ");
        }
    }
}
