function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Si el hijo izquierdo es mayor que la raíz
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // Si el hijo derecho es mayor que el mayor actual
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // Si el mayor no es la raíz
    if (largest != i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapsort(arr) {
    let n = arr.length;


    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    
    for (let i = n - 1; i >= 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
}

let lista = [12, 11, 13, 5, 6, 7];

console.log("Elementos antes de ordenar:", lista);
heapsort(lista);
console.log("Elementos después de ordenar:", lista);
