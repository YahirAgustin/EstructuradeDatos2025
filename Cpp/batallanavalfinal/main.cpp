#include <iostream>
#include <vector>
#include <ctime>
#include <cstdlib>
#include <chrono>
#include <thread>


using namespace std;

const int TAMANO_TABLERO = 10;
const char AGUA = '~';
const char BARCO = 'S';
const char IMPACTO = 'X';
const char FALLO = '0';

struct Barco
{
    string nombre;
    int tamano;
    int vida;
};

void inicializarTablero(vector<vector<char>>&tablero);
void mostrarTablero(const vector<vector<char>>&tablero, bool revelarBarcos);
void colocarBarcos(vector<vector<char>>&tablero, vector<Barco>&barco);
bool realizarDisparo(vector<vector<char>>&tablero_oponente,vector<vector<char>>&tablero_disparos,vector<Barco>&barco_oponente,int fila, int col );
bool verificarVictoria (const vector<Barco>&barcos);

//Inicializamos el tablero con agua

void inicializarTablero(vector<vector<char>>&tablero)
{
    for(int i = 0; i < TAMANO_TABLERO; i++)
    {
        for(int j = 0; j< TAMANO_TABLERO; j++)
        {
            tablero[i][j] = AGUA;
        }
    }
}

//Mostrar tablero

void mostrarTablero(const vector<vector<char>>&tablero, bool revelarBarcos)
{
    cout<<" ";

    for(int j = 0; j<TAMANO_TABLERO; j++)
    {
        cout<<j<<" ";
    }

    cout<<endl;

    for(int i = 0; i < TAMANO_TABLERO; i++)
    {
        cout<<i<<" ";
        for(int j = 0; j < TAMANO_TABLERO; j++)
        {
            char celda = tablero[i][j];

            if(!revelarBarcos && celda == BARCO)
            {
                cout<<AGUA<<" ";
            }else
            {
                cout<<celda<<" ";
            }
        }
        cout<<endl;
    }
}

//Funcion para la colocacion de Barcos

void colocarBarcos(vector<vector<char>>&tablero,vector<Barco>&barcos)
{
    cout<<"\n --- COLOCACION DE BARCOS ---\n";
    for(Barco& barco : barcos)
    {
        bool colocado = false;
        while(!colocado)
        {
            int fila,col,dir;
            cout<<"Coloca el "<<barco.nombre<<"(Tamano: "<<barco.tamano<<")\n";
            cout<<"Fila inicial (0-9): ";
            cin>>fila;
            cout<<"Columna inicial (0-9): ";
            cin>>col;
            cout<<"Direccion(0=Horizontal , 1= Vertical: ";
            cin>>dir;

            bool valido = true;
            for(int i = 0; i<barco.tamano; i++)
            {
                int r = fila + (dir==1 ? i:0);
                int c = col + (dir==0 ? i:0);
                if(r<0 || r>= TAMANO_TABLERO || c < 0 || c >= TAMANO_TABLERO || tablero[r][c] == BARCO )
                {
                    valido = false;
                    break;
                }
            }

            if(valido)
            {
                for(int i =0; i< barco.tamano; i++)
                {
                    int r = fila + (dir == 1 ? i : 0);
                    int c = col + (dir == 0 ? i:0);
                    tablero[r][c] = BARCO;
                }
                colocado = true;
                mostrarTablero(tablero,true);
            }else
            {
                cout<<"ERROR! Posicion no valida. Intenta de nuevo"<<endl;
            }

        }
    }
}

// Funcion para realizar los Disparos del jugador

bool realizarDisparo(vector<vector<char>>&tablero_oponente,vector<vector<char>>&tablero_disparos,vector<Barco>& barcos_oponente,int fila, int col)
{
    if(fila < 0 || fila>= TAMANO_TABLERO || col < 0 || col >= TAMANO_TABLERO)
    {
        cout<<"Coordenadas fuera de rango. Pierdes el turno. "<<endl;
        return true;
    }
    if(tablero_disparos[fila][col] != AGUA)
    {
        cout<<"Ya disparaste en esta posicion. Pierdes el turno."<<endl;
        return true;
    }
    if(tablero_oponente[fila][col] == BARCO)
    {
        cout<<"\n*** IMPACTO ***\n";
        tablero_oponente[fila][col] = IMPACTO;
        tablero_disparos[fila][col] = IMPACTO;

        for (Barco&barco : barcos_oponente)
        {
            if(barco.vida > 0 )
            {
                barco.vida--;
                if(barco.vida == 0)
                {
                    cout<<"Has hundido el "<<barco.nombre<<" de tu oponente"<<endl;
                    break;
                }
            }
        }
        return false;
    }else
    {
        cout<<"\n...AGUA...\n";
        tablero_oponente[fila][col] = FALLO;
        tablero_disparos[fila][col] = FALLO;
        return true;
    }
}

//Verificamos si algun jugador ha ganado
bool verificarVictoria(const vector<Barco> & barcos)
{
    for(const Barco&barco : barcos)
    {
        if(barco.vida > 0)
        {
            return false;
        }
    }
    return true;
}

//Funcion main
int main()
{
    //Inicializamos los tableros para ambos jugadores
    vector<vector<char>> tablero_J1(TAMANO_TABLERO,vector<char>(TAMANO_TABLERO));
    vector<vector<char>> disparos_J1(TAMANO_TABLERO,vector<char>(TAMANO_TABLERO));

    vector<vector<char>> tablero_J2(TAMANO_TABLERO,vector<char>(TAMANO_TABLERO));
    vector<vector<char>> disparos_J2(TAMANO_TABLERO,vector<char>(TAMANO_TABLERO));

    //Definimos lo que es los barcos disponibles para c/u

    vector<Barco> barcos_J1 =
    {
        {"Portaaviones",5,5},
        {"Acorazado",4,4},
        {"Crucero",3,3},
        {"Submarino",3,3},
        {"Destructor",2,2},
    };
    vector<Barco> barcos_J2 =
    {
        {"Portaaviones",5,5},
        {"Acorazado",4,4},
        {"Crucero",3,3},
        {"Submarino",3,3},
        {"Destructor",2,2},
    };

    inicializarTablero(tablero_J1);
    inicializarTablero(disparos_J1);
    inicializarTablero(tablero_J2);
    inicializarTablero(disparos_J2);

    cout<<"-----BIENVENIDO A BATALLA NAVAL------ "<<endl;
    cout << "\nJGADOR 1: Coloca tus barcos.\n";
    colocarBarcos(tablero_J1,barcos_J1);

    this_thread::sleep_for(chrono::seconds(2));
    system("CLS");

    cout<<"\nJUGADOR 2: Coloca tus barcos: "<<endl;
    colocarBarcos(tablero_J2,barcos_J2);

    int turno = 1;
    bool juego_terminado = false;

    while(!juego_terminado)
    {
        int fila,col;
        bool siguiente_turno = false;

        this_thread::sleep_for(chrono::seconds(2));
        system("CLS");

        cout<<"\n --- TURNO DEL JUGADOR "<<turno << "---\n";
        vector<vector<char>>tablero_actual = (turno == 1)? tablero_J1 : tablero_J2;
        vector<vector<char>>disparos_actual = (turno == 1) ? disparos_J1 : disparos_J2;

        vector<vector<char>>& tablero_oponente = (turno == 1 ) ? tablero_J2 : tablero_J1;
        vector<Barco>&barcos_oponente = (turno == 1) ? barcos_J2 : barcos_J1;

        cout<<"\nTu Tablero de Disparos (Oponente : )"<<endl;
        mostrarTablero(disparos_actual,false);
        cout<<"\nTu tablero de Barcos: "<<endl;
        mostrarTablero(tablero_actual,true);

        cout<<"Ingresa las coordenadas del disparo (Fila,Col): ";
        cin>>fila>>col;

        siguiente_turno = realizarDisparo(tablero_oponente,disparos_actual,barcos_oponente,fila,col);

        if(verificarVictoria(barcos_oponente))
        {
            juego_terminado=true;
            cout<<"\n**************************"<<endl;
            cout<<"*** EL JUGADOR "<<turno<<" HA GANADO ***"<<endl;
            cout<<"************************"<<endl;

        }

        if(siguiente_turno&&!juego_terminado)
        {
            turno = (turno == 1) ? 2:1;
        }
    }
    return 0;
}
