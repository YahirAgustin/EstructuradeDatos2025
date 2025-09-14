using System;

class Program
{
    static void Main()
    {
        int[] Array = new int[5];
        int encontrado = 0, posicion = -1;

        Array[0] = 2;
        Array[1] = 4;
        Array[2] = 6;
        Array[3] = 8;
        Array[4] = 10;

        int Buscar = 5;

        for (int i = 0; i < 5; i++)
        {
            if (Array[i] == Buscar)
            {
                encontrado = 1;
                posicion = i;
            }
        }

        if (encontrado == 1)
        {
            Console.WriteLine("El elemento se encontró en la posición: " + posicion);
        }
        else
        {
            Console.WriteLine("Elemento no encontrado");
        }

        Console.ReadKey(); // Para pausar la consola
    }
}
