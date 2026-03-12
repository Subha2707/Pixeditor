const sharp = require("sharp");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const mime = require("mime-types");
const Conversion = require("../models/Conversion");

/* ------------------------------
   Image → PNG/JPG/JPEG/WebP
------------------------------ */
exports.convertImage = async (req, res) => {
  try {

    const format = req.body.format;

    const fileType = mime.lookup(req.file.path);

    if (!fileType || !fileType.startsWith("image/")) {
      return res.status(400).json({ message: "Not an image file" });
    }

    const outputPath = `converted/${Date.now()}.${format}`;

    await sharp(req.file.path)
      .toFormat(format)
      .toFile(outputPath);

    await Conversion.create({
      userId: req.user.id,
      originalFile: req.file.originalname,
      convertedFile: outputPath,
      format
    });

    res.download(outputPath, ()=>{
      fs.unlink(req.file.path, ()=>{});
      fs.unlink(outputPath, ()=>{});
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ------------------------------
   Image → PDF
------------------------------ */
exports.imageToPdf = async (req, res) => {

  try {

    const pdfDoc = await PDFDocument.create();

    const imageBytes = fs.readFileSync(req.file.path);

    let image;

    if (req.file.mimetype === "image/png") {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      image = await pdfDoc.embedJpg(imageBytes);
    }

    const page = pdfDoc.addPage([image.width, image.height]);

    page.drawImage(image);

    const pdfBytes = await pdfDoc.save();

    const outputPath = `converted/${Date.now()}.pdf`;

    fs.writeFileSync(outputPath, pdfBytes);

    await Conversion.create({
      userId: req.user.id,
      originalFile: req.file.originalname,
      convertedFile: outputPath,
      format: "pdf"
    });

    res.download(outputPath, ()=>{
      fs.unlink(req.file.path, ()=>{});
      fs.unlink(outputPath, ()=>{});
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

/* ------------------------------
   Image Compression
------------------------------ */

exports.compressImage = async (req, res) => {

  try {

    const mode = req.body.mode;

    const inputPath = req.file.path;

    const outputPath = `converted/${Date.now()}.jpg`;

    let quality = parseInt(req.body.quality || 80);

    if (mode === "quality") {

      await sharp(inputPath)
        .jpeg({ quality })
        .toFile(outputPath);

    } 
    else {

      const targetKB = parseInt(req.body.targetSizeKB);

      let buffer;

      do {

        buffer = await sharp(inputPath)
          .jpeg({ quality })
          .toBuffer();

        quality -= 5;

      } while (
        buffer.length / 1024 > targetKB &&
        quality > 10
      );

      fs.writeFileSync(outputPath, buffer);

    }

    res.download(outputPath, () => {

      fs.unlink(inputPath, () => {});
      fs.unlink(outputPath, () => {});

    });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};