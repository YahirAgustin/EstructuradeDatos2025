
using System;
using System.Collections.Generic;

class BucketSort
{

    static void InsertionSort(List<double> bucket)
    {
        for (int j = 1; j < bucket.Count; j++)
        {
            double val = bucket[j];
            int k = j - 1;

            while (k >= 0 && bucket[k] > val)
            {
                bucket[k + 1] = bucket[k];
                k--;
            }
            bucket[k + 1] = val;
        }
    }

 
    static void Sort(double[] inputArr)
    {
        int s = inputArr.Length;
        List<List<double>> bucketArr = new List<List<double>>(s);

        for (int i = 0; i < s; i++)
        {
            bucketArr.Add(new List<double>());
        }

        foreach (double num in inputArr)
        {
            int bi = (int)(s * num);
            if (bi >= s) bi = s - 1;
            bucketArr[bi].Add(num);
        }

 
        foreach (var bucket in bucketArr)
        {
            InsertionSort(bucket);
        }

 
        int idx = 0;
        foreach (var bucket in bucketArr)
        {
            foreach (double num in bucket)
            {
                inputArr[idx++] = num;
            }
        }
    }


    static void Main()
    {
        double[] inputArr = { 0.77, 0.16, 0.38, 0.25, 0.71, 0.93, 0.22, 0.11, 0.24, 0.67 };

        Console.WriteLine("Arreglo antes de ordenar:");
        Console.WriteLine(string.Join(" ", inputArr));

        Sort(inputArr);

        Console.WriteLine("Arreglo después de ordenar:");
        Console.WriteLine(string.Join(" ", inputArr));
    }
}
