import random


arreglo = [random.randint(0, 100) for _ in range(10)]

print("Arreglo antes de ordenar:")
print(" ".join(map(str, arreglo)))

for i in range(len(arreglo) - 1):
    for j in range(len(arreglo) - 1 - i):
        if arreglo[j] > arreglo[j + 1]:
            # Intercambiar valores
            arreglo[j], arreglo[j + 1] = arreglo[j + 1], arreglo[j]

print("Arreglo ordenado:")
print(" ".join(map(str, arreglo)))
