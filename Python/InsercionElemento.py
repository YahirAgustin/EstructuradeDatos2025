
Array = [1,2,3,4,6,7,8]

Elemnto = 9
Posicion = 3
Aux = 0



print("Elementos antes del arreglo : ")
for item in Array:
    print(item)
    
    
for element,item in enumerate(Array):
    
    if element == Posicion :
        Aux = Array[element]
        Array[element] = Elemnto
        Elemnto = Aux
        Posicion += 1
    
    
print ("Arreglo Despues de Insertar Elemento")

for item in Array:
    print(item)