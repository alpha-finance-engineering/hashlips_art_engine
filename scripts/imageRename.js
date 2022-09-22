const fs = require('fs')
const path = require('path')
var XLSX = require("xlsx");

async function main() {
  
  const imagePath = path.join(__dirname, '..', 'build', 'pngs')
  const imageFinalPath = path.join(__dirname, '..', 'build', 'pngs')
  const files = fs.readdirSync(imagePath)

  console.log(files.length)
 
  let prev;

  for (var i = 0; i <= files.length; i++) {
    // console.log(files[i].replace('Olympian', '')) 
    // try {
    //   const fileNumber = files[i].replace('Olympian', '')

    //   console.log(fileNumber,  i )
    //   console.log(fileNumber - 1, i - 1)
    //   // console.log(fileNumber - 1)
    //   // if (Number(fileNumber) - 1 != i - 1) {
    //   //   console.log('missing file number: ', i - 1)
    //   // }
    // } catch (error) {
      
    // }
    
    fs.rename(imagePath + `/${files[i]}`, imageFinalPath + `/${i}.png`, (err) => {
        if (err) throw err
        console.log(files[i])
      });
  }

}

main();