//Colas en JS

class Queue {
    constructor(){
        this.queue = [];
    }
    enqueue(element){
        this.queue.push(element);
    }
}

//Anadir nuevo Elemento

const resultado = new Queue();

//Anadir Elementos

resultado.enqueue(5);
resultado.enqueue(4);
resultado.enqueue(5);
resultado.enqueue(7);

console.log ("DESPUES DE A;ADIR ELEMENTOS ",resultado.queue); 

