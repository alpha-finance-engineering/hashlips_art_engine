const fs = require('fs')
const path = require('path')
var XLSX = require("xlsx");


async function main() {
  
  const metadataPath = path.join(__dirname, '..', 'build', 'json')
  const metadataFinalPath = path.join(__dirname, '..', 'build', 'json')
  
  var metadataCSV = XLSX.readFile('../zeus-metadata.csv');

  var metadataCSVJSON = XLSX.utils.sheet_to_json(metadataCSV.Sheets.Sheet1, {

  });  

  
  const RARITY = {
    1 : 'Common',
    2 : 'Rare',
    3 : 'Epic',
    4 : 'Legendary'
  }

  const tokenNumbers = []
 
  for (var i = 0; i <= metadataCSVJSON.length; i++) {
    
    const data = metadataCSVJSON[i]
    // // get the row in the spreadsheet
    let attributes = []

    console.log(data)

    if (data && data["Tier Code"]) {
      attributes.push(
        { "trait_type": "Rarity", "value": RARITY[data["Tier Code"]] }
      )
    }

    // if (data && data["Unit No."]) {
    //   attributes.push(
    //     { "trait_type": "Item Number", "value": data["Unit No."] }
    //   )
    //   tokenNumbers.push(data["Unit No."])
    // }
    
    
    let metaData = {
      description: "The Olympians of Avalanche is a collection of 500 NFTs powered by Zeus Finance. The Olympians are here to support the protocol, providing assistance for the ascension of wealth; a foundation for an inclusive community. They will be utilized within the protocol - another piece of the financial suite.",
      name: `The Olympians of Avalanche #${i}`,
      image: `https://metadata.nodeify.xyz/assets/2bf38be5-0879-4059-927b-ae93a33e3b9e/${i}.png`,
      edition: i,
      attributes,
      generatedBy: 'Alpha Shares Launchpad'
    }

    await new Promise((resolve) => {
      fs.writeFile(metadataFinalPath + `/${i}.json`, JSON.stringify(metaData, null, 2), (err) => {
        if (err) throw err
        
        resolve()
      })
    })
  }
  
  const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)

  const duplicateElements = toFindDuplicates(tokenNumbers);
  console.log(duplicateElements);

}

main();