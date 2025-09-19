
let arreglo = [];
for (let i = 0; i < 10; i++) {
  arreglo.push(Math.floor(Math.random() * 101));
}

console.log("Arreglo antes de ordenar:");
console.log(arreglo.join(" "));


for (let i = 0; i < arreglo.length - 1; i++) {
  for (let j = 0; j < arreglo.length - 1 - i; j++) {
    if (arreglo[j] > arreglo[j + 1]) {

      let aux = arreglo[j];
      arreglo[j] = arreglo[j + 1];
      arreglo[j + 1] = aux;
    }
  }
}

console.log("Arreglo ordenado:");
console.log(arreglo.join(" "));
