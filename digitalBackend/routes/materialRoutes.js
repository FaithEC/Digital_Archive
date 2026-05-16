const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs'); // Add this
const path = require('path'); // Add this
const { uploadMaterial, getMaterials } = require('../controllers/materialController');

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📁 Created 'uploads' folder automatically");
}
// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadMaterial);
router.get('/', getMaterials);

// DELETE a material
router.delete('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });

    // Optional: Delete the actual file from the 'uploads' folder
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '..', material.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await material.deleteOne();
    res.json({ message: 'Material removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// UPDATE a material (Edit Title/Dept/Level/Year)
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


module.exports = router;
