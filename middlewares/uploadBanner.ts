import path from "path";
import fs from "fs";
import multer, { FileFilterCallback } from "multer";
import {Request} from "express";

const UploadBanner = () => {
  const up_file = path.join(__dirname, "../assets/banners");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(up_file)) {
        fs.mkdirSync(up_file, { recursive: true });
      }
      cb(null, up_file);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  };

  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: fileFilter,
  });
};

export default UploadBanner;
