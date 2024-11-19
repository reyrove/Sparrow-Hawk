const canvasSize = Math.min(innerWidth, innerHeight); // Dynamic canvas size
let backgroundColor;
const gridSize = 4; // Number of rows and columns for the pattern grid

function setup() {
  createCanvas(canvasSize, canvasSize);
  angleMode(DEGREES); // Degrees for easier angle manipulation
  noLoop(); // Static artwork

  // Call fxhash preview trigger to generate image preview
  $fx.preview();

  // Generate a diverse background color
  backgroundColor = getDiverseBackgroundColor(); // Use function to create a diverse background color
}

function draw() {
  background(backgroundColor); // Apply the generated background color

  // Define grid cell size based on the canvas size and grid size
  let cellSize = canvasSize / gridSize;

  // Create a grid-based pattern of complex snowflake-like flowers
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let x = col * cellSize + cellSize / 2;
      let y = row * cellSize + cellSize / 2;
      let petalLength = cellSize * (0.2 + $fx.rand() * 0.3); // Randomized petal length for each snowflake
      let numPetals = Math.floor($fx.rand() * 6 + 6); // Random number of petals between 6 and 12
      drawSnowflake(x, y, petalLength, numPetals); // Draw unique snowflake for each position
    }
  }
}

// Function to draw a snowflake-like structure with more variable properties
function drawSnowflake(x, y, length, numPetals) {
  let angleStep = 360 / numPetals; // Spread petals evenly (or close to it) in a circular pattern

  // Draw each petal with curvature and variability
  for (let i = 0; i < numPetals; i++) {
    let angle = i * angleStep + ($fx.rand() * 15 - 7.5); // Small random offset for organic variation
    stroke(getRandomColor()); // Use magical and neon colors with more variety

    // Set variable stroke weight for snowflake arms
    strokeWeight(canvasSize * (0.003 + $fx.rand() * 0.01)); // Randomized stroke weight for each petal
    let depth = Math.floor($fx.rand() * 2 + 2); // Vary recursion depth between 2 and 3
    drawComplexPetal(x, y, length, angle, depth); // Recursive depth for complexity
  }
}

// Function to draw a single petal with recursive branches (snowflake arms)
function drawComplexPetal(x, y, length, angle, depth) {
  if (depth === 0) return; // Stop recursion at depth 0

  let controlPointOffset = length * (0.3 + $fx.rand() * 0.3); // Randomize curvature control points

  // Calculate the control points for the Bezier curve
  let xControl = x + cos(angle) * controlPointOffset;
  let yControl = y + sin(angle) * controlPointOffset;
  let xEnd = x + cos(angle) * length;
  let yEnd = y + sin(angle) * length;

  // Set variable stroke weight for petal branches
  strokeWeight(canvasSize * (0.002 + $fx.rand() * 0.008)); // Vary stroke weight for each branch
  noFill();

  // Draw the curved petal using a Bezier curve
  beginShape();
  vertex(x, y); // Start at the center
  quadraticVertex(xControl, yControl, xEnd, yEnd); // Control point for curve
  endShape();

  // Recursive branching to add smaller branches (secondary snowflake arms)
  let newLength = length * (0.5 + $fx.rand() * 0.3); // Vary length of recursive branches
  let branchAngleOffset = 20 + $fx.rand() * 20; // Randomized branch angle offset

  // Draw two smaller branches from each main petal
  drawComplexPetal(xEnd, yEnd, newLength, angle - branchAngleOffset, depth - 1); // Left branch
  drawComplexPetal(xEnd, yEnd, newLength, angle + branchAngleOffset, depth - 1); // Right branch
}

// Function to generate more varied colors with neon, pastel, and deep tones
function getRandomColor() {
  let randomChoice = $fx.rand();
  if (randomChoice > 0.33) {
    // Generate a neon color (high saturation, bright tones)
    let neonColors = [
      color(57, 255, 20),  // Neon green
      color(255, 20, 147), // Neon pink
      color(0, 255, 255),  // Electric cyan
      color(255, 255, 0),  // Bright yellow
      color(255, 140, 0),  // Neon orange
      color(75, 0, 130),   // Indigo
      color(148, 0, 211),  // Vivid violet
      color(0, 255, 127),  // Spring green
      color(255, 69, 0),   // Neon red
      color(240, 230, 140),// Light neon yellow
      color(0, 206, 209)   // Dark neon cyan
    ];
    return neonColors[int($fx.rand() * neonColors.length)];
  } else if (randomChoice > 0.16) {
    // Generate a pastel color (soft tones)
    let pastelColors = [
      color(255, 182, 193), // Light pink
      color(135, 206, 250), // Light sky blue
      color(255, 228, 196), // Bisque
      color(240, 248, 255), // Alice blue
      color(221, 160, 221), // Plum
      color(152, 251, 152), // Pale green
      color(255, 228, 225), // Misty rose
    ];
    return pastelColors[int($fx.rand() * pastelColors.length)];
  } else {
    // Generate a dynamic color using HSL model for deep, magical tones
    let hue = $fx.rand() * 360; // Randomize hue across the spectrum
    let saturation = $fx.rand() * 50 + 50; // Saturation between 50% and 100%
    let brightness = $fx.rand() * 30 + 70; // Brightness between 70% and 100%
    return color(`hsl(${hue}, ${saturation}%, ${brightness}%)`);
  }
}

// Function to generate a diverse background color with neon, pastel, and deep tones
function getDiverseBackgroundColor() {
  let randomChoice = $fx.rand();
  if (randomChoice > 0.33) {
    // Neon background color (expanded range)
    let neonColors = [
      color(57, 255, 20),    // Neon green
      color(255, 20, 147),   // Neon pink
      color(0, 255, 255),    // Electric cyan
      color(255, 255, 0),    // Bright yellow
      color(255, 140, 0),    // Neon orange
      color(75, 0, 130),     // Indigo
      color(148, 0, 211),    // Vivid violet
      color(0, 255, 127),    // Spring green
      color(255, 69, 0),     // Neon red
      color(240, 230, 140),  // Light neon yellow
      color(0, 206, 209),    // Dark neon cyan
      color(255, 105, 180),  // Hot pink
      color(124, 252, 0),    // Lawn green
      color(255, 165, 0),    // Neon orange-red
      color(127, 255, 212),  // Aquamarine
      color(0, 250, 154)     // Neon medium spring green
    ];
    return neonColors[int($fx.rand() * neonColors.length)];
  } else if (randomChoice > 0.16) {
    // Pastel background color (expanded range)
    let pastelColors = [
      color(255, 182, 193), // Light pink
      color(135, 206, 250), // Light sky blue
      color(255, 228, 196), // Bisque
      color(240, 248, 255), // Alice blue
      color(221, 160, 221), // Plum
      color(152, 251, 152), // Pale green
      color(255, 228, 225), // Misty rose
      color(255, 240, 245), // Lavender blush
      color(245, 222, 179), // Wheat
      color(255, 239, 213), // Papaya whip
      color(250, 235, 215), // Antique white
      color(255, 228, 181), // Moccasin
      color(240, 255, 240), // Honeydew
      color(224, 255, 255), // Light cyan
      color(255, 250, 205)  // Lemon chiffon
    ];
    return pastelColors[int($fx.rand() * pastelColors.length)];
  } else {
    // Deep magical tones using HSL (expanded range)
    let hue = $fx.rand() * 360;         // Randomize hue across the spectrum
    let saturation = $fx.rand() * 50 + 40; // Darker and richer tones for background
    let brightness = $fx.rand() * 20 + 30; // Brightness between 30% and 50% for a deep background
    return color(`hsl(${hue}, ${saturation}%, ${brightness}%)`);
  }
}






























