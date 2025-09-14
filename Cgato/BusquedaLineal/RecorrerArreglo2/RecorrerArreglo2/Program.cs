

using System;

class Program
{
    static void Main()
    {
        int[] Array = new int[5];

        Array[0] = 2;
        Array[1] = 4;
        Array[2] = 6;
        Array[3] = 8;
        Array[4] = 10;

        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine(Array[i]);
        }

        Console.ReadKey(); // Para pausar la consola
    }
}

