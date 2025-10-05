//ordenar filas de un arreglo de 2x2

let arreglo = [[5,3,2], [4,9,7],[9,4,3]]



for (let k=0; k<3; k++)
{

for (let i = 0; i < arreglo.length - 1; i++) {
  for (let j = 0; j < arreglo.length - 1 - i; j++) {
    if (arreglo[k][j] > arreglo[k][j + 1]) {

      let aux = arreglo[k][j];
      arreglo[k][j] = arreglo[k][j + 1];
      arreglo[k][j + 1] = aux;
    }
  }
}
}

console.log(arreglo)