const fs = require('fs')
const path = require('path')
var XLSX = require("xlsx");

async function main() {
  
  const metadataPath = path.join(__dirname, '..', 'build', 'json-final')
  const metadataFinalPath = path.join(__dirname, '..', 'build', 'json-final')
  const files = fs.readdirSync(metadataPath)


  console.log(files.length)
 
  for (var i = 0; i <= files.length; i++) {

    // // iterate over each json file
    let metadataFile = fs.readFileSync(metadataPath + `/${i}.json`);
    let metadataJSON = JSON.parse(metadataFile);
   
    let metaData = {
      ...metadataJSON,
      name: `Blockseed Munks #${i}`,
      description: "A collection of 2800 Chipmunk NFTs with the goal of connecting web3 and the real world. This project is focused on providing real-world utility and benefits to our holders powered by the profits generated from a sustainable farm.                             https://www.blockseedmunks.com",
      edition: i,
      image: `https://metadata.nodeify.xyz/assets/56b45717-ad5f-4ac3-96a6-a21e45ce589c/${i}.png`,
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