JavaScript
// Estructura base dada por el profesor
/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * * Estudiante: Klaudia Sophia Pérez Riaño
 * * Tarea: Implementar los algoritmos de rasterización manual.
 */

// Función de apoyo para dibujar un píxel individual
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Implementación del algoritmo de Bresenham para líneas.
 * @param {number} x0, y0 - Coordenadas iniciales
 * @param {number} x1, y1 - Coordenadas finales
 * @returns {void}
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    // Desarrollo del estudiante
    let dx= Math.abs(x1 - x0);
let dy= Math.abs(y1 - y0);

// dirección del movimiento
let sx= (x0 < x1) ? 1 : -1;
let sy= (y0 < y1) ? 1 : -1;

// parámetro de decisión inicial
let err= dx - dy;

while (true) {
    //dibujar pixel actual
    drawPixel(ctx, x0, y0, color);
    //condición de parada
    if (x0=== x1 && y0===y1)
        break;
    let e2 =2*err;
      //Si e2>-dy:se ajusta el error y se avanza en X
      if (e2>-dy){
        err -=dy;
        x0 +=sx;
      }
      //Si e2<dx:se ajusta el error y se avanza en Y
         if (e2 < dx) {
        err +=dx;
        y0 +=sy;
    }

}
}
//función circunferencia con punto medio
function midpointCircle(cx, cy, r, color) {
    let x = 0;
    let y = r
    //parámetro de desición inicial
    let p=1-r;
    //función interna para aprovechar la simetría
       function drawCirclePoints(cx, cy, x, y) {
        drawPixel(ctx, cx + x, cy + y, color);
        drawPixel(ctx, cx - x, cy + y, color);
        drawPixel(ctx, cx + x, cy - y, color);
        drawPixel(ctx, cx - x, cy - y, color);
        drawPixel(ctx, cx + y, cy + x, color);
        drawPixel(ctx, cx - y, cy + x, color);
        drawPixel(ctx, cx + y, cy - x, color);
        drawPixel(ctx, cx - y, cy - x, color);
    }
        while(x<=y){
        drawCirclePoints(cx, cy, x, y);
    //Si p<0:el punto medio está dentro del círculo
        if (p < 0) {
            p = p + 2 * x + 3;
        } else {
    //Si p >= 0: el punto medio está fuera del círculo
            p = p + 2 * (x - y) + 5;
            y--;
        }
        x++;
    }

}

/**
 * Calcula los vértices de un polígono regular.
 * @param {number} centerX, centerY - Centro
 * @param {number} sides - Número de lados
 * @param {number} radius - Radio
 * @returns {Array} Arreglo de objetos {x, y}
 */
function getPolygonVertices(centerX, centerY, sides, radius) {
    // Desarrollo del estudiante (Uso de Math.sin/Math.cos y retorno de datos)
    let vertices = [];
    //ángulo entre cada vértice
    let angleStep = (2 * Math.PI) / sides;
    for (let i = 0; i < sides; i++) {
    //ángulo respecto al eje X positivo
    let angle = i * angleStep;
    //cálculo de coordenadas usando trigonometría
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    vertices.push({ x: x, y: y });
}
return vertices;
}

//función principal, que arma y dibuja una escena completa en el canvas
function drawScene() {
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    //número aleatorio de lados entre 5 y 10
    let sides = Math.floor(Math.random() * 6) + 5;
    let R = 150;
    let vertices = getPolygonVertices(centerX, centerY, sides, R);
    //dibujar el polígono
    for (let i = 0; i < sides; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % sides]; //conecta último con primero
        //llamar a bresenhamLine
            bresenhamLine(
            Math.round(v1.x),
            Math.round(v1.y),
            Math.round(v2.x),
            Math.round(v2.y),
            "black"
        );
        
