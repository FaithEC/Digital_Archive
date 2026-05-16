const Material = require('../models/Material');

exports.uploadMaterial = async (req, res) => {
  console.log("--- Upload Attempt Started ---");
  console.log("Body Data:", req.body);
  console.log("File Data:", req.file);

  try {
    const { title, department, level, year } = req.body;
    
    if (!req.file) {
      console.log("❌ No file found in request");
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const material = await Material.create({
      title,
      department,
      level,
      year,
      fileUrl: req.file.path, // Multer provides this
      // uploadedBy: req.user?._id // We'll set this up with auth middleware later
    });

    console.log("✅ Material saved to DB:", material._id);
    res.status(201).json(material);
  } catch (error) {
    console.error("❌ Database Error:", error.message);
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
