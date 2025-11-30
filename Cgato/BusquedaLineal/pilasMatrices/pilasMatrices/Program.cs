using System;

public class Pila
{
    private const int MAX = 100;
    private int[] stack;
    private int top;

    public Pila()
    {
        stack = new int[MAX];
        top = -1;
    }

    public void Push(int item) 
    {
        if (IsFull())
        {
            Console.WriteLine("Stack Overflow");
            return;
        }
        stack[++top] = item;
    }

    public int Pop()
    {
        if (IsEmpty())
        {
            Console.WriteLine("Stack Underflow");
            return -1; 
        }
        return stack[top--];
    }

    public int Peek()
    {
        if (IsEmpty())
        {
            Console.WriteLine("Stack is empty");
            return -1; 
        }
        return stack[top];
    }

    public bool IsEmpty()
    {
        return top == -1;
    }

    public bool IsFull()
    {
        return top == MAX - 1;
    }
}

// --- Main ---
public class Program
{
    public static void Main(string[] args)
    {
        Pila pila = new Pila();
        pila.Push(10);
        pila.Push(20);
        pila.Push(30);

        Console.WriteLine($"Elemento superior: {pila.Peek()}");
        Console.WriteLine($"Extrae el elemento: {pila.Pop()}");
        Console.WriteLine($"Elemento superior despues de pop: {pila.Peek()}");
    }
}