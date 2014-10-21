function sendSolutionJSON(json) {
var solved;
var score;
      var solutionJSON = json;
      console.log(user["name"]);

      $.ajax({

            type: "POST",
            
            async: false,

            url: "http://api.blendoku.verbunden.net/v1/level/solves/" + level["id"] + ".json",
            
            headers: {
                  'accesstoken': user["accesstoken"],
                  'name': user["name"]
            },

            //async: false,
            // The key needs to match your method's input parameter (case-sensitive).
            //data: JSON.stringify({
            //      solvedGrid: solutionJSON
            //}),
            data: solutionJSON,

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function(data) {
                  solved = data.solved;
                  score = data.score;
      console.log("in ajax " + solved + " , " + score);
               

            },

            failure: function(errMsg) {

                  alert(errMsg);

            }

      });
      
      console.log("nach ajax " + solved + " , " + score);
         if (solved == true) {
               var bestaetigung = window.confirm("Richtig! Score:" + score + " neues Level?");
               //Nach Betätigung des Buttons
               if (bestaetigung) {
                     level["id"] = level["id"] + 1;
                     resetGrid();
                     console.log("after reset Grid");
                     status = "goAway";

               } else {
                     //Abbrechen wurde gedrückt
                     console.log("abbrechen")
               }

        }   else {
                alert("falsche Lösung! streng dich mal an und versuchs nochmal...")
            }
}



function getSolutionJSON() {

      var i = 0;

      var solutionJSON = '{';

      solutionJSON += '"user":{"name":"' + user["name"] + '","accesstoken":"' + user["accesstoken"] + '"},';

      solutionJSON += '"grid":{';

      for (i = 0; i < gameGridGroup.children.length - 1; i++) {

            solutionJSON += '"' + (gameGridGroup.children[i].id - 2000).toString() + '":"#' + gameGridGroup.children[i].color + '",';

      }

      solutionJSON += '"' + (gameGridGroup.children[i].id - 2000).toString() + '":"#' + gameGridGroup.children[i].color + '"}';

      solutionJSON += ',"complexity":"' + level["complexity"] + '","starttime":"' + level["starttime"] + '"}';



      return solutionJSON;

}



function readJson(levelid) {

      level["id"] = levelid;

      jsonURL = "http://api.blendoku.verbunden.net/v1/level/starts/" + levelid.toString() + ".json";
      var i = 0;
      
      $.ajax({
            url: jsonURL,

            dataType: 'json',

            headers: {
                  'accesstoken': user["accesstoken"],
                  'name': user["name"]
            },

            async: false,

            success: function(data) {

                  $.each(data.level.color, function(key, val) {

                        colorArray.push(val.toString());

                  });

                  $.each(data.level.startgrid, function(key, val) {

                        startGridArray.push(val);

                        startGridArray[i].id = parseInt(key);

                        startGridArray[i].editable = val.edit;

                        i++;

                  });

                  level["id"] = data.level.id;

                  level["complexity"] = data.level.complexity;

                  level["starttime"] = data.starttime;

            }

      });
      //shuffle(colorArray);
      //user["name"] = $.cookie("username");
}


function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
      }

      return array;
}