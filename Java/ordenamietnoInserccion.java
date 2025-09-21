import java.util.Random;

public class ordenamietnoInserccion {
    public static void main(String[] args) {
        Random rand = new Random();
        int[] arreglo = new int[10];

        for (int i = 0; i < 10; i++) {
            arreglo[i] = rand.nextInt(101);
        }

        System.out.println("Arreglo antes de ordenar:");
        for (int num : arreglo) {
            System.out.print(num + " ");
        }
        System.out.println();


        for (int i = 1; i < arreglo.length; i++) {
            for (int j = i; j > 0; j--) {
                if (arreglo[j] < arreglo[j - 1]) {
                    int aux = arreglo[j];
                    arreglo[j] = arreglo[j - 1];
                    arreglo[j - 1] = aux;
                } else {
                    break; 
                }
            }
        }

        System.out.println("Arreglo ordenado:");
        for (int num : arreglo) {
            System.out.print(num + " ");
        }
    }
}
