//Eliminar elementos duplicados de un arreglo

let arreglo = [10,9,6,3,4,5,6,10,5,5]

let sindupe = []

console.log ("Arreglo con duplicados [" + arreglo+"]")

for(let i= 0; i<10; i++)
{
    for(let j = 1; j<10; j++)
    {
    if(arreglo[i] === arreglo[j] && !sindupe.includes(arreglo[i]))
    {
        sindupe.push(arreglo[i])
    }
    }
}


console.log("Arreglo sin duplicados : " + sindupe)