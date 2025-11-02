

function radixSort(array) {
       
        const maxNum = Math.max(...array)
        let digit = 0
        while (maxNum / (10**digit) > 0)
        {
            helper(array,digit)
            digit++
        }

        return array
}


function helper(array,digit)
{
    let countArray = new Array(10).fill(0)
    let sortArray = new Array(array.length).fill(0)

    let whichDigit = 10 ** digit
    for(let num of array)
    {
        const countIndex = Math.floor(num/whichDigit)%10
        countArray[countIndex]++
    }

    for(let i=1; i<countArray.length; i++ )
    {
        countArray[i] += countArray[i-1]
    }

    for(let i = array.length-1; i>=0; i--)
    {
        const countIndex = Math.floor(array[i]/whichDigit)%10
        countArray[countIndex]--
        const sortIndex = countArray[countIndex]
        sortArray[sortIndex] = array[i]

    }

    for(let i= 0; i<array.length; i++)
    {
        array[i] = sortArray[i]
    }

    return array;
}

list = [1,4,5,90,23,43,65,23,12,78]

console.log("Ordenado :", radixSort(list))