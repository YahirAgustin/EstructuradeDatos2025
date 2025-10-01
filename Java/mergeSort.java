import java.util.ArrayList;
import java.util.Random;

public class MergeSortExample {

  
    public static ArrayList<Integer> merge(ArrayList<Integer> arr1, ArrayList<Integer> arr2) {
        ArrayList<Integer> result = new ArrayList<>();
        int i = 0, j = 0;

        while (i < arr1.size() && j < arr2.size()) {
            if (arr1.get(i) < arr2.get(j)) {
                result.add(arr1.get(i));
                i++;
            } else {
                result.add(arr2.get(j));
                j++;
            }
        }

        while (i < arr1.size()) result.add(arr1.get(i++));
        while (j < arr2.size()) result.add(arr2.get(j++));

        return result;
    }

    public static ArrayList<Integer> mergeSort(ArrayList<Integer> arr) {
        if (arr.size() < 2) return arr;

        int middle = arr.size() / 2;

        ArrayList<Integer> left = new ArrayList<>(arr.subList(0, middle));      
        ArrayList<Integer> right = new ArrayList<>(arr.subList(middle, arr.size())); 

        left = mergeSort(left);
        right = mergeSort(right);

        return merge(left, right);
    }

    public static void main(String[] args) {
        Random rnd = new Random();
        ArrayList<Integer> arr = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            arr.add(rnd.nextInt(101)); 
        }

        ArrayList<Integer> sorted = mergeSort(arr);

        System.out.println(sorted);
    }
}
