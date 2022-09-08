const fs = require('fs')
const path = require('path')
var XLSX = require("xlsx");

async function main() {
  
  const metadataPath = path.join(__dirname, '..', 'build', 'json')
  const metadataFinalPath = path.join(__dirname, '..', 'build', 'json-final')
  const files = fs.readdirSync(metadataPath)
  var metadataCSV = XLSX.readFile('./players.csv');

  var metadataCSVJSON = XLSX.utils.sheet_to_json(metadataCSV.Sheets.Sheet1, {

  });  

  console.log(files.length)
 
  for (var i = 1; i <= files.length; i++) {

    // // iterate over each json file
    let metadataFile = fs.readFileSync(metadataPath + `/${i}.json`);
    let metadataJSON = JSON.parse(metadataFile);
    
    
    const playerRank = metadataJSON.attributes.find(el => el.trait_type === 'Rank').value
    console.log('playerRank : ', playerRank, i)
    // // get the row in the spreadsheet
    const data = metadataCSVJSON.find(el => el.Rank === playerRank)
    console.log(data)

    let attributes = []

    if (data?.Shoes) {
      attributes.push(
        { "trait_type": "Shoes", "value": data?.Shoes.trim() }
      )
    }
    
    if (data?.Headband) {
      attributes.push(
        { "trait_type": "Headband", "value": data?.Headband.trim() }
      )
    }
    
    if (data?.Glasses) {
      attributes.push(
        { "trait_type": "Glasses", "value": data?.Glasses.trim() }
      )
    }
    
    if (data?.Accessory) {
      attributes.push(
        { "trait_type": "Accessory", "value": data?.Accessory.trim() }
      )
    }

    attributes.push(
      { "trait_type": "Rank", "value": metadataJSON.attributes.find(el => el.trait_type === 'Rank').value.split(' ')[0] }
    )

    let metaData = {
      ...metadataJSON,
      attributes: [
        metadataJSON.attributes[0],
        metadataJSON.attributes[1],
        ...attributes
      ]
    }

    await new Promise((resolve) => {
      fs.writeFile(metadataFinalPath + `/${i}.json`, JSON.stringify(metaData, null, 2), (err) => {
        if (err) throw err
        console.log(files[i])
        resolve()
      })
    })
  }

}

main();