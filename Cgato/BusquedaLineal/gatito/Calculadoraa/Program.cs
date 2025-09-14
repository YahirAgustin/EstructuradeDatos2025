
string[] tablero = new string[] { "1", "2", "3", "4", "5", "6", "7", "8", "9" };


bool turnoJugador1 = true;
string nuevoJuego = "";
int contadorTurnos = 0;
int aceptado = 0;

do
{


    while(!checarVictoria() && contadorTurnos != 9)
    {
        crearTablero();


        while(aceptado == 0)
        { 

        if(turnoJugador1 )
        {
            Console.WriteLine("Turno del Jugador1 : ");
        }else
        {
            Console.WriteLine("Turno del Jugador2 : ");
        }

        string elegido = Console.ReadLine();

        if (tablero.Contains(elegido) && elegido != "X" && elegido != "O")
        {

            int tableroIndice = Convert.ToInt32(elegido) - 1;

            if (turnoJugador1)
            {
                tablero[tableroIndice] = "X";
            }
            else
            {
                tablero[tableroIndice] = "O";
            }

            contadorTurnos++;
                aceptado = 1;
                turnoJugador1 = !turnoJugador1;

            }
        else
        {
            Console.WriteLine("Escoja una posicion disponible en el Tablero: ");
                aceptado = 0;
        }

            
        }
        aceptado = 0;

    }


    if (checarVictoria ())
    {
        Console.WriteLine("GANASTE");

    }else
    {
        Console.WriteLine("EMPATE");
    }

    Console.WriteLine("DESEA VOLVER A JUGAR? SI/NO");
    nuevoJuego = Console.ReadLine();

    tablero = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    contadorTurnos = 0;
















} while (nuevoJuego == "SI");









bool checarVictoria()
{

    bool fil1 = tablero[0] == tablero[1] && tablero[1] == tablero[2];
    bool fil2 = tablero[3] == tablero[4] && tablero[4] == tablero[5];
    bool fil3 = tablero[6] == tablero[7] && tablero[7] == tablero[8];

    bool col1 = tablero[0] == tablero[3] && tablero[3] == tablero[6];
    bool col2 = tablero[1] == tablero[4] && tablero[4] == tablero[7];
    bool col3 = tablero[2] == tablero[5] && tablero[5] == tablero[8];

    bool diagoAbajo = tablero[0] == tablero[4] && tablero[4] == tablero[8];
    bool diagoArriba = tablero[6] == tablero[4] && tablero[4] == tablero[2];

    return fil1 || fil2 || fil3 || col1 || col2 || col3 || diagoAbajo || diagoArriba;
}


void crearTablero()
{ 
for (int i= 0; i<3; i++)
{

    for (int j = 0; j < 3; j++)
    {

        Console.Write(tablero[i * 3 + j] + "|");

    }
    Console.WriteLine();
    Console.WriteLine("------");


}
}