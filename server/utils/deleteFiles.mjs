import fs from "fs";

export default function deleteFiles(filePaths) {
  const filesDeleted = [];
  if (!filePaths || !Array.isArray(filePaths) || filePaths.length === 0) {
    if (typeof filePaths == "string") filePaths = [filePaths];

    return false;
  }

  // Loop through each file path and delete the file
  filePaths.forEach((filePath) => {
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist
        console.error(`File ${filePath} not found`);
        return;
      }

      // File exists, so delete it
      fs.unlink(filePath, (err) => {
        if (err) {
          // Error while deleting the file
          console.error(`Error deleting file ${filePath}:`, err);
          return;
        }

        filesDeleted.push(filePath);
        // File deleted successfully
        console.log(`File ${filePath} deleted successfully`);
      });
    });
  });

  return filesDeleted;
}
