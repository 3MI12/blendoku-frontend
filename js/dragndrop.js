/*

  awesome functions for drag and drop

  in crazy coding style

  don't try to understand every line --> you would not got it

  even the developer don't got everthing --> BUT IT WORKS FINE ;-)

  "NEVER DRINK AND DEVELOP"

*/



function onDocumentOnContextMenu(event) {

  if (event.which == 3) {

    event.preventDefault();

    var vector = new THREE.Vector3(mouse.x, mouse.y, 0);

    projector.unprojectVector(vector, camera);



    //raycaster für lösungselement checken

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    var intersects = raycaster.intersectObjects(gameGridGroup.children);



    if (intersects.length > 0) {

      var lsgElement = intersects[0].object;

      if (lsgElement.active == true) {

        for (var i = 0; i < draggingCubesGroup.children.length; i++) {
			console.log(colorArray);
          var object = scene.getObjectById(1000 + i, true);

          if (object.startColor == lsgElement.color) {

            object.color = object.startColor;

            object.material.color.setHex("0x" + object.color);

            object.active = true;

          }

        }

        lsgElement.active = false;

        lsgElement.color = defaultColor;

        lsgElement.material.color.setStyle(defaultColor);

      }

    }

  }

  SELECTED = null;

}



function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}



function onDocumentMouseMove(event) {

  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;



  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

  projector.unprojectVector(vector, camera);

  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());



  if (SELECTED) {

    var intersects = raycaster.intersectObject(plane);

    SELECTED.position.copy(intersects[0].point.sub(offset));

    return;

  }

  var intersectDraggingCubes = raycaster.intersectObjects(draggingCubesGroup.children);

  var intersectGameGrid = raycaster.intersectObjects(gameGridGroup.children);



  if (intersectDraggingCubes.length > 0) {

    if (INTERSECTED != intersectDraggingCubes[0].object) {

      INTERSECTED = intersectDraggingCubes[0].object;

      plane.position.copy(INTERSECTED.position);

      plane.lookAt(camera.position);

    }

    document.getElementById("webGLContainer").style.cursor = 'pointer';

  } else {

    document.getElementById("webGLContainer").style.cursor = 'auto';

  }

  if (intersectGameGrid.length > 0) {

    if (INTERSECTED != intersectGameGrid[0].object) {

      INTERSECTED = intersectGameGrid[0].object;

      plane.position.copy(INTERSECTED.position);

      plane.lookAt(camera.position);

    }

    document.getElementById("webGLContainer").style.cursor = 'pointer';

  } else {

    document.getElementById("webGLContainer").style.cursor = 'auto';

  }

}



function onDocumentMouseDown(event) {

 console.log(cubeArray[0].position.x);

  if (event.which == 1) {

    event.preventDefault();



    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

    projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    var intersectDraggingCubes = raycaster.intersectObjects(draggingCubesGroup.children);

    var intersectGameGrid = raycaster.intersectObjects(gameGridGroup.children);



    if (intersectDraggingCubes.length > 0) {

      var intersects = intersectDraggingCubes;

    } else if (intersectGameGrid.length > 0) {

      var intersects = intersectGameGrid;

    }

    if (intersects[0].object.active == true && intersects[0].object.editable == true) {

      SELECTED = intersects[0].object;

      SELECTED.position.z += 10;



      var intersects = raycaster.intersectObject(plane);

      offset.copy(intersects[0].point).sub(plane.position);

      document.getElementById("webGLContainer").style.cursor = 'move';

    } else {

      console.log("Element nicht auswählbar zurzeit!");

      document.getElementById("webGLContainer").style.cursor = 'crosshair';

    }

  }

}



function onDocumentMouseUp(event) {

  if (event.which == 1) {

    event.preventDefault();



    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);

    projector.unprojectVector(vector, camera);



    //raycaster für lösungselement checken

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    var intersects = raycaster.intersectObjects(gameGridGroup.children);



    if (INTERSECTED && SELECTED) {



      if (SELECTED.id < 2000) {

        if (intersects.length < 1) {

          SELECTED.position.set(SELECTED.startPositionX, SELECTED.startPositionY, SELECTED.startPositionZ)

          SELECTED = null;

        }

        var lsgElement = Object();

        lsgElement = intersects[0].object;



        if (intersects.length > 0 && lsgElement.editable == true) {



          if (lsgElement.active == true) {

            for (var i = 0; i < draggingCubesGroup.children.length; i++) {

              var object = scene.getObjectById(1000 + i, true);

              if (object.startColor == lsgElement.color) {

                object.color = object.startColor;

                object.material.color.setHex("0x" + object.color);

                object.active = true;

              }

            }

          }

          lsgElement.active = true;

          lsgElement.color = SELECTED.color;

          lsgElement.material.color.setHex("0x" + lsgElement.color);

          SELECTED.active = false;

          SELECTED.color = SELECTED.defaultColor;

          SELECTED.material.color.setHex(SELECTED.defaulColor);

        }

      }



      if (SELECTED.id >= 2000) {

        if (intersects.length > 1) {

          var intersectedObject = Object();

          intersectedObject = intersects[0].object;

          var selectedObject = Object();

          selectedObject = intersects[1].object;

          if (selectedObject.editable == true && intersectedObject.editable == true) {

            var intersectedColor = intersectedObject.material.color.getHex();

            var selectedColor = selectedObject.material.color.getHex();



            selectedObject.material.color.setHex(intersectedColor);

            intersectedObject.material.color.setHex(selectedColor)



            selectedObject.active = true;

            intersectedObject.active = true;

          }

        }

      }

    }

    plane.position.copy(INTERSECTED.position);

    SELECTED.position.set(SELECTED.startPositionX, SELECTED.startPositionY, SELECTED.startPositionZ)

    SELECTED = null;

    document.getElementById("webGLContainer").style.cursor = 'auto';

  }

}