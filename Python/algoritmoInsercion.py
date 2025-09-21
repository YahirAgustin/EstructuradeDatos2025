import random


arreglo = [random.randint(0, 100) for _ in range(10)]

print("Arreglo antes de ordenar:")
print(arreglo)


for i in range(1, len(arreglo)):
    for j in range(i, 0, -1):
        if arreglo[j] < arreglo[j - 1]:
            arreglo[j], arreglo[j - 1] = arreglo[j - 1], arreglo[j]
        else:
            break 

print("Arreglo ordenado:")
print(arreglo)
