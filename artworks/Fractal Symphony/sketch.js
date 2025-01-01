let colors = [];
let numLayers = 20;
let numSegments = 24;
let backgroundColor;

function setup() {
 
  const canvasSize = Math.min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);
 
  $fx.rand.reset(); 

  const palette = $fx.rand() > 0.5 ? "Warm" : "Cool";
  const symmetry = Math.floor($fx.rand() * 4) + 8;

  $fx.features({
    Palette: palette,
    Symmetry: symmetry,
  });

  numSegments = symmetry;
 
  backgroundColor = color($fx.rand() * 20, $fx.rand() * 20, $fx.rand() * 50);

  for (let i = 0; i < numLayers; i++) {
    let r = $fx.rand() * 255;
    let g = $fx.rand() * 255;
    let b = $fx.rand() * 255;
    if (palette === "Warm") {
      r = r * 0.6 + 100;
      g = g * 0.3 + 50;
      b = b * 0.2;
    } else {
      r = r * 0.2;
      g = g * 0.4 + 100;
      b = b * 0.6 + 100;
    }
    colors.push(color(r, g, b));
  }

  noLoop();
}

function draw() {
  background(backgroundColor);
  translate(width / 2, height / 2); 

  const maxRadius = width / 2;

  for (let layer = 0; layer < numLayers; layer++) {

    const radius = map(layer, 0, numLayers, maxRadius * 0.05, maxRadius);
    const innerRadius = radius * 0.8; 

    for (let segment = 0; segment < numSegments; segment++) {
      const angle = TWO_PI / numSegments;
      const startAngle = segment * angle;
      const endAngle = (segment + 1) * angle;

      const x1 = cos(startAngle) * radius;
      const y1 = sin(startAngle) * radius;
      const x2 = cos(endAngle) * radius;
      const y2 = sin(endAngle) * radius;

      const x3 = cos(endAngle) * innerRadius;
      const y3 = sin(endAngle) * innerRadius;
      const x4 = cos(startAngle) * innerRadius;
      const y4 = sin(startAngle) * innerRadius;

      fill(colors[layer]);
      noStroke();
      beginShape();
      vertex(x1, y1);
      vertex(x2, y2);
      vertex(x3, y3);
      vertex(x4, y4);
      endShape(CLOSE);
    }
  }

  $fx.preview(); 
}

function windowResized() {
  const canvasSize = Math.min(windowWidth, windowHeight);
  resizeCanvas(canvasSize, canvasSize);
  setup();
  redraw();
}
















