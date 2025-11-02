using System;

class RadixSortProgram
{
    static void Main()
    {
        int[] list = { 1, 4, 5, 90, 23, 43, 65, 23, 12, 78 };
        RadixSort(list);
        Console.WriteLine("Ordenado: " + string.Join(", ", list));
    }

    static void RadixSort(int[] array)
    {
        int maxNum = GetMax(array);
        int digit = 0;

        
        while (maxNum / (int)Math.Pow(10, digit) > 0)
        {
            Helper(array, digit);
            digit++;
        }
    }

    static void Helper(int[] array, int digit)
    {
        int[] countArray = new int[10]; 
        int[] sortArray = new int[array.Length]; 

        int whichDigit = (int)Math.Pow(10, digit);

        
        foreach (int num in array)
        {
            int countIndex = (num / whichDigit) % 10;
            countArray[countIndex]++;
        }

       
        for (int i = 1; i < countArray.Length; i++)
        {
            countArray[i] += countArray[i - 1];
        }

       
        for (int i = array.Length - 1; i >= 0; i--)
        {
            int countIndex = (array[i] / whichDigit) % 10;
            countArray[countIndex]--;
            int sortIndex = countArray[countIndex];
            sortArray[sortIndex] = array[i];
        }

        
        for (int i = 0; i < array.Length; i++)
        {
            array[i] = sortArray[i];
        }
    }

    static int GetMax(int[] array)
    {
        int max = array[0];
        foreach (int num in array)
        {
            if (num > max)
                max = num;
        }
        return max;
    }
}
