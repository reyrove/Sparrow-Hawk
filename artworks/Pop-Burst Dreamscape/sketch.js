const canvasSize = Math.min(innerWidth, innerHeight);
let backgroundColor;
const gridSize = 6; // Number of rows and columns in the grid

function setup() {
  createCanvas(canvasSize, canvasSize);
  angleMode(DEGREES);
  noLoop(); // Static artwork

  // Call fxhash preview trigger to generate image preview
  $fx.preview();

  // Generate a random bright background color on every refresh (comic-style)
  backgroundColor = color($fx.rand() * 155 + 100, $fx.rand() * 155 + 100, $fx.rand() * 155 + 100);
}

function draw() {
  background(backgroundColor); // Use the random background color

  // Define grid cell size based on canvas size and gridSize
  let cellSize = canvasSize / gridSize;

  // Create grid-based patterns with thick comic-style outlines
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let x = col * cellSize + cellSize / 2;
      let y = row * cellSize + cellSize / 2;
      drawComicShape(x, y, cellSize);
    }
  }

  // Add radial pattern to the center of the canvas
  drawRadialPattern(canvasSize / 2, canvasSize / 2, canvasSize * 0.35);

  // Add lots of comic speech bubbles
  addManyComicSpeechBubbles(10); // Add 10 random speech bubbles
}

// Function to draw comic-style shapes
function drawComicShape(x, y, size) {
  let shapeType = int($fx.rand() * 5);
  strokeWeight(canvasSize * 0.01); // Bold comic-style outlines
  stroke(0); // Black outline for comic style

  if (shapeType === 0) {
    drawFlowingSpiral(x, y, size * 0.7);
  } else if (shapeType === 1) {
    drawComicBezierShape(x, y, size);
  } else if (shapeType === 2) {
    drawComicArc(x, y, size * 0.8);
  } else if (shapeType === 3) {
    drawComicFlower(x, y, size * 0.5);
  } else {
    drawComicOrbs(x, y, size * 0.4);
  }
}

// Function to draw flowing spiral with comic feel
function drawFlowingSpiral(x, y, radius) {
  let numTurns = $fx.rand() * 5 + 3;
  let angleOffset = $fx.rand() * 360;

  noFill();
  strokeWeight(canvasSize * 0.01); // Thick lines for comic style

  beginShape();
  for (let t = 0; t < numTurns * 360; t += 10) {
    let angle = t + angleOffset;
    let r = radius * (t / (numTurns * 360));
    let xOffset = cos(radians(angle)) * r;
    let yOffset = sin(radians(angle)) * r;
    vertex(x + xOffset, y + yOffset);
  }
  endShape();
}

// Function to draw comic-style bezier shapes
function drawComicBezierShape(x, y, size) {
  let x2 = x + $fx.rand() * size - size / 2;
  let y2 = y + $fx.rand() * size - size / 2;
  let cx1 = x + $fx.rand() * size - size / 2;
  let cy1 = y + $fx.rand() * size - size / 2;
  let cx2 = x + $fx.rand() * size - size / 2;
  let cy2 = y + $fx.rand() * size - size / 2;

  strokeWeight(canvasSize * 0.01); // Thick stroke for comic feel
  bezier(x, y, cx1, cy1, cx2, cy2, x2, y2);
}

// Function to draw glowing arc shapes in comic style
function drawComicArc(x, y, radius) {
  let startAngle = $fx.rand() * 360;
  let endAngle = startAngle + $fx.rand() * 135 + 45;

  strokeWeight(canvasSize * 0.01); // Bold outlines
  arc(x, y, radius, radius, radians(startAngle), radians(endAngle));
}

// Function to draw a comic-style flower pattern
function drawComicFlower(x, y, petalRadius) {
  let petals = int($fx.rand() * 6 + 5);

  for (let i = 0; i < petals; i++) {
    let angle = map(i, 0, petals, 0, TWO_PI);
    let xOffset = cos(angle) * petalRadius;
    let yOffset = sin(angle) * petalRadius;

    fill(getRandomComicColor());
    ellipse(x + xOffset, y + yOffset, petalRadius, petalRadius * 1.2); // Petals
  }

  // Draw flower core with thick black outline
  fill(getRandomComicColor());
  ellipse(x, y, petalRadius * 0.6, petalRadius * 0.6); // Core of the flower
}

// Function to draw comic-style sparkling orbs
function drawComicOrbs(x, y, size) {
  fill(255, 255, 255, 150);
  ellipse(x, y, size, size); // Orb body with black outline

  // Draw sparkles around the orb
  for (let i = 0; i < 5; i++) {
    let sparkleX = x + $fx.rand() * size - size / 2;
    let sparkleY = y + $fx.rand() * size - size / 2;
    fill(255, 255, 255, 200);
    ellipse(sparkleX, sparkleY, size * 0.1, size * 0.1); // Tiny sparkles
  }
}

// Function to create a radial pattern from the center (comic-style)
function drawRadialPattern(centerX, centerY, radius) {
  let numShapes = 12; // Number of shapes in the radial pattern
  for (let i = 0; i < numShapes; i++) {
    let angle = map(i, 0, numShapes, 0, TWO_PI);
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    drawComicShape(x, y, radius * 0.3); // Place comic shapes in radial symmetry
  }
}

// Function to add many comic-style speech bubbles
function addManyComicSpeechBubbles(numBubbles) {
  const comicQuotes = ["POW!", "BAM!", "WHAM!", "ZOOM!", "WOW!", "ZAP!", "CRASH!", "BOOM!", "KABOOM!", "BANG!"];

  for (let i = 0; i < numBubbles; i++) {
    let x = $fx.rand() * width;
    let y = $fx.rand() * height;
    let w = canvasSize * 0.2;
    let h = canvasSize * 0.1;

    // Draw a speech bubble
    fill(255);
    stroke(0);
    strokeWeight(canvasSize * 0.01);
    rect(x, y, w, h, canvasSize * 0.02);

    // Add random quote inside the speech bubble
    let quote = comicQuotes[int($fx.rand() * comicQuotes.length)];

    fill(0);
    noStroke();
    textSize(canvasSize * 0.04);
    textAlign(CENTER, CENTER);
    text(quote, x + w / 2, y + h / 2); // Comic-style text in the bubble
  }
}

// Function to get comic-style colors (flat and bright)
function getRandomComicColor() {
  let colors = [
    color(255, 0, 0),      // Red
    color(0, 0, 255),      // Blue
    color(255, 255, 0),    // Yellow
    color(0, 255, 0),      // Green
    color(255, 255, 255)   // White
  ];
  return colors[int($fx.rand() * colors.length)];
}





















