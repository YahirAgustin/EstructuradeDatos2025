function seleccion() {
    let arreglo = new Array(10);
    let minimo, aux, posmin;

    // Llenado con números aleatorios entre 0 y 100
    for (let i = 0; i < arreglo.length; i++) {
        arreglo[i] = Math.floor(Math.random() * 101);
    }

    console.log("Arreglo antes de ordenar:");
    console.log(arreglo.join(" "));

    // Algoritmo de selección
    for (let i = 0; i < arreglo.length; i++) {
        minimo = arreglo[i];
        posmin = i;

        for (let j = i + 1; j < arreglo.length; j++) {
            if (arreglo[j] < minimo) {
                minimo = arreglo[j];
                posmin = j;
            }
        }

        aux = arreglo[i];
        arreglo[i] = arreglo[posmin];
        arreglo[posmin] = aux;
    }

    console.log("Arreglo ordenado:");
    console.log(arreglo.join(" "));
}

seleccion();
