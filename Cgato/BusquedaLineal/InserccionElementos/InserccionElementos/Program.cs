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

        Console.WriteLine("Arreglo antes de insertar elemento:");
        for (int i = 0; i < 5; i++)
        {
            Console.Write(Array[i] + " ");
        }
        Console.WriteLine();

        int Element = 9;
        int Posicion = 3;
        int Aux = 0;

        for (int i = 0; i < 5; i++)
        {
            if (Posicion == i)
            {
                Aux = Array[i];
                Array[i] = Element;
                Element = Aux;
                Posicion += 1;
            }
        }

        Console.WriteLine("Arreglo después de insertar elemento:");
        for (int i = 0; i < 5; i++)
        {
            Console.Write(Array[i] + " ");
        }

        Console.ReadKey(); // Pausar la consola
    }
}
