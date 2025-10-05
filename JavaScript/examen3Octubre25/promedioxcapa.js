//Promedio por capas de un arreglo de 3x3x3

let arreglo = 
[
    [ [5,4,3],[ 6,10,3],[5,7,10]],
    [[1,3,4],[5,10,7],[9,8,5]],
    [[3,6,7],[4,6,7,],[9,0,4]]
]

let suma = [0,0,0]

for(let i =0; i<3; i++)
{
    for(k=0; k<3; k++)
    {
          for(j=0; j<3; j++)
            {
                suma[i] += arreglo[i][k][j]
            }
    }
}

console.log (suma)
console.log("Promdio capa 1 = [" + suma[0]/9 + "]")
console.log("Promdio capa 2 = [" + suma[1]/9 + "]")
console.log("Promdio capa 3 = [" + suma[2]/9 + "]")
