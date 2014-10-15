// place the gameGrid into the scene

function placeGameGrid() {
  // setting the basics for the gridcubes
  var gridGeo, gridMat, dragMat;
  gridGeo = new THREE.BoxGeometry(10, 10, 10);

  var j = 0; // counter which controls that only 10 cubes are gonna go in one row
  var line = 0; // used to achive the visualization of the cubes in rows of 10 cubes
  var startX = 50; // to push it a bit aside the menu a small startX is needed

  // the grid counts 100 cubes
  for (var i = 0; i < 100; i++) {

    if (j == 10) {
      line++;
      j = 0;
    }

    for (var z = 0; z < startGridArray.length; z++) {
      if (startGridArray[z].id == i) {
        gridMat = new THREE.MeshBasicMaterial({
          map: cubeTexture,
          color: startGridArray[z].color,
        });
        gameGrid[i] = new THREE.Mesh(gridGeo, gridMat);
        gameGrid[i].id = 2000 + startGridArray[z].id;
        gameGrid[i].position.x = startX + (j * 7 - ((10 - j) * 7)); // depanding on the count of the cubes they are placed in the middle of the scene
        gameGrid[i].position.y = ignitionY - line * 15; // space between the lines achived by calculating in which line the algorithm is an adding space of 15 between the rows
        gameGrid[i].startPositionX = gameGrid[i].position.x; //  save start position for reset after dragging failed
        gameGrid[i].startPositionY = gameGrid[i].position.y - ignitionY + 35; //  save start position for reset after dragging failed
        gameGrid[i].startPositionZ = gameGrid[i].position.z; //  save start position for reset after dragging failed  
        gameGrid[i].startPositionZ = 0; //  save start position for reset after dragging failed  
        gameGrid[i].active = false;
        gameGrid[i].editable = startGridArray[z].edit; //  string to boolean
        gameGrid[i].color = gameGrid[i].material.color.getHexString();

        gameGridGroup.add(gameGrid[i]);
      }
    }

    j++; // upcount the cubes in current line

  }

  line = 1; // reset the line to one because now we need to create the colors which are used in the level. seting line to 1 gives us a little space between grid an used colors

  // count of used colors is set by the levelconfiguration	
  for (var i = 0; i < colorArray.length; i++) {
    dragMat = new THREE.MeshBasicMaterial({
      map: cubeTexture,
      color: colorArray[i]
    });

    dragingCubes[i] = new THREE.Mesh(gridGeo, dragMat);

    // same as for the gamegrid
    if (j == 10) {
      line++;
      j = 0;
    }

    dragingCubes[i].position.x = (j * 7 - ((10 - j) * 7));
    dragingCubes[i].position.y = ignitionDragY + line * 15; //  line are bild up in positiv y-direction
    dragingCubes[i].id = 1000 + i;
    dragingCubes[i].startPositionX = dragingCubes[i].position.x; //  save start position for reset after dragging failed
    dragingCubes[i].startPositionY = dragingCubes[i].position.y - ignitionDragY + 15; //  save start position for reset after dragging failed  
    dragingCubes[i].startPositionZ = 5; //  save start position for reset after dragging failed  
    dragingCubes[i].color = dragingCubes[i].material.color.getHexString(); //  set color attribute for easier request  
    dragingCubes[i].startColor = dragingCubes[i].color; // save color at the beginning for reset
    dragingCubes[i].active = true;
    dragingCubes[i].editable= true;

    j++;
    draggingCubesGroup.add(dragingCubes[i]);

  }

  //correct position of Object Groups
  draggingCubesGroup.position.set(75, 0, 0);
  //draggingCubesGroup.rotation.x = deg2Rad(-10);
  //draggingCubesGroup.rotation.y = deg2Rad(-10);
  //gameGridGroup.position.set(75, 0, 0);
  //gameGridGroup.rotation.x = deg2Rad(-10);
  //gameGridGroup.rotation.y = deg2Rad(-10);
  
  // von maddin
          draggingCubesGroup.rotation.x =  -10* Math.PI / 180;
        draggingCubesGroup.rotation.y =  -10* Math.PI / 180;
        draggingCubesGroup.position.z = 5;
        gameGridGroup.rotation.x =  -10* Math.PI / 180;
        gameGridGroup.rotation.y =  -10* Math.PI / 180;
}

function deg2Rad(deg) {
  return deg * Math.PI / 180;
}