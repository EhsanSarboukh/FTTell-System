function unLinkFiles(filePath ){
    var fs = require('fs');
   
if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('deleted');
    })
}
}


module.exports = {
    unLinkFiles
  };