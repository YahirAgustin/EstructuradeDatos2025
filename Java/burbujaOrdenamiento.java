import java.util.Random;

public class burbujaOrdenamiento {
    public static void main(String[] args) {
        Random rand = new Random();

        int[] arreglo = new int[10];
        int limite = 10;
        int aux = 0;

        // Llenar el arreglo con números aleatorios del 0 al 100
        for (int i = 0; i < 10; i++) {
            arreglo[i] = rand.nextInt(101);
        }

        // Imprimir arreglo antes de ordenar
        System.out.println("Arreglo antes de ordenar:");
        for (int i = 0; i < 10; i++) {
            System.out.print(arreglo[i] + " ");
        }
        System.out.println();

        // Ordenamiento burbuja
        for (int i = 0; i < 10; i++) {
            for (int j = 1; j < limite - i; j++) {
                if (arreglo[j - 1] > arreglo[j]) {
                    aux = arreglo[j - 1];
                    arreglo[j - 1] = arreglo[j];
                    arreglo[j] = aux;
                }
            }
        }

        // Imprimir arreglo ordenado
        System.out.println("Arreglo ordenado:");
        for (int i = 0; i < 10; i++) {
            System.out.print(arreglo[i] + " ");
        }
    }
}
