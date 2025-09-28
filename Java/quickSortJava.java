public class quickSortJava {

    public static void quickSort(int[] arreglo, int length) {
        quickSort_recursive(arreglo, 0, length - 1);
    }

    public static void quickSort_recursive(int[] arreglo, int low, int high) {
        if (low < high) {
            int pivot_index = particion(arreglo, low, high);
            quickSort_recursive(arreglo, low, pivot_index - 1);
            quickSort_recursive(arreglo, pivot_index + 1, high);
        }
    }

    public static int particion(int[] arreglo, int low, int high) {
        int pivot_value = arreglo[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arreglo[j] <= pivot_value) {
                i++;
                // swap
                int temp = arreglo[i];
                arreglo[i] = arreglo[j];
                arreglo[j] = temp;
            }
        }

        // colocar pivote en su posición correcta
        int temp = arreglo[i + 1];
        arreglo[i + 1] = arreglo[high];
        arreglo[high] = temp;

        return i + 1;
    }

    public static void main(String[] args) {
        int[] a = {10, 11, 23, 44, 8, 15, 3, 9, 12, 45, 56, 45, 45};
        int length = a.length;

        quickSort(a, length);

        // imprimir arreglo ordenado
        for (int num : a) {
            System.out.print(num + " ");
        }
    }
}
