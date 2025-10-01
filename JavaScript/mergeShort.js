

function merge ( arr1,arr2 )
{
    let result = []
    let i = 0 ,j = 0

    while ( i < arr1.length && j < arr2.length)
    {
        if(arr1[i] < arr2[j])
        {
            result.push(arr1[i])
                i+=1
        }else
        {
            result.push(arr2[j]) // introduccir en la ultima posicion del arreglo 
            j+=1
        }
    }

    if ( i == arr1.length)
    {
        for(let k = j; k< arr2.length ; k++)
        {
            result.push (arr2[k])
        }
    }

    if(j == arr2.length)
    {
        for(let k = i; k< arr1.length ; k++)
        {
            result.push (arr1[k])
        }
    }

    return result
    
}

function mergeSort(arr)
{
    if(arr.length < 2)
    {
        return arr 
    }else
    {
        let middle = Math.floor(arr.length/2)
        let arr1 = mergeSort( arr.slice(0,middle)) // de inicio a mitad
        let arr2 = mergeSort(arr.slice(middle))
        return merge(arr1,arr2)
    }
}

let arr = [];

for(let i = 0 ; i<10 ; i ++)
{
    arr.push( Math.floor(Math.random()*101)) //Crear numero aleatorios
}

console.log(mergeSort(arr))
