
    var array = [1,2,3,5,6]


    console.log("Array antes de insertar elemento: ")
    for (i=0; i<5; i++)
    {
        console.log(array[i])
    }

    let elemento = 4
    let posicion = 3
    let aux= 0

    for (i=0; i<5;i++)
    {
        
        if (posicion == i)
        {
            aux = array[i]
            array[i] = elemento
            elemento = aux
            posicion += 1
        }
        
    }
      console.log("Array despues de insertar elemento: ")

      for (i = 0; i<5;i++)
      {
        console.log(array[i])
      }
