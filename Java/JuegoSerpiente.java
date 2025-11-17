import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList; 
import java.util.Collections; 
import java.util.Random;


public class JuegoSerpiente {

    public static void main(String[] args) {
        JFrame frame = new JFrame("Juego de la Serpiente (Lista Enlazada)");
        PanelJuego panelJuego = new PanelJuego(); 
        
        frame.add(panelJuego);
        frame.setTitle("Snake en Java");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setResizable(false);
        frame.pack(); 
        frame.setLocationRelativeTo(null); 
        frame.setVisible(true);
        
        panelJuego.requestFocusInWindow();
    }

   
    static class Puntuacion implements Comparable<Puntuacion> {
        String nombre;
        int nivel;
        int puntos;

        public Puntuacion(String nombre, int nivel, int puntos) {
            this.nombre = nombre;
            this.nivel = nivel;
            this.puntos = puntos;
        }

        @Override
        public int compareTo(Puntuacion otra) {

            if (this.nivel != otra.nivel) {
                return otra.nivel - this.nivel; 
            }
      
            return otra.puntos - this.puntos;
        }

        @Override
        public String toString() {
            return String.format("%s (Nivel %d, Puntos %d)", nombre, nivel, puntos);
        }
    }
}


class NodoSerpiente {
    public int x;
    public int y;
    public NodoSerpiente siguiente;

    public NodoSerpiente(int x, int y) {
        this.x = x;
        this.y = y;
        this.siguiente = null;
    }
}


class PanelJuego extends JPanel implements ActionListener, KeyListener {


    private final int TAMAÑO_UNIDAD = 25;
    private final int UNIDADES_ANCHO = 30; 
    private final int UNIDADES_ALTO = 30;  
    private final int ANCHO_PANTALLA = TAMAÑO_UNIDAD * UNIDADES_ANCHO;
    private final int ALTO_PANTALLA = TAMAÑO_UNIDAD * UNIDADES_ALTO;  
    private final int MAX_MANZANAS = 15;
    private final int VELOCIDAD_BASE = 150;
    

    private int contadorManzanasGeneradas = 0; 
    private final int TRAMPAS_POR_MANZANAS = 1; 


    private String nombreJugador;
   
    private static ArrayList<JuegoSerpiente.Puntuacion> ranking = new ArrayList<>(); 
    private final int MAX_RANKING = 5;

    // --- Estado del Juego ---
    private NodoSerpiente cabeza;
    private Point manzana;
    private ArrayList<Point> trampas; 
    private Timer timer;
    private Random random;

    // --- Puntuación y Nivel ---
    private int puntos = 0; 
    private int nivel = 1;
    private int manzanasRecogidasNivel = 0;
    private int velocidadActual;

    // --- Movimiento y Control ---
    private int dirX = TAMAÑO_UNIDAD;
    private int dirY = 0;
    private boolean juegoCorriendo = false;
    private boolean esperandoInput = false;

    public PanelJuego() {
        random = new Random();
        this.setPreferredSize(new Dimension(ANCHO_PANTALLA, ALTO_PANTALLA));
        this.setBackground(Color.BLACK);
        this.setFocusable(true);
        this.addKeyListener(this);
        pedirNombre(); 
    }
    
    
    private void pedirNombre() {
        nombreJugador = JOptionPane.showInputDialog(this, 
            "¡Bienvenido a Snake!\nIntroduce tu nombre:", 
            "Inicio de Partida", 
            JOptionPane.PLAIN_MESSAGE);

        if (nombreJugador == null || nombreJugador.trim().isEmpty()) {
            nombreJugador = "Jugador";
        }
        
        iniciarJuego();
    }

    private void iniciarJuego() {

        puntos = 0;
        nivel = 1;
        manzanasRecogidasNivel = 0;
        trampas = new ArrayList<>();
        contadorManzanasGeneradas = 0;

        inicializarSerpiente();
        generarNuevaManzana();
        generarNuevaTrampa(); 
        
        velocidadActual = VELOCIDAD_BASE;
        if (timer != null) {
            timer.stop();
        }
        timer = new Timer(velocidadActual, this);
        timer.start();
        juegoCorriendo = true;
    }
    
    private void inicializarSerpiente() {
        dirX = TAMAÑO_UNIDAD;
        dirY = 0;
        
        int startX = TAMAÑO_UNIDAD * 10;
        int startY = TAMAÑO_UNIDAD * 10;
        
        cabeza = new NodoSerpiente(startX, startY);
        NodoSerpiente actual = cabeza;

        for (int i = 1; i < 5; i++) {
            actual.siguiente = new NodoSerpiente(startX - TAMAÑO_UNIDAD * i, startY);
            actual = actual.siguiente;
        }
    }

   
    private void mover() {
    
        int nuevaX = cabeza.x + dirX;
        int nuevaY = cabeza.y + dirY;

   
        NodoSerpiente nuevaCabeza = new NodoSerpiente(nuevaX, nuevaY);
        nuevaCabeza.siguiente = cabeza;
        cabeza = nuevaCabeza;
        
        boolean crecio = (cabeza.x == manzana.x && cabeza.y == manzana.y);
        
     
        Point trampaColisionada = null;
        for (Point t : trampas) {
            if (cabeza.x == t.x && cabeza.y == t.y) {
                trampaColisionada = t;
                break;
            }
        }

        if (!crecio) {
          
            if (cabeza.siguiente != null) {
                NodoSerpiente actual = cabeza;
                while (actual.siguiente != null && actual.siguiente.siguiente != null) {
                    actual = actual.siguiente;
                }
                actual.siguiente = null; 
            }
        } else {
     
            puntos += 10;
            manzanasRecogidasNivel++;
            generarNuevaManzana(); 
        }


        if (trampaColisionada != null) {
            puntos = Math.max(0, puntos - 5); 
            
            trampas.remove(trampaColisionada); 
            
            if (!eliminarSegmento()) {
                juegoCorriendo = false;
            }
        }
        
        esperandoInput = false;
        checarColisiones(); 
        checarSubidaDeNivel();
    }
    
    private boolean eliminarSegmento() {
  
        if (cabeza.siguiente == null) {
            return false; 
        }
        
        NodoSerpiente actual = cabeza;
        while (actual.siguiente != null && actual.siguiente.siguiente != null) {
            actual = actual.siguiente;
        }
        actual.siguiente = null; 
        return true; 
    }

    private void checarColisiones() {
       
        NodoSerpiente actual = cabeza.siguiente;
        while (actual != null) {
            if (cabeza.x == actual.x && cabeza.y == actual.y) {
                juegoCorriendo = false;
            }
            actual = actual.siguiente;
        }

        if (cabeza.x < 0 || cabeza.x >= ANCHO_PANTALLA || cabeza.y < 0 || cabeza.y >= ALTO_PANTALLA) {
            juegoCorriendo = false;
        }

        if (!juegoCorriendo) {
            timer.stop();
            actualizarRanking(); 
        }
    }

    private void checarSubidaDeNivel() {
        if (manzanasRecogidasNivel >= MAX_MANZANAS) {
            nivel++;
            manzanasRecogidasNivel = 0;
            
            trampas.clear(); 
            contadorManzanasGeneradas = 0; 
            inicializarSerpiente(); 
            generarNuevaManzana(); 
            generarNuevaTrampa(); 

            velocidadActual = Math.max(50, velocidadActual - 20);
            
            timer.stop();
            timer = new Timer(velocidadActual, this);
            timer.start();
        }
    }

    private void actualizarRanking() {
      
        ranking.add(new JuegoSerpiente.Puntuacion(nombreJugador, nivel, puntos));
        
       
        Collections.sort(ranking);
        
        
        while (ranking.size() > MAX_RANKING) {
            ranking.remove(ranking.size() - 1);
        }
    }

    

    private Point generarCoordenadasAleatorias() {
        int x = random.nextInt(UNIDADES_ANCHO) * TAMAÑO_UNIDAD;
        int y = random.nextInt(UNIDADES_ALTO) * TAMAÑO_UNIDAD;
        return new Point(x, y);
    }
    
    private void generarNuevaManzana() {
        Point nuevaPos;
        do {
            nuevaPos = generarCoordenadasAleatorias();
        } while (estaEnSerpiente(nuevaPos) || estaEnTrampa(nuevaPos)); 
        manzana = nuevaPos;
        
        contadorManzanasGeneradas++;
        if (contadorManzanasGeneradas >= TRAMPAS_POR_MANZANAS) { 
            generarNuevaTrampa();
            contadorManzanasGeneradas = 0;
        }
    }

    private void generarNuevaTrampa() {
        Point nuevaPos;
        do {
            nuevaPos = generarCoordenadasAleatorias();
        } while (estaEnSerpiente(nuevaPos) || nuevaPos.equals(manzana) || estaEnTrampa(nuevaPos)); 
        trampas.add(nuevaPos); 
    }
    
    private boolean estaEnSerpiente(Point p) {
      
        NodoSerpiente actual = cabeza;
        while (actual != null) {
            if (actual.x == p.x && actual.y == p.y) {
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    private boolean estaEnTrampa(Point p) {
        
        for (Point t : trampas) {
            if (t.x == p.x && t.y == p.y) {
                return true;
            }
        }
        return false;
    }

   

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        dibujar(g);
    }

    public void dibujar(Graphics g) {
        if (juegoCorriendo) {
            g.setColor(Color.RED);
            g.fillOval(manzana.x, manzana.y, TAMAÑO_UNIDAD, TAMAÑO_UNIDAD);

            g.setColor(Color.DARK_GRAY);
            for (Point t : trampas) {
                g.fillRect(t.x, t.y, TAMAÑO_UNIDAD, TAMAÑO_UNIDAD);
            }

            NodoSerpiente actual = cabeza;
            boolean esCabeza = true;
            while (actual != null) {
                if (esCabeza) {
                    g.setColor(new Color(45, 180, 0));
                    esCabeza = false;
                } else {
                    g.setColor(Color.GREEN);
                }
                g.fillRect(actual.x, actual.y, TAMAÑO_UNIDAD, TAMAÑO_UNIDAD);
                actual = actual.siguiente;
            }

           
            g.setColor(Color.WHITE);
            g.setFont(new Font("Monospaced", Font.BOLD, 20));
            FontMetrics metrics = getFontMetrics(g.getFont());
            String info = "Jugador: " + nombreJugador + " | Puntos: " + puntos + " | Nivel: " + nivel + " | Manzanas: " + manzanasRecogidasNivel + "/" + MAX_MANZANAS;
            g.drawString(info, (ANCHO_PANTALLA - metrics.stringWidth(info)) / 2, g.getFont().getSize());
        } else {
            gameOver(g);
        }
    }

    private void gameOver(Graphics g) {
  
        g.setColor(Color.RED);
        g.setFont(new Font("Monospaced", Font.BOLD, 75));
        FontMetrics metricsGO = getFontMetrics(g.getFont());
        String goText = "GAME OVER";
        g.drawString(goText, (ANCHO_PANTALLA - metricsGO.stringWidth(goText)) / 2, ALTO_PANTALLA / 2 - 150);

      
        g.setColor(Color.WHITE);
        g.setFont(new Font("Monospaced", Font.BOLD, 30));
        String scoreText = String.format("Tu Puntuacion Final: Nivel %d | Puntos %d", nivel, puntos);
        FontMetrics metricsScore = getFontMetrics(g.getFont());
        g.drawString(scoreText, (ANCHO_PANTALLA - metricsScore.stringWidth(scoreText)) / 2, ALTO_PANTALLA / 2 - 80);
        
       
        g.setColor(Color.YELLOW);
        g.setFont(new Font("Monospaced", Font.BOLD, 25));
        g.drawString("--- RANKING TOP 5 ---", (ANCHO_PANTALLA / 2) - 150, ALTO_PANTALLA / 2);
        
        g.setColor(Color.CYAN);
        g.setFont(new Font("Monospaced", Font.PLAIN, 20));
        int yOffset = ALTO_PANTALLA / 2 + 30;
        
        for (int i = 0; i < ranking.size(); i++) {
            JuegoSerpiente.Puntuacion p = ranking.get(i);
            String rankEntry = String.format("%d. %s - N%d | P%d", i + 1, p.nombre, p.nivel, p.puntos);
            g.drawString(rankEntry, (ANCHO_PANTALLA / 2) - 150, yOffset + (i * 25));
        }

    
        g.setColor(Color.GREEN);
        g.setFont(new Font("Monospaced", Font.BOLD, 25));
        String retryText = "Presiona ENTER para Reintentar";
        FontMetrics metricsRetry = getFontMetrics(g.getFont());
        g.drawString(retryText, (ANCHO_PANTALLA - metricsRetry.stringWidth(retryText)) / 2, ALTO_PANTALLA - 50);
    }



    @Override
    public void actionPerformed(ActionEvent e) {
        if (juegoCorriendo) {
            mover();
        }
        repaint();
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (!juegoCorriendo && e.getKeyCode() == KeyEvent.VK_ENTER) {
            
            pedirNombre();
            return;
        }

        if (esperandoInput) return;

        int nuevoDirX = dirX;
        int nuevoDirY = dirY;

        switch (e.getKeyCode()) {
            case KeyEvent.VK_LEFT:
                if (dirX != TAMAÑO_UNIDAD) { 
                    nuevoDirX = -TAMAÑO_UNIDAD;
                    nuevoDirY = 0;
                }
                break;
            case KeyEvent.VK_RIGHT:
                if (dirX != -TAMAÑO_UNIDAD) { 
                    nuevoDirX = TAMAÑO_UNIDAD;
                    nuevoDirY = 0;
                }
                break;
            case KeyEvent.VK_UP:
                if (dirY != TAMAÑO_UNIDAD) { 
                    nuevoDirY = -TAMAÑO_UNIDAD;
                    nuevoDirX = 0;
                }
                break;
            case KeyEvent.VK_DOWN:
                if (dirY != -TAMAÑO_UNIDAD) { 
                    nuevoDirY = TAMAÑO_UNIDAD;
                    nuevoDirX = 0;
                }
                break;
        }
        
        if (nuevoDirX != dirX || nuevoDirY != dirY) {
            dirX = nuevoDirX;
            dirY = nuevoDirY;
            esperandoInput = true;
        }
    }

    @Override
    public void keyTyped(KeyEvent e) {}
    @Override
    public void keyReleased(KeyEvent e) {}
}