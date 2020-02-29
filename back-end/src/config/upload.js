const multer = require ('multer');
const path = require ('path');

module.exports = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..','..','uploads'), // pra nao dar bronca de caminho entre linux. windows e mac
    filename: function(req, file, cb){ //salvar a imagem original
      cb(null, file.originalname); //cb = callback pra salvar o imagem original
    }
  })
} 
