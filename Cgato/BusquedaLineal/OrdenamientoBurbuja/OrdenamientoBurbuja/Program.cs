using System;

class Burbuja
{
    static void Main()
    {
        Random rand = new Random();
        int[] arreglo = new int[10];


        for (int i = 0; i < arreglo.Length; i++)
        {
            arreglo[i] = rand.Next(0, 101);
        }

        Console.WriteLine("Arreglo antes de ordenar:");
        Console.WriteLine(string.Join(" ", arreglo));

        for (int i = 0; i < arreglo.Length - 1; i++)
        {
            for (int j = 0; j < arreglo.Length - 1 - i; j++)
            {
                if (arreglo[j] > arreglo[j + 1])
                {
                    int aux = arreglo[j];
                    arreglo[j] = arreglo[j + 1];
                    arreglo[j + 1] = aux;
                }
            }
        }

        Console.WriteLine("Arreglo ordenado:");
        Console.WriteLine(string.Join(" ", arreglo));
    }
}
