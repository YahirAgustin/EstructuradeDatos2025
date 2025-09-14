

var array = [1,2,3,4,6,7,8]
var encontrado = false

var toSearch = 2

for (i=0; i<5; i++ )
{

    if (array[i] == toSearch )
    {
            encontrado = true
    }

}

if (encontrado == true){
    console.log("Elemento Encontrado")
}else{
     console.log("Elemento No Encontrado")
}
