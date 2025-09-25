import random

def seleccion():
    arreglo = [random.randint(0, 100) for _ in range(10)]
    
    print("Arreglo antes de ordenar:")
    print(" ".join(map(str, arreglo)))

    # Algoritmo de selección
    for i in range(len(arreglo)):
        minimo = arreglo[i]
        posmin = i

        for j in range(i + 1, len(arreglo)):
            if arreglo[j] < minimo:
                minimo = arreglo[j]
                posmin = j

        aux = arreglo[i]
        arreglo[i] = arreglo[posmin]
        arreglo[posmin] = aux

    print("Arreglo ordenado:")
    print(" ".join(map(str, arreglo)))


seleccion()
