const Material = require('../models/Material');

exports.uploadMaterial = async (req, res) => {
  try {
    const { title, department, level, year, materialType } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Get file size in KB
    const fileSizeKB = (req.file.size / 1024).toFixed(2);
    const fileExtension = req.file.originalname.split('.').pop().toUpperCase();

    const material = await Material.create({
      title,
      department,
      level,
      year,
      materialType: materialType || 'Lecture Note',
      fileUrl: req.file.path,        // Cloudinary URL
      cloudinaryId: req.file.filename, // Cloudinary public ID for deletion
      fileName: req.file.originalname,
      fileSize: `${fileSizeKB} KB`,
      fileType: fileExtension,
      downloadCount: 0,
    });

    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};