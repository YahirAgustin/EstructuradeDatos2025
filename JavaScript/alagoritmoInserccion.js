
let arreglo = [];
for (let i = 0; i < 10; i++) {
    arreglo[i] = Math.floor(Math.random() * 101);
}

console.log("Arreglo antes de ordenar:");
console.log(arreglo.join(" "));


for (let i = 1; i < arreglo.length; i++) {
    for (let j = i; j > 0; j--) {
        if (arreglo[j] < arreglo[j - 1]) {
            let aux = arreglo[j];
            arreglo[j] = arreglo[j - 1];
            arreglo[j - 1] = aux;
        } else {
            break;
        }
    }
}

console.log("Arreglo ordenado:");
console.log(arreglo.join(" "));
