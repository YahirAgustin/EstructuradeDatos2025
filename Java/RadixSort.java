import java.util.Arrays;

public class RadixSort {

    public static void main(String[] args) {
        int[] list = {1, 4, 5, 90, 23, 43, 65, 23, 12, 78};
        radixSort(list);
        System.out.println("Ordenado: " + Arrays.toString(list));
    }

    public static void radixSort(int[] array) {
        int maxNum = getMax(array);
        int digit = 0;

        
        while (maxNum / (int)Math.pow(10, digit) > 0) {
            helper(array, digit);
            digit++;
        }
    }

    private static void helper(int[] array, int digit) {
        int[] countArray = new int[10]; 
        int[] sortArray = new int[array.length]; 

        int whichDigit = (int) Math.pow(10, digit);

        
        for (int num : array) {
            int countIndex = (num / whichDigit) % 10;
            countArray[countIndex]++;
        }

        
        for (int i = 1; i < countArray.length; i++) {
            countArray[i] += countArray[i - 1];
        }

        
        for (int i = array.length - 1; i >= 0; i--) {
            int countIndex = (array[i] / whichDigit) % 10;
            countArray[countIndex]--;
            int sortIndex = countArray[countIndex];
            sortArray[sortIndex] = array[i];
        }

        
        for (int i = 0; i < array.length; i++) {
            array[i] = sortArray[i];
        }
    }

   
    private static int getMax(int[] array) {
        int max = array[0];
        for (int num : array) {
            if (num > max) max = num;
        }
        return max;
    }
}
