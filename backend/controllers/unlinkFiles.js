function unLinkFiles(filePath) {
    var fs = require('fs'); // Import the 'fs' (File System) module for file operations
   
    // Check if the file exists at the specified path
    if (fs.existsSync(filePath)) {
        // If the file exists, attempt to delete it
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err); // Log any errors that occur during the file deletion
            } else {
                console.log('deleted'); // Log a success message if the file was deleted
            }
        });
    }
}

module.exports = {
    unLinkFiles // Export the unLinkFiles function for use in other parts of the application
};
