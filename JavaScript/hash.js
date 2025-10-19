

function shellsrot(datos) {
    
    let incremento = Math.floor(datos.length / 2)

    while (incremento > 0) {
        
        for (let i = incremento; i < datos.length; i++) {
            let j = i
            let dato = datos[i]

            while (j>=incremento && datos[j-incremento] > dato) {
                datos[j] = datos[j-incremento]
                j -= incremento

            }
            
            datos[j] = dato;
        }

        if (incremento==2) {
            incremento = 1
            
        }else{
            incremento = Math.floor(incremento*5 / 11)
        }

    }
    return datos
}



let primos = [3,34,43,11,15,20,28,45]
console.log (primos)

console.log()

let resultado = shellsrot(primos)
console.log(resultado)