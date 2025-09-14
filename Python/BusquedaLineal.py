

#Busqueda Lineal En Un Arrwglo
# Linear Search in Array

Array = [1,2,3,4,6,7,8] #Array
Busqueda = 6 #Element to search in  Array
find = False


for element in Array:
    
    if element == Busqueda:
        find = True
        
if find == True:
    print("Elemento Encontrado")
else :

     print("Elemento No Encontrado")
