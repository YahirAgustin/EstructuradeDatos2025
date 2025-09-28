function quickSort(arreglo,  lenght)
{} 
function quickSort_recursive(arreglo,low,high)
{}
function particion(arreglo,high,low)
{}



function quickSort(arreglo,lenght)
{
    quickSort_recursive(arreglo,0,lenght-1)
}
function quickSort_recursive(arreglo,low  ,high)
{
    if( low < high)
    {
        let pivot_index = particion(arreglo,low,high)
        quickSort_recursive(arreglo,low,pivot_index-1)
        quickSort_recursive(arreglo,pivot_index + 1,high)
    }
}

function particion(arreglo,low,high)
{
    let pivot_value = arreglo[high]
    let i = low

    for (let j = low; j <high; j++ )
    {
        if (arreglo[j] <=pivot_value)
        {
            [arreglo[i],arreglo[j]]= [arreglo[j],arreglo[i]]
            i++
        }
    }
     [arreglo[i],arreglo[high]] = [arreglo[high],arreglo[i]]
     return i
}

function main()
{
    let a = [10,11,23,44,8,15,3,9,12,45,56,45,45]
    let lenght =  13

    quickSort (a,lenght)

    console.log(a)

}