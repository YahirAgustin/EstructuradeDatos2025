class Pila:
    def __init__(self):
        # La lista que almacena los elementos.
        # Por convención, el guion bajo (_) indica que es una propiedad interna/privada.
        self._elementos = []

    def push(self, elemento):
        """Añade un elemento a la parte superior de la pila."""
        self._elementos.append(elemento)

    def pop(self):
        """
        Elimina y devuelve el elemento de la parte superior de la pila.
        Devuelve None si la pila está vacía.
        """
        if not self.esta_vacia():
            return self._elementos.pop()
        return None

    def esta_vacia(self):
        """Verifica si la pila no contiene elementos."""
        return len(self._elementos) == 0

    def peek(self):
        """Devuelve el elemento superior sin eliminarlo.
        Devuelve None si la pila está vacía.
        """
        if not self.esta_vacia():
            return self._elementos[-1]
        return None


# Crea una instancia de la Pila
mi_pila = Pila()

# Agrega elementos a la pila usando el método push()
mi_pila.push("manzana")
mi_pila.push("banana")
mi_pila.push("cereza")

print(f"La pila no está vacía: {not mi_pila.esta_vacia()}")

# Mira el elemento superior sin eliminarlo
print(f"Elemento superior (peek): {mi_pila.peek()}")

# Elimina elementos de la pila usando el método pop()
elemento_eliminado = mi_pila.pop()
print(f"Elemento eliminado (pop): {elemento_eliminado}")

# La pila ahora solo tiene dos elementos
print(f"Elemento superior después de pop: {mi_pila.peek()}")

# Intenta acceder a la implementación directamente (esto no es recomendado)
# print(mi_pila._elementos)
