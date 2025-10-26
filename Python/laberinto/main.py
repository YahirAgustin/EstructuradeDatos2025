import pygame
import random

pygame.init()

#Config tablero
TAM_CELDA = 20
TAM_LAB = 25
VIDAS_INICIALES = 3
ANCHO = ALTO = TAM_LAB * TAM_CELDA

#Colores
NEGRO = (0, 0, 0)
BLANCO = (255, 255, 255)
ROJO = (255, 0, 0)
AZUL = (0, 0, 255)
VERDE = (0, 255, 0)
AMARILLO = (255, 255, 0)
MORADO = (200, 0, 200)
GRIS = (40, 40, 40)


#imagenes
img_camino = pygame.transform.scale(pygame.image.load("Img/suelo.png"),(TAM_CELDA,TAM_CELDA))
img_pared = pygame.transform.scale(pygame.image.load("Img/pared.png"),(TAM_CELDA,TAM_CELDA))
img_jugador = pygame.transform.scale(pygame.image.load("Img/jugador.png"),(TAM_CELDA,TAM_CELDA))
img_trampa = pygame.transform.scale(pygame.image.load("Img/trampa.png"),(TAM_CELDA,TAM_CELDA))
img_llave = pygame.transform.scale(pygame.image.load("Img/llave.png"),(TAM_CELDA,TAM_CELDA))
img_salida = pygame.transform.scale(pygame.image.load("Img/salida.png"),(TAM_CELDA,TAM_CELDA))
# Tipo de celdas 
CAMINO = ' '
PARED = '1'
LLAVE = 'L'
TRAMPA = 'T'
PUERTA = 'C'
SALIDA = 'S'

# Ventana
ventana = pygame.display.set_mode((ANCHO, ALTO + 60))
pygame.display.set_caption("Escapa del Laberinto")

#Fuente de mensajes
fuente = pygame.font.Font(None, 28)
fuente_grande = pygame.font.Font(None, 68)

#incializar para no visibilidad
def inicializar_visibilidad():
    return [[False for _ in range(TAM_LAB)] for _ in range(TAM_LAB)]


# Generar el laberinto
def generar_laberinto():
    
    lab = [[CAMINO for _ in range(TAM_LAB)] for _ in range(TAM_LAB)]
    
   
    for y in range(TAM_LAB):
        for x in range(TAM_LAB):
            r = random.random()
            if r < 0.2:
                lab[y][x] = PARED
            elif r < 0.22: 
                lab[y][x] = TRAMPA
            
    coordenadas_libres = [(y, x) for y in range(TAM_LAB) for x in range(TAM_LAB) 
                          if lab[y][x] == CAMINO]
    
   
    num_llaves = min(3, len(coordenadas_libres))
    posiciones_llave = random.sample(coordenadas_libres, num_llaves)
    
    for y, x in posiciones_llave:
        lab[y][x] = LLAVE

    ey, ex = 1, 1 
    
    sy, sx = TAM_LAB - 1, TAM_LAB - 1

    lab[sy][sx] = SALIDA

    vecinos = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
    
   
    for dy, dx in vecinos:
        ny, nx = sy + dy, sx + dx
        
        if 0 <= ny < TAM_LAB and 0 <= nx < TAM_LAB:
          
            if lab[ny][nx] == PARED:
                lab[ny][nx] = CAMINO
                
    for dy, dx in vecinos:
        ny, nx = ey + dy, ex + dx
        
        if 0 <= ny < TAM_LAB and 0 <= nx < TAM_LAB:
            if lab[ny][nx] == PARED:
                lab[ny][nx] = CAMINO

    return lab

# Imprimir tablero
def dibujar_laberinto(lab, jugador, visitadas):
    
    for y in range(TAM_LAB):
        for x in range(TAM_LAB):
            celda = lab[y][x]
            pos = (x*TAM_CELDA,y*TAM_CELDA+60)
            if not visitadas[y][x]:
                pygame.draw.rect(ventana, NEGRO, (x*TAM_CELDA, y*TAM_CELDA + 60, TAM_CELDA, TAM_CELDA))
                continue  # Saltar dibujo de celda real si no ha sido visitada
            color = BLANCO
            
            if celda == PARED:
                color = NEGRO
                ventana.blit(img_pared,pos)
            
            elif celda == LLAVE:
                color = AMARILLO
                ventana.blit(img_llave,pos)
            
            elif celda == TRAMPA:
                color = ROJO
                ventana.blit(img_trampa,pos)
            
            elif celda == PUERTA:
                color = AZUL
                pygame.draw.rect(ventana, color, (x * TAM_CELDA, y * TAM_CELDA + 60, TAM_CELDA, TAM_CELDA))
            
            elif celda == SALIDA:
                color = VERDE
                ventana.blit(img_salida,pos)
            
            else:
                ventana.blit(img_camino,pos)    
           
            
    pos_jugador = (jugador[0] * TAM_CELDA, jugador[1] * TAM_CELDA + 60)
    ventana.blit(img_jugador, pos_jugador)

# Mostrar texto
def mostrar_texto(texto, x, y, color=BLANCO, fuente_usar=fuente):
    
    superficie = fuente_usar.render(texto, True, color)
    ventana.blit(superficie, (x, y))

# Pantalla final de ganar o perder
def pantalla_final(mensaje, color, puntuacion):
    
    ejecutando = True
    while ejecutando:
        ventana.fill(NEGRO)
        mostrar_texto(mensaje, ANCHO // 2 - 200, ALTO // 2 - 60, color, fuente_grande)
        mostrar_texto(f"Tu puntuacion final: {puntuacion} puntos", ANCHO // 2 - 170, ALTO // 2 - 10, BLANCO)
        mostrar_texto("      Presiona R para reiniciar o Q para salir", ANCHO // 2 - 200, ALTO // 2 + 10, BLANCO)
        pygame.display.flip()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_q:
                    pygame.quit()
                    exit()
                elif event.key == pygame.K_r:
                    main()  
                    return

#main
def main():
    
    vidas = VIDAS_INICIALES
    llaves = 0
    puntuacion = 0

    jugador = [1, 1]
    lab = generar_laberinto()
    visitadas = inicializar_visibilidad()
    visitadas[jugador[1]][jugador[0]] = True  # Marca la posición inicial como visible

    clock = pygame.time.Clock()
    mensaje = "Usa las flechitas "

    ejecutando = True
    while ejecutando:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                ejecutando = False
            elif event.type == pygame.KEYDOWN:
                dx, dy = 0, 0
                if event.key == pygame.K_UP:
                    dy = -1
                elif event.key == pygame.K_DOWN:
                    dy = 1
                elif event.key == pygame.K_LEFT:
                    dx = -1
                elif event.key == pygame.K_RIGHT:
                    dx = 1

                nuevo_x = jugador[0] + dx
                nuevo_y = jugador[1] + dy

                if 0 <= nuevo_x < TAM_LAB and 0 <= nuevo_y < TAM_LAB:
                    celda = lab[nuevo_y][nuevo_x]
                    if celda == PARED:
                        mensaje = "Hay una pared!"
                        continue
                    elif celda == TRAMPA:
                        vidas -= 1
                        if puntuacion > 0:
                            puntuacion -= 20
                        else:
                            puntuacion = 0;    
                        mensaje = "¡Caiste en una trampa!"
                        if vidas == 0:
                            pantalla_final("  ¡HAS PERDIDO!", ROJO, puntuacion)

                            return
                    elif celda == LLAVE:
                        llaves += 1
                        puntuacion += 50
                        lab[nuevo_y][nuevo_x] = CAMINO
                        mensaje = "Encontraste una llave!"
                    elif celda == PUERTA:
                        if llaves > 0:
                            llaves -= 1
                            lab[nuevo_y][nuevo_x] = CAMINO
                            mensaje = "Abriste una puerta!"
                        else:
                            mensaje = "Necesitas una llave!"
                            continue
                    elif celda == SALIDA:
                        if llaves == 3:
                            puntuacion += 200
                            pantalla_final("     ¡GANASTE!", VERDE, puntuacion)
                            return
                    else:
                        mensaje = ""
                    jugador = [nuevo_x, nuevo_y]
                    # Marcar la nueva celda y las adyacentes como visibles
                    for dy in [-1, 0, 1]:
                        for dx in [-1, 0, 1]:
                            ny, nx = nuevo_y + dy, nuevo_x + dx
                            if 0 <= ny < TAM_LAB and 0 <= nx < TAM_LAB:
                                visitadas[ny][nx] = True


        ventana.fill(GRIS)
        mostrar_texto(f"Vidas: {vidas}", 20, 20, ROJO)
        mostrar_texto(f"Llaves: {llaves}", 150, 20, AMARILLO)
        mostrar_texto(f"Puntos: {puntuacion}", 300, 20, VERDE)
        mostrar_texto(mensaje, 275, 20, BLANCO)
        dibujar_laberinto(lab, jugador, visitadas)
        pygame.display.flip()
        clock.tick(10)

    pygame.quit()

if __name__ == "__main__":
    main()
