import java.util.Scanner;

public class connect4 {

    static int[][] arreglo = new int[6][7];
    static int[] casillasOcupadas = new int[7];
    static int turno = 0;
    static boolean turnoJugador1 = true;
    static int posicion;
    static int posicionDisponible;
    static int completado;

    public static void imprimirTablero() {
        for (int i = 0; i < 7; i++) {
            System.out.print(i + 1 + " ");
        }
        System.out.println();
        System.out.println();

        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {
                System.out.print(arreglo[i][j] + "|");
            }
            System.out.println();
            System.out.println("--------------");
        }
    }

    public static boolean decidirVictoria() {
        int elementoBuscar;

        if (turnoJugador1) {
            elementoBuscar = 1;
        } else {
            elementoBuscar = 2;
        }

        // Forma vertical
        int contadorVertical = 0;
        for (int i = 0; i < 6; i++) {
            if (arreglo[i][posicion] == elementoBuscar) {
                contadorVertical++;
            } else {
                contadorVertical = 0;
            }
        }
        if (contadorVertical == 4) {
            return true;
        } else {
            contadorVertical = 0;
        }

        // Forma Horizontal
        int contadorHorizontal = 0;
        for (int i = 0; i < 7; i++) {
            if (arreglo[posicionDisponible][i] == elementoBuscar) {
                contadorHorizontal++;
            } else {
                contadorHorizontal = 0;
            }
            if (contadorHorizontal >= 4) {
                return true;
            }
        }

        // Verificación Diagonal1
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 4; j++) {
                if (arreglo[i][j] == elementoBuscar &&
                    arreglo[i + 1][j + 1] == elementoBuscar &&
                    arreglo[i + 2][j + 2] == elementoBuscar &&
                    arreglo[i + 3][j + 3] == elementoBuscar) {
                    return true;
                }
            }
        }

        // Verificación Diagonal2
        for (int i = 0; i < 3; i++) {
            for (int j = 3; j < 7; j++) {
                if (arreglo[i][j] == elementoBuscar &&
                    arreglo[i + 1][j - 1] == elementoBuscar &&
                    arreglo[i + 2][j - 2] == elementoBuscar &&
                    arreglo[i + 3][j - 3] == elementoBuscar) {
                    return true;
                }
            }
        }

        return false;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("BIENVENIDO A CONECTA 4 :");
        System.out.println();
        System.out.println("1.Las posiciones con un 0 son las disponibles.");
        System.out.println("2.Gana aquel que consiga conectar 4 de forma vertical,horizontal o diagonal.");
        System.out.println("3.Casillas del Jugador 1 representadas con un 1.");
        System.out.println("4.Casillas del Jugador 2 representadas con un 2.");
        System.out.println();

        while (turno != 42) {
            imprimirTablero();
            posicion = 0;
            completado = 0;

            do {
                if (turnoJugador1) {
                    System.out.println("Es turno del Jugador 1");
                    System.out.println("Ingrese una posicion (1-7)");
                } else {
                    System.out.println("Es turno del Jugador 2");
                    System.out.println("Ingrese una posicion (1-7)");
                }

                if (scanner.hasNextInt()) {
                    posicion = scanner.nextInt();
                } else {
                    scanner.next(); 
                    posicion = -1; 
                }

                if (posicion < 1 || posicion > 7) {
                    System.out.println("INTRODUZCA UNA POSICION VALIDA");
                } else if (arreglo[0][posicion - 1] != 0) {
                    System.out.println("COLUMNA LLENA");
                } else {
                    completado = 1;
                }
            } while (completado != 1);

            posicion--; 


            for (int i = 0; i < 6; i++) {
                if (arreglo[i][posicion] == 0) {
                    posicionDisponible = i;
                }
            }

            if (turnoJugador1) {
                arreglo[posicionDisponible][posicion] = 1;
            } else {
                arreglo[posicionDisponible][posicion] = 2;
            }

            if (decidirVictoria()) {
                imprimirTablero();
                System.out.println("EL JUEGO TERMINO. HAZ GANADO");
                return;
            }

            turno++;
            turnoJugador1 = !turnoJugador1;
        }

        System.out.println("HAN TERMINADO LOS TURNOS. ES UN EMPATE");
        return;
    }
}
