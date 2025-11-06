// ==========================================================
// ALGORITMOS DE ORDENAMIENTO (Corregidos para ejecución directa)
// ==========================================================

// --- 1. Bubble Sort ---
function ordenamientoBurbuja(arreglo) {
    for (let i = 0; i < arreglo.length - 1; i++) {
        for (let j = 0; j < arreglo.length - 1 - i; j++) {
            if (arreglo[j] > arreglo[j + 1]) {
                let aux = arreglo[j];
                arreglo[j] = arreglo[j + 1];
                arreglo[j + 1] = aux;
            }
        }
    }
}

// --- 2. Insertion Sort ---
function ordenamientoInserccion(arreglo) {
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
}

// --- 3. Shell Sort (Tu 'ordenamientoHash' es en realidad Shell Sort) ---
function ordenamientoShell(arreglo) {
    let incremento = Math.floor(arreglo.length / 2);

    while (incremento > 0) {
        for (let i = incremento; i < arreglo.length; i++) {
            let j = i;
            let dato = arreglo[i];

            while (j >= incremento && arreglo[j - incremento] > dato) {
                arreglo[j] = arreglo[j - incremento];
                j -= incremento;
            }
            arreglo[j] = dato;
        }

        if (incremento == 2) {
            incremento = 1;
        } else {
            incremento = Math.floor(incremento * 5 / 11);
        }
    }
}

// --- 4. Heap Sort (Lógica interna expuesta para ejecución) ---
// Funciones auxiliares para Heap
function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function ordenamientoHeap(arr) {
    let n = arr.length;

    // Construir el Max-Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extraer elementos uno por uno
    for (let i = n - 1; i >= 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Mover la raíz actual al final
        heapify(arr, i, 0); // Llamar a heapify en el heap reducido
    }
}

// --- 5. Merge Sort (Modificado para funcionar in-place o con copia, y ejecutarse) ---
function merge(arr1, arr2) {
    let result = [];
    let i = 0, j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i += 1;
        } else {
            result.push(arr2[j]);
            j += 1;
        }
    }
    // Añadir elementos restantes
    while (i < arr1.length) {
        result.push(arr1[i++]);
    }
    while (j < arr2.length) {
        result.push(arr2[j++]);
    }

    return result;
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let arr1 = mergeSort(arr.slice(0, middle));
        let arr2 = mergeSort(arr.slice(middle));
        return merge(arr1, arr2);
    }
}

function ordenamientoMerge(arreglo) {
    // Merge Sort devuelve un nuevo arreglo, por lo que copiamos el resultado al original
    const resultado = mergeSort(arreglo);
    
    // Remplazar el contenido del arreglo original con el resultado ordenado
    arreglo.splice(0, arreglo.length, ...resultado); 
}


// --- 6. Radix Sort (Lógica interna expuesta para ejecución) ---
function getDigit(num, digit) {
    return Math.floor(Math.abs(num) / Math.pow(10, digit)) % 10;
}

function maxDigits(nums) {
    let max = 0;
    // Manejar arreglos vacíos para evitar errores
    if (nums.length === 0) return 0;

    for (let i = 0; i < nums.length; i++) {
        // Asegurarse de que `nums[i]` sea un número válido antes de llamar a `toString()`
        if (typeof nums[i] === 'number' && !isNaN(nums[i])) {
            max = Math.max(max, nums[i].toString().length);
        }
    }
    return max;
}

function ordenamientoRadix(array) {
    // Si el array está vacío o no es un array, no hacer nada.
    if (!Array.isArray(array) || array.length === 0) return;

    const max = maxDigits(array);
    for (let k = 0; k < max; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => []);

        for (let i = 0; i < array.length; i++) {
            let digit = getDigit(array[i], k);
            digitBuckets[digit].push(array[i]);
        }
        // Reconstruir el arreglo
        array.splice(0, array.length, ...[].concat(...digitBuckets));
    }
}


// --- 7. Quick Sort (Lógica interna expuesta para ejecución) ---
function particion(arreglo, low, high) {
    let pivot_value = arreglo[high];
    let i = low;

    for (let j = low; j < high; j++) {
        if (arreglo[j] <= pivot_value) {
            [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]];
            i++;
        }
    }
    [arreglo[i], arreglo[high]] = [arreglo[high], arreglo[i]];
    return i;
}

function quickSort_recursive(arreglo, low, high) {
    if (low < high) {
        let pivot_index = particion(arreglo, low, high);
        quickSort_recursive(arreglo, low, pivot_index - 1);
        quickSort_recursive(arreglo, pivot_index + 1, high);
    }
}

function ordenamientoQuick(arreglo) {
    // Solo si el arreglo tiene más de un elemento
    if (arreglo.length > 1) { 
        quickSort_recursive(arreglo, 0, arreglo.length - 1);
    }
}


// ==========================================================
// 1. REGISTRO DE ALGORITMOS (Sin el nativo de JS)
// ==========================================================

const ALGORITMOS = {
    'Burbuja': ordenamientoBurbuja,
    'Insercción': ordenamientoInserccion,
    'Shell': ordenamientoShell,
    'Heap': ordenamientoHeap,
    'Merge': ordenamientoMerge,
    'Radix': ordenamientoRadix,
    'Quick': ordenamientoQuick
};

// ==========================================================
// 2. FUNCIONES DE GENERACIÓN DE DATOS
// ==========================================================

function generarArregloAleatorio(tamaño) {
    return Array.from({ length: tamaño }, () => Math.floor(Math.random() * (tamaño * 10)) + 1);
}

function generarArregloOrdenado(tamaño) {
    return Array.from({ length: tamaño }, (_, i) => i + 1);
}

function generarArregloInverso(tamaño) {
    return Array.from({ length: tamaño }, (_, i) => tamaño - i);
}

function generarArregloSemiOrdenado(tamaño) {
    let arr = generarArregloOrdenado(tamaño);
    const swaps = Math.floor(tamaño * 0.05);
    for (let k = 0; k < swaps; k++) {
        const i = Math.floor(Math.random() * tamaño);
        const j = Math.floor(Math.random() * tamaño);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const GENERADORES = {
    'aleatorio': generarArregloAleatorio,
    'ordenado': generarArregloOrdenado,
    'inverso': generarArregloInverso,
    'semiordenado': generarArregloSemiOrdenado
};

// ==========================================================
// 3. FUNCIÓN DE MEDICIÓN DE TIEMPO
// ==========================================================

function medirTiempo(algoritmo, datos) {
    const arregloCopia = datos.slice();
    
    const t0 = performance.now();
    
    try {
        algoritmo(arregloCopia);
    } catch (e) {
        console.error(`Error en algoritmo ${algoritmo.name}: ${e}`);
        return -1;
    }

    const t1 = performance.now();
    return t1 - t0;
}

// ==========================================================
// 4. ORQUESTACIÓN Y LÓGICA DEL DOM
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM
    const btnIniciar = document.getElementById('iniciar-pruebas');
    const controlesTamano = document.getElementById('select-tamano');
    const controlesCaso = document.getElementById('select-caso');
    const resultadosContainer = document.getElementById('resultado-unico-container');
    const mensajeCarga = document.getElementById('mensaje-carga');

    // Inicializar el estado de la prueba (con el elemento activo por defecto)
    let tamanoSeleccionado = document.querySelector('#select-tamano .btn-opcion.active').getAttribute('data-tamano');
    let casoSeleccionado = document.querySelector('#select-caso .btn-opcion.active').getAttribute('data-caso');

    // --- MANEJO DE SELECCIÓN DE BOTONES ---
    function manejarSeleccion(target, tipo) {
        const grupo = target.parentElement;
        Array.from(grupo.children).forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        if (tipo === 'tamano') {
            tamanoSeleccionado = target.getAttribute('data-tamano');
        } else if (tipo === 'caso') {
            casoSeleccionado = target.getAttribute('data-caso');
        }
    }

    // Agregar listeners a los grupos de botones
    controlesTamano.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-opcion')) {
            manejarSeleccion(e.target, 'tamano');
        }
    });

    controlesCaso.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-opcion')) {
            manejarSeleccion(e.target, 'caso');
        }
    });

    // --- FUNCIÓN PRINCIPAL DE EJECUCIÓN ---

    btnIniciar.addEventListener('click', async () => {
        // 1. Mostrar mensaje de carga y deshabilitar botón
        mensajeCarga.style.display = 'block';
        btnIniciar.disabled = true;
        resultadosContainer.innerHTML = '';
        
        // Pequeño retraso para permitir la actualización del DOM
        await new Promise(resolve => setTimeout(resolve, 10)); 

        const N = parseInt(tamanoSeleccionado);
        const caso = casoSeleccionado;
        
        // 2. Generar el arreglo
        const generador = GENERADORES[caso];
        const datosPrueba = generador(N);
        
        const resultados = [];

        // 3. Iterar y medir cada algoritmo
        for (const [nombre, algoritmo] of Object.entries(ALGORITMOS)) {
            const tiempo = medirTiempo(algoritmo, datosPrueba);
            
            resultados.push({
                nombre: nombre,
                tiempo: tiempo
            });
        }

        // 4. Clasificar resultados: del más rápido (menor tiempo) al más lento
        // Filtrar errores antes de clasificar
        const resultadosValidos = resultados.filter(r => r.tiempo >= 0);
        resultadosValidos.sort((a, b) => a.tiempo - b.tiempo);

        // 5. Generar y mostrar la tabla de clasificación
        const htmlTabla = generarHTMLClasificacion(N, caso, resultadosValidos);
        resultadosContainer.innerHTML = htmlTabla;

        // 6. Ocultar carga y habilitar botón
        mensajeCarga.style.display = 'none';
        btnIniciar.disabled = false;
    });

    // --- FUNCIÓN DE GENERACIÓN DE HTML ---

    function generarHTMLClasificacion(N, caso, resultadosClasificados) {
        let tablaHTML = `
            <div class="caso-prueba">
                <h4>Datos del Arreglo: ${N.toLocaleString()}   |   Orden : ${caso.charAt(0).toUpperCase() + caso.slice(1)}</h4>
                <table class="tabla-clasificacion">
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Algoritmo</th>
                            <th>Tiempo (ms)</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        resultadosClasificados.forEach((res, index) => {
            const esGanador = index === 0 ? 'primer-lugar' : '';
            const posicion = index === 0 ? '1°' : 
                             index === 1 ? '2°' : 
                             index === 2 ? '3°' : 
                             `${index + 1}°`;
            
            // Ajuste para el formato de tiempo: evitar notación científica para pequeños valores
            let tiempoStr;
            if (res.tiempo < 0.001 && res.tiempo >= 0) { // Si es menor a 0.001 ms pero no negativo
                tiempoStr = '0.00'; // Similar a lo que se ve en la imagen para valores muy pequeños
            } else if (res.tiempo >= 0) {
                tiempoStr = res.tiempo.toFixed(2); // Formato con 2 decimales para valores mayores
            } else {
                tiempoStr = 'Error'; // Si el tiempo es negativo (indicando un error)
            }
                              
            tablaHTML += `
                <tr class="${esGanador}">
                    <td>${posicion}</td>
                    <td>${res.nombre}</td>
                    <td>${tiempoStr}</td>
                </tr>
            `;
        });

        tablaHTML += `
                    </tbody>
                </table>
            </div>
        `;
        return tablaHTML;
    }
});