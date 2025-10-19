using System;

class ShellSort
{
    static void Shellsort(int[] datos)
    {
        int incremento = datos.Length / 2;

        while (incremento > 0)
        {
            for (int i = incremento; i < datos.Length; i++)
            {
                int j = i;
                int dato = datos[i];

                while (j >= incremento && datos[j - incremento] > dato)
                {
                    datos[j] = datos[j - incremento];
                    j -= incremento;
                }

                datos[j] = dato;
            }

            if (incremento == 2)
            {
                incremento = 1;
            }
            else
            {
                incremento = (int)Math.Floor(incremento * 5.0 / 11);
            }
        }
    }

    static void MostrarArreglo(int[] datos)
    {
        foreach (int n in datos)
        {
            Console.Write(n + " ");
        }
        Console.WriteLine();
    }

    static void Main()
    {
        int[] primos = { 3, 34, 43, 11, 15, 20, 28, 45 };

        Console.WriteLine("Arreglo antes de ordenar:");
        MostrarArreglo(primos);

        Shellsort(primos);

        Console.WriteLine("Arreglo después de ordenar:");
        MostrarArreglo(primos);
    }
}



