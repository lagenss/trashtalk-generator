const fs = require("fs");


let commandName = "coolstory"; //change name of config
let commandSubName = "memepasta"; //change name of local bind name

let key = "I"; //change key to spam bind



//leave empty
let phrasesList = [];
let wholeCfg = "";
let repeatedCfgPart = "";



fs.readFile('./phrases/list.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  phrasesList = data.split('\r\n');
});

setTimeout(() => {
    for(let phraseID in phrasesList){
        if (phraseID != phrasesList.length - 1){
            repeatedCfgPart += `alias "${commandSubName}${phraseID}" "say ${phrasesList[phraseID]}; alias ${commandName} ${commandSubName}${parseInt(phraseID) + 1}"\n`;
        }
        else{
            repeatedCfgPart += `alias "${commandSubName}${phraseID}" "say ${phrasesList[phraseID]}; alias ${commandName} ${commandSubName}0"\n`;
        }
    }
    wholeCfg = `bind "${key}" "${commandName}"\nalias "${commandName}" "${commandSubName}0"\n` + repeatedCfgPart;
    console.log(phrasesList);
    console.log(typeof(phrasesList));
    console.log(wholeCfg);
    fs.writeFile(`./out/${commandName}.cfg`, wholeCfg, err => {
        if (err) {
          console.error(err);
        } else {
          console.log("DONE");
        }
      });
  }, 1000);

