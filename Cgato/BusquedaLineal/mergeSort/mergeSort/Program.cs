
using System;
using System.Collections.Generic;

class Program
{
   
    static List<int> Merge(List<int> arr1, List<int> arr2)
    {
        List<int> result = new List<int>();
        int i = 0, j = 0;

        while (i < arr1.Count && j < arr2.Count)
        {
            if (arr1[i] < arr2[j])
            {
                result.Add(arr1[i]);
                i++;
            }
            else
            {
                result.Add(arr2[j]);
                j++;
            }
        }

    
        while (i < arr1.Count) result.Add(arr1[i++]);
        while (j < arr2.Count) result.Add(arr2[j++]);

        return result;
    }


    static List<int> MergeSort(List<int> arr)
    {
        if (arr.Count < 2) return arr;

        int middle = arr.Count / 2;

        List<int> left = arr.GetRange(0, middle);      
        List<int> right = arr.GetRange(middle, arr.Count - middle); 

        left = MergeSort(left);
        right = MergeSort(right);

        return Merge(left, right);
    }

    static void Main()
    {
        Random rnd = new Random();
        List<int> arr = new List<int>();

        for (int i = 0; i < 10; i++)
        {
            arr.Add(rnd.Next(0, 101)); 
        }

        List<int> sorted = MergeSort(arr);

        Console.WriteLine(string.Join(" ", sorted));
    }
}
