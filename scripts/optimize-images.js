const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '..', 'app', 'assets', 'images-source');
const OUTPUT_DIR = path.join(__dirname, '..', 'app', 'assets', 'images');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read and process all files in images-source
fs.readdir(SOURCE_DIR, async (err, files) => {
    if (err) {
        console.error('Error reading source directory:', err);
        return;
    }

    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif'];
    const imageFiles = files
        .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
        .sort(); // Sort alphabetically for consistent renaming

    console.log(`Found ${imageFiles.length} images to optimize.`);

    let successCount = 0;
    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const inputPath = path.join(SOURCE_DIR, file);
        // Rename output to photo1.webp, photo2.webp, etc.
        const outputFilename = `photo${i + 1}.webp`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);

        try {
            await sharp(inputPath)
                .resize(450, 600, {
                    fit: 'cover',
                    position: 'center'
                })
                .webp({ quality: 78 })
                .toFile(outputPath);
            
            console.log(`Optimized: ${file} -> ${outputFilename}`);
            successCount++;
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }

    console.log(`Optimization complete. Successfully processed ${successCount}/${imageFiles.length} images.`);
});
