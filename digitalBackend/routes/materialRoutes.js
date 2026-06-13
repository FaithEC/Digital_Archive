const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Material = require('../models/Material');
const { uploadMaterial, getMaterials } = require('../controllers/materialController');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'nacos-archive',
    allowed_formats: ['pdf', 'doc', 'docx', 'ppt', 'pptx'],
    resource_type: 'raw'
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOCX, and PPTX files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File is too large. Maximum size is 10MB.' });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, uploadMaterial);

router.get('/', getMaterials);

router.put('/:id/download', async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });

    // Delete from Cloudinary
    if (material.cloudinaryId) {
      await cloudinary.uploader.destroy(material.cloudinaryId, { resource_type: 'raw' });
    }

    await material.deleteOne();
    res.json({ message: 'Material removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, department, level, year } = req.body;
    const material = await Material.findById(req.params.id);
    if (material) {
      material.title = title || material.title;
      material.department = department || material.department;
      material.level = level || material.level;
      material.year = year || material.year;
      const updatedMaterial = await material.save();
      res.json(updatedMaterial);
    } else {
      res.status(404).json({ message: 'Material not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.post('/:id/report', async (req, res) => {
  try {
    const { reason } = req.body;
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $push: { reports: { reason, reportedAt: new Date() } } },
      { new: true }
    );
    res.json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.put('/:id/dismissReports', async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      { $set: { reports: [] } },
      { new: true }
    );
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;