public class hash{

    public static void shellsort(int[] datos) {
        int incremento = datos.length / 2;

        while (incremento > 0) {
            for (int i = incremento; i < datos.length; i++) {
                int j = i;
                int dato = datos[i];

                while (j >= incremento && datos[j - incremento] > dato) {
                    datos[j] = datos[j - incremento];
                    j -= incremento;
                }

                datos[j] = dato;
            }

            if (incremento == 2) {
                incremento = 1;
            } else {
                incremento = (int) Math.floor(incremento * 5.0 / 11);
            }
        }
    }

    public static void mostrarArreglo(int[] datos) {
        for (int n : datos) {
            System.out.print(n + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] primos = {3, 34, 43, 11, 15, 20, 28, 45};

        System.out.println("Arreglo antes de ordenar:");
        mostrarArreglo(primos);

        shellsort(primos);

        System.out.println("Arreglo después de ordenar:");
        mostrarArreglo(primos);
    }
}

