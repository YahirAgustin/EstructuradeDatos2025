using System;

class Program
{
    static void Main()
    {
        // Imprimir mensajes
        Console.WriteLine("Hola Mundo");

        // Tipo de Datos
        Console.WriteLine(typeof(string));   // Esto es un texto
        Console.WriteLine(typeof(int));      // 4
        Console.WriteLine(typeof(double));   // 1.1

        // Variables
        int a = 4;
        int b = 6;
        int c = a + b;
        Console.WriteLine(c);

        // Concatenar
        a = 16;
        string mi_texto = "Yahir";
        Console.WriteLine(a + " " + mi_texto);

        // Arreglos
        string[] Arreglo = { "A", "B", "C", "D", "E" };
        // Imprimir elemento del arreglo
        Console.WriteLine(Arreglo[3]); // D

        // Matriz
        string[,] Matriz = {
            { "A", "B", "C", "D", "E" },
            { "F", "G", "H", "I", "J" },
            { "K", "L", "M", "N", "0" }
        };
        // Imprimir elemento de la matriz
        Console.WriteLine(Matriz[2, 3]); // N

        Console.ReadKey(); // Pausa la consola
    }
}
