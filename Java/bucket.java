import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class bucket{

    public static void insertionSort(List<Double> bucket) {
        for (int j = 1; j < bucket.size(); j++) {
            double val = bucket.get(j);
            int k = j - 1;

            while (k >= 0 && bucket.get(k) > val) {
                bucket.set(k + 1, bucket.get(k));
                k--;
            }
            bucket.set(k + 1, val);
        }
    }


    public static void bucketSort(double[] inputArr) {
        int s = inputArr.length;
        List<List<Double>> bucketArr = new ArrayList<>(s);


        for (int i = 0; i < s; i++) {
            bucketArr.add(new ArrayList<>());
        }


        for (double num : inputArr) {
            int bi = (int) (s * num); 
            bucketArr.get(bi).add(num);
        }


        for (List<Double> bucket : bucketArr) {
            insertionSort(bucket);
        }

 
        int idx = 0;
        for (List<Double> bucket : bucketArr) {
            for (double num : bucket) {
                inputArr[idx++] = num;
            }
        }
    }


    public static void main(String[] args) {
        double[] inputArr = {0.77, 0.16, 0.38, 0.25, 0.71, 0.93, 0.22, 0.11, 0.24, 0.67};

        System.out.println("Arreglo antes de ordenar:");
        for (double num : inputArr) {
            System.out.print(num + " ");
        }
        System.out.println();

        bucketSort(inputArr);

        System.out.println("Arreglo después de ordenar:");
        for (double num : inputArr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
