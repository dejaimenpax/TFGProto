import React, { useEffect, useRef } from "react";

const TriangleExercise = ({ enunciado }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Establece el tamaño del canvas
    canvas.width = 600;
    canvas.height = 600;

    // Dibuja el eje de coordenadas
    context.beginPath();
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();

    //cuadricula
    context.strokeStyle = "#dcdcdc"; // Establece el color de la cuadrícula
    for (let i = -10; i <= 10; i++) {
      // Dibuja las líneas horizontales
      context.beginPath();
      context.moveTo(i * 30 + canvas.width / 2, 0);
      context.lineTo(i * 30 + canvas.width / 2, canvas.height);
      context.stroke();

      // Dibuja las líneas verticales
      context.beginPath();
      context.moveTo(0, -i * 30 + canvas.height / 2);
      context.lineTo(canvas.width, -i * 30 + canvas.height / 2);
      context.stroke();
    }

    // Escala los puntos de los triángulos
    const scale = canvas.width / 20; // factor de escala
    const scaledEnunciado = enunciado.map((triangle) =>
      triangle.map((point) => [point[0] * scale, point[1] * scale])
    );

    // Colores para cada triángulo
    const colors = ["red", "blue", "green", "orange", "purple", "pink", "brown"];

    // Dibuja cada triángulo y sus etiquetas
    for (let i = 0; i < scaledEnunciado.length; i++) {
      const triangle = scaledEnunciado[i];

      // Establece el color del triángulo
      context.fillStyle = colors[i];

      context.beginPath();
      context.moveTo(
        triangle[0][0] + canvas.width / 2,
        canvas.height / 2 - triangle[0][1]
      );
      context.lineTo(
        triangle[1][0] + canvas.width / 2,
        canvas.height / 2 - triangle[1][1]
      );
      context.lineTo(
        triangle[2][0] + canvas.width / 2,
        canvas.height / 2 - triangle[2][1]
      );
      context.closePath();

      // Aplica la transparencia solo a los triángulos
      context.globalAlpha = 0.5;
      context.fill();
      // Restaura el valor predeterminado de globalAlpha
      context.globalAlpha = 1;

      context.stroke();

      // Añade etiquetas a los vértices
      for (let j = 0; j < 3; j++) {
        const point = triangle[j];
        context.fillText(
          `(${point[0] / 30}, ${point[1] / 30})`,
          point[0] + canvas.width / 2 + 5,
          canvas.height / 2 - point[1] - 5
        );
      }
    }

    for (let i = -10; i <= 10; i++) {
      context.fillStyle = "#000000"; // Establece el color en negro
      context.fillText(i.toString(), i * scale + canvas.width / 2, canvas.height / 2 + 10);
      context.fillText(i.toString(), canvas.width / 2 - 10, -i * scale + canvas.height / 2);
    }
  })


  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );


}

export default TriangleExercise;

