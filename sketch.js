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
  randomizeValues: randomizeValues,
  takeScreenshot: takeScreenshot
};

let insideLoopRotation = 0;
let middleLoopRotation = 0;
let outsideLoopRotation = 0;

let gui = new dat.GUI({ domElement: document.getElementById('gui-container') });
gui.add(params, 'bg').name('Background Color').onChange(updateBackgroundColor).domElement.classList.add('custom-bg-control');


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  gui = new dat.GUI();

  let sunDesignFolder = gui.addFolder('Sun Design');
  
  let insideLoopFolder = sunDesignFolder.addFolder('Inside');
  insideLoopFolder.add(params.insideLoop, 'distance', 100, 400).name('Distance');
  insideLoopFolder.add(params.insideLoop, 'length', 50, 200).name('Length');
  insideLoopFolder.add(params.insideLoop, 'rotationSpeed', -5, 5).name('Rotation Speed');
  
  let middleLoopFolder = sunDesignFolder.addFolder('Middle');
  middleLoopFolder.add(params.middleLoop, 'distance', 100, 400).name('Distance');
  middleLoopFolder.add(params.middleLoop, 'length', 50, 200).name('Length');
  middleLoopFolder.add(params.middleLoop, 'rotationSpeed', -5, 5).name('Rotation Speed');
  
  let outsideLoopFolder = sunDesignFolder.addFolder('Outside');
  outsideLoopFolder.add(params.outsideLoop, 'distance', 100, 400).name('Distance');
  outsideLoopFolder.add(params.outsideLoop, 'length', 50, 200).name('Length');
  outsideLoopFolder.add(params.outsideLoop, 'rotationSpeed', -5, 5).name('Rotation Speed');

  sunDesignFolder.open();

  gui.addColor(params, 'bg').name('Background Color').onChange(updateBackgroundColor);
  gui.add(params, 'randomizeValues').name('Randomize');
  gui.add(params, 'takeScreenshot').name('Take Screenshot');
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

  updateSliders();
}

function updateSliders() {
  gui.__folders['Sun Design'].__folders['Inside'].__controllers.forEach(controller => controller.updateDisplay());
  gui.__folders['Sun Design'].__folders['Middle'].__controllers.forEach(controller => controller.updateDisplay());
  gui.__folders['Sun Design'].__folders['Outside'].__controllers.forEach(controller => controller.updateDisplay());
}

function updateBackgroundColor(value) {
  params.bg = value;
}

function takeScreenshot() {
  saveCanvas('screenshot', 'png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateSliders(); // Add this line to update the sliders after resizing the canvas
}
