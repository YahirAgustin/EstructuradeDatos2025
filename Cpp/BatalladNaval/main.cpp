//Revision 1 ( 26 de Septiembre de 2025)

#include <iostream>
#include <string>

using namespace std;


char tablero[10][10];
int longitud1 = 8;
int longitud2 = 10;
int x, y, turnos = 0;
bool colocado = false;
int barco,lonbarco;

void rellenarTablero()
{
    for (int i=0; i<longitud1; i++)
    {
        for(int j=0; j<longitud2; j++)
        {
            tablero[i][j] = ' ';
        }
    }
}

void imprimirTablero()
{
    for (int j= 0 ; j<longitud2 ; j++)
    {
        if(j == 0)
        {
            cout<<"  ";
        }
        cout<<j+1<<"|";
    }
    cout<<endl;
    cout<<"---------------------"<<endl;
    for(int i = 0; i<longitud1; i++)
    {
        cout<<i+1;
        for(int j = 0; j < longitud2; j++)
        {
            cout<<"|"<<tablero[i][j];
        }
        cout<<"|"<<endl;
        cout<<"---------------------"<<endl;
    }
}

bool validarPosicion(int x1, int y1)
{
    return (x1>=1 && x1<=longitud2) && (y1>=1 && y1<=longitud1);
}

bool verificarHorizontal(int x, int y,int barco)
{
    if(x+3 <= longitud2-1)
    {

        for (int i = x; i <= x+barco; i++)
        {
            if(tablero[y][i] == 'O') return false;
        }

        for (int i = x; i <= x+barco; i++)
        {
            tablero[y][i] = 'O';
        }
        return true;
    }
    return false;
}

bool verificarVertical(int y, int x,int barco)
{
    if(y+3 <= longitud1-1)
    {
        for (int i = y; i <= y+barco; i++)
        {
            if(tablero[i][x] == 'O') return false;
        }
        for (int i = y; i <= y+barco; i++)
        {
            tablero[i][x] = 'O';
        }
        return true;
    }
    return false;
}

int main()
{
    rellenarTablero();

    cout<<"BIENVENIDO A BATALLA NAVAL "<<endl;

    while (turnos < 3)
    {
        imprimirTablero();
        colocado = false;

        while (!colocado)
        {
            barco = 0;
            cout<<"Introduce la posicion (x , y) donde iniciara tu barco: ";
            cin>>x>>y;

            if(!validarPosicion(x,y))
            {
                cout<<"Parametros invalidos, intenta de nuevo."<<endl;
                continue;
            }

            cout<<"Introducce una pieza a poner: 1) Portaaviones (5) 2)Acorazado(4) 3)Cruzero(3) 4)Submarino(3) 5)Destructor (2)  "<<endl;
            cin>>barco;
            switch(barco)
            {
                case 1:
                    lonbarco = 4;
                break;
                    case 2:
                         lonbarco = 3;
                break;
                     case 3:
                         lonbarco = 2;
                break;
                     case 4:
                         lonbarco = 2;
                break;
                     case 5:
                         lonbarco = 1;
                break;
            }


            int opcion;
            cout<<"Elige la forma de acomodo de tu barco: 1) Horizontal  2) Vertical"<<endl;
            cin>>opcion;

            if(opcion == 1)
            {
                if (verificarHorizontal(x-1,y-1,lonbarco))
                {
                    cout<<"Barco colocado en horizontal "<<endl;
                    colocado = true;
                }
                else
                {
                    cout<<"No se puede colocar en horizontal en esa posicion."<<endl;
                }
            }
            else if(opcion == 2)
            {
                if(verificarVertical(y-1,x-1,lonbarco))
                {
                    cout<<"Barco colocado en vertical "<<endl;
                    colocado = true;
                }
                else
                {
                    cout<<"No se puede colocar en vertical en esa posicion."<<endl;
                }
            }
            else
            {
                cout<<"Opcion invalida. Intenta de nuevo."<<endl;
            }
        }


    }



    return 0;
}
