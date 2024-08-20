const e = Math.min(innerWidth, innerHeight);
const canvas = {
  w: e,
  h: e
};

let arcColors = [];
let starColors = [];
let planetColors = [];
let frostParticles = [];
let planets = [];
let magicalOrbs = [];
let time = 0;

function setup() {
  createCanvas(canvas.w, canvas.h);
  noFill();
  angleMode(DEGREES);

  // Call $fx.preview() to trigger the capture module for generating previews
  $fx.preview();

  // Create an array of 30 different magical colors for arcs
  //for (let i = 0; i < 30; i++) {
    arcColors.push(color($fx.rand() * 155 + $fx.rand() *100, $fx.rand() * 100 + $fx.rand() *100, $fx.rand() * 105 + $fx.rand() *150));
  //}

  // Create an array of 30 different magical colors for stars
  //for (let i = 0; i < 30; i++) {
    starColors.push(color($fx.rand() * 55 + $fx.rand() *200, $fx.rand() * 105 + $fx.rand() *150, $fx.rand() * 55 + $fx.rand() *200));
  //}

  // Create an array of 30 different magical colors for planets
  //for (let i = 0; i < 30; i++) {
    planetColors.push(color($fx.rand() * 105 + $fx.rand() *150, $fx.rand() * 155 + $fx.rand() *100, $fx.rand() * 105 + $fx.rand() *150, $fx.rand() *150));
  //}

  // Generate frost particles
  for (let i = 0; i < 200; i++) {
    frostParticles.push({
      x: $fx.rand() * canvas.w,
      y: $fx.rand() * canvas.h,
      size: $fx.rand() * 3*e/400 + e/200,
      alpha: $fx.rand() * 100 + 50
    });
  }

  // Generate ethereal planets
  for (let i = 0; i < 10; i++) {
    planets.push({
      x: $fx.rand() * canvas.w * 0.6 + canvas.w * 0.2,
      y: $fx.rand() * canvas.h * 0.6 + canvas.h * 0.2,
      size: $fx.rand() * e/4 + e/8,
      color: planetColors[i % planetColors.length]
    });
  }

  // Generate magical orbs with glow
  for (let i = 0; i < 10; i++) {
    magicalOrbs.push({
      x: $fx.rand() * canvas.w,
      y: $fx.rand() * canvas.h,
      size: $fx.rand() * e/20 + e/40,
      color: starColors[i % starColors.length]
    });
  }
}

function draw() {
  background($fx.rand() *16, $fx.rand() *24, $fx.rand() *32, $fx.rand() *30); // Deep dark background with a subtle transparency for trails
  translate(canvas.w / 2, canvas.h / 2);
  
  // Slowly rotate the entire scene for a dynamic experience
  rotate(time * 0.1);

  // Draw the ethereal planets first, so they appear behind the arcs
  drawPlanets();

  // Outer frost glow effect
  for (let r = canvas.w / 2; r > 0; r -= 2) {
    strokeWeight(2);
    stroke(32, 64, 96, map(r, 0, canvas.w / 2, 255, 0));
    ellipse(0, 0, r * 2);
  }

  // Draw the dynamic, magical frost arcs
  for (let i = 0; i < 4; i++) {
    let diameter = 16*e/100 + i * (canvas.w / 6) + sin(time + i * 10) * e/40; // Pulsing effect on arcs
    let startAngle = (time * 0.5 + $fx.rand() * 360) % 360;
    let endAngle = startAngle + $fx.rand() * 90 + 90;
    
    // Draw with enhanced magical gradient
    drawMagicalArc(diameter, startAngle, endAngle, i);
  }

  // Draw magical orbs
  drawMagicalOrbs();

  // Draw frost particles on top
  drawFrostParticles();

  // Add sparkles for extra magic
  drawSparkles();

  // Increase time for animation
  time += 0.5;
}

// Function to draw an arc with enhanced magical gradient and glow
function drawMagicalArc(diameter, startAngle, endAngle, gradientIndex) {
  for (let i = 0; i < 32; i++) {
    let inter = map(i, 0, 31, 0, 1);
    let c = lerpColor(arcColors[(gradientIndex * 2) % arcColors.length], 
                      arcColors[(gradientIndex * 2 + 1) % arcColors.length], 
                      inter);
    stroke(c);
    strokeWeight(8 + sin(i * 2) * 4); // Varying stroke weight for a magical effect

    // Add a glow effect
    let glowAlpha = map(i, 0, 31, 50, 200);
    strokeWeight(e/25 - e*i/(25*32));
    stroke(c.levels[0], c.levels[1], c.levels[2], glowAlpha);
    arc(0, 0, diameter, diameter, startAngle + i, endAngle + i);
  }
}

// Function to draw frost particles
function drawFrostParticles() {
  for (let particle of frostParticles) {
    fill(255, 255, 255, particle.alpha);
    noStroke();
    ellipse(particle.x - canvas.w / 2, particle.y - canvas.h / 2, particle.size, particle.size);
  }
}

// Function to draw ethereal planets
function drawPlanets() {
  for (let planet of planets) {
    let pulsatingSize = planet.size + sin(time * 0.2) * e/80; // Pulsing effect on planets
    drawGlow(planet.x - canvas.w / 2, planet.y - canvas.h / 2, pulsatingSize, planet.color);
    
    let gradient = drawingContext.createRadialGradient(
      planet.x, planet.y, pulsatingSize * 0.1, 
      planet.x, planet.y, pulsatingSize
    );
    gradient.addColorStop(0, color(255, 255, 255, 200));
    gradient.addColorStop(1, planet.color);

    drawingContext.fillStyle = gradient;
    ellipse(planet.x - canvas.w / 2, planet.y - canvas.h / 2, pulsatingSize);
  }
}

// Function to draw a glowing effect around planets
function drawGlow(x, y, size, planetColor) {
  noFill();
  for (let i = 10; i > 0; i--) {
    stroke(planetColor.levels[0], planetColor.levels[1], planetColor.levels[2], e/20 * i);
    ellipse(x, y, size + i * e/40);
  }
}

// Function to draw magical orbs
function drawMagicalOrbs() {
  for (let orb of magicalOrbs) {
    let gradient = drawingContext.createRadialGradient(
      orb.x, orb.y, orb.size * 0.1, 
      orb.x, orb.y, orb.size
    );
    gradient.addColorStop(0, color(255, 255, 255, 200));
    gradient.addColorStop(1, orb.color);

    drawingContext.fillStyle = gradient;
    ellipse(orb.x - canvas.w / 2, orb.y - canvas.h / 2, orb.size + sin(time * 0.5) * 2); // Pulsing effect
  }
}

// Function to draw sparkles
function drawSparkles() {
  for (let i = 0; i < 100; i++) {
    let x = $fx.rand() * canvas.w - canvas.w / 2;
    let y = $fx.rand() * canvas.h - canvas.h / 2;
    let sparkleSize = $fx.rand() * e/200 + e/400;
    fill(starColors[i % starColors.length], $fx.rand() * 105 + 150);
    noStroke();
    ellipse(x, y, sparkleSize + sin(time + i) * e/800, sparkleSize + sin(time + i) * e/800); // Twinkling effect
  } 0.5
}

// Save a 5-second gif when the user presses the 's' key.
function keyPressed() {
  if (key === 's') {
    saveGif('Celestial Frost Arcs', 5);
  }
}







