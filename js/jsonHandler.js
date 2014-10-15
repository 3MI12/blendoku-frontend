function sendSolutionJSON(json) {
      var solutionJSON = json;
      $.ajax({
      type: "POST",
      url: "http://steve.blendoku.verbunden.net/scripts/json.php",
      //async: false,
      // The key needs to match your method's input parameter (case-sensitive).
      data: JSON.stringify({
        solvedGrid: solutionJSON
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        alert("test");
        alert(data);
      },
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
}

function getSolutionJSON() {
  var i = 0;
  var solutionJSON = '{';
  for (i; i < gameGridGroup.children.length - 1; i++) {
    solutionJSON += ' {"id" : "' + gameGridGroup.children[i].id + '" , "color" : "#' + gameGridGroup.children[i].color + '" } ,';
  }
  solutionJSON += ' {"id" : "' + gameGridGroup.children[i].id + '" , "color" : "#' + gameGridGroup.children[i].color + '" }}';
  return solutionJSON;
}

function readJson(jsonURL) {
  var i = 0;
  $.ajax({
    url: jsonURL,
    dataType: 'json',
    async: false,
    success: function(data) {
      $.each(data.color, function(key, val) {
        colorArray.push(val.toString());
      });
      $.each(data.startgrid, function(key, val) {
        //console.log(val.edit);
        //console.log(key);
        startGridArray.push(val);
        startGridArray[i].id = parseInt(key);
        //startGridArray[i].editable = val.edit;
        //console.log(startGridArray[i].editable);        
        //console.log(startGridArray[i]);
        i++;
      });
    }
  });
}