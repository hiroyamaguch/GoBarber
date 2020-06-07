import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const folder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: folder,
  uploadFolder: path.resolve(folder, 'uploads'),

  storage: multer.diskStorage({
    destination: folder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash} - ${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
