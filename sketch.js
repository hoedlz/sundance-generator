let params = {
  insideLoop: {
    distance: 200,
    length: 100,
    rotationSpeed: 0.3
  },
  middleLoop: {
    distance: 200,
    length: 100,
    rotationSpeed: -0.3
  },
  outsideLoop: {
    distance: 200,
    length: 100,
    rotationSpeed: 0.2
  },
  bg: '#F87575',
};

let insideLoopRotation = 0;
let middleLoopRotation = 0;
let outsideLoopRotation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Set up event listeners for the GUI elements
  setupGui();

  // Set up the toggle button functionality
  document.getElementById('toggle-gui').onclick = function() {
    let guiContainer = document.getElementById('gui-container');
    guiContainer.classList.toggle('collapsed');
    this.innerText = guiContainer.classList.contains('collapsed') ? '▶' : '◀';
  };
}

function draw() {
  background(params.bg);
  rectMode(CENTER);
  translate(width / 2, height / 2);

  drawStar(0, insideLoopRotation, params.insideLoop.distance, params.insideLoop.length);
  drawStar(0, middleLoopRotation, params.middleLoop.distance, params.middleLoop.length);
  drawStar(0, outsideLoopRotation, params.outsideLoop.distance, params.outsideLoop.length);

  insideLoopRotation -= params.insideLoop.rotationSpeed;
  middleLoopRotation -= params.middleLoop.rotationSpeed;
  outsideLoopRotation -= params.outsideLoop.rotationSpeed;
}

function drawStar(x, rotation, distance, length) {
  let elements = int(distance / 20);
  let angleIncrement = 360.0 / elements;

  push();
  rotate(radians(rotation));
  for (let i = 0; i < elements; i++) {
    fill(0);
    push();
    rotate(radians(i * angleIncrement));
    rect(0, distance, 10, length);
    pop();
  }
  pop();
}

function setupGui() {
  // Inside Loop
  document.getElementById('inside-distance').oninput = function() {
    params.insideLoop.distance = this.value;
    document.getElementById('inside-distance-value').innerText = this.value;
  };
  document.getElementById('inside-length').oninput = function() {
    params.insideLoop.length = this.value;
    document.getElementById('inside-length-value').innerText = this.value;
  };
  document.getElementById('inside-rotationSpeed').oninput = function() {
    params.insideLoop.rotationSpeed = this.value;
    document.getElementById('inside-rotationSpeed-value').innerText = this.value;
  };

  // Middle Loop
  document.getElementById('middle-distance').oninput = function() {
    params.middleLoop.distance = this.value;
    document.getElementById('middle-distance-value').innerText = this.value;
  };
  document.getElementById('middle-length').oninput = function() {
    params.middleLoop.length = this.value;
    document.getElementById('middle-length-value').innerText = this.value;
  };
  document.getElementById('middle-rotationSpeed').oninput = function() {
    params.middleLoop.rotationSpeed = this.value;
    document.getElementById('middle-rotationSpeed-value').innerText = this.value;
  };

  // Outside Loop
  document.getElementById('outside-distance').oninput = function() {
    params.outsideLoop.distance = this.value;
    document.getElementById('outside-distance-value').innerText = this.value;
  };
  document.getElementById('outside-length').oninput = function() {
    params.outsideLoop.length = this.value;
    document.getElementById('outside-length-value').innerText = this.value;
  };
  document.getElementById('outside-rotationSpeed').oninput = function() {
    params.outsideLoop.rotationSpeed = this.value;
    document.getElementById('outside-rotationSpeed-value').innerText = this.value;
  };

  // Background Color
  document.getElementById('bg').oninput = function() {
    params.bg = this.value;
  };

  // Randomize and Screenshot Buttons
  document.getElementById('randomize').onclick = function() {
    randomizeValues();
  };
  document.getElementById('takeScreenshot').onclick = function() {
    takeScreenshot();
  };

  // Initialize slider values to match params
  updateGui();
}

function randomizeValues() {
  params.insideLoop.distance = int(random(100, 400));
  params.insideLoop.length = int(random(50, 200));
  params.insideLoop.rotationSpeed = random(-5, 5);

  params.middleLoop.distance = int(random(100, 400));
  params.middleLoop.length = int(random(50, 200));
  params.middleLoop.rotationSpeed = random(-5, 5);

  params.outsideLoop.distance = int(random(100, 400));
  params.outsideLoop.length = int(random(50, 200));
  params.outsideLoop.rotationSpeed = random(-5, 5);

  params.bg = color(random(255), random(255), random(255));

  // Update GUI values
  updateGui();
}

function updateGui() {
  document.getElementById('inside-distance').value = params.insideLoop.distance;
  document.getElementById('inside-distance-value').innerText = params.insideLoop.distance;
  document.getElementById('inside-length').value = params.insideLoop.length;
  document.getElementById('inside-length-value').innerText = params.insideLoop.length;
  document.getElementById('inside-rotationSpeed').value = params.insideLoop.rotationSpeed;
  document.getElementById('inside-rotationSpeed-value').innerText = params.insideLoop.rotationSpeed;

  document.getElementById('middle-distance').value = params.middleLoop.distance;
  document.getElementById('middle-distance-value').innerText = params.middleLoop.distance;
  document.getElementById('middle-length').value = params.middleLoop.length;
  document.getElementById('middle-length-value').innerText = params.middleLoop.length;
  document.getElementById('middle-rotationSpeed').value = params.middleLoop.rotationSpeed;
  document.getElementById('middle-rotationSpeed-value').innerText = params.middleLoop.rotationSpeed;

  document.getElementById('outside-distance').value = params.outsideLoop.distance;
  document.getElementById('outside-distance-value').innerText = params.outsideLoop.distance;
  document.getElementById('outside-length').value = params.outsideLoop.length;
  document.getElementById('outside-length-value').innerText = params.outsideLoop.length;
  document.getElementById('outside-rotationSpeed').value = params.outsideLoop.rotationSpeed;
  document.getElementById('outside-rotationSpeed-value').innerText = params.outsideLoop.rotationSpeed;

  document.getElementById('bg').value = params.bg;
}

function takeScreenshot() {
  saveCanvas('screenshot', 'png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
