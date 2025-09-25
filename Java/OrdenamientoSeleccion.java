import java.util.Random;

public class OrdenamientoSeleccion {
    public static void main(String[] args) {
        Random rand = new Random();
        int[] arreglo = new int[10];
        int minimo;
        int aux;
        int posmin;

   
        for (int i = 0; i < arreglo.length; i++) {
            arreglo[i] = rand.nextInt(101);
        }

        System.out.println("Arreglo antes de ordenar:");
        for (int i = 0; i < arreglo.length; i++) {
            System.out.print(arreglo[i] + " ");
        }
        System.out.println();


        for (int i = 0; i < arreglo.length; i++) {
            minimo = arreglo[i];
            posmin = i;

            for (int j = i + 1; j < arreglo.length; j++) {
                if (arreglo[j] < minimo) {
                    minimo = arreglo[j];
                    posmin = j;
                }
            }

            aux = arreglo[i];
            arreglo[i] = arreglo[posmin];
            arreglo[posmin] = aux;
        }

        System.out.println("Arreglo ordenado:");
        for (int i = 0; i < arreglo.length; i++) {
            System.out.print(arreglo[i] + " ");
        }
    }
}
