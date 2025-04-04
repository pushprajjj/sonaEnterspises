<?php
// Set headers to allow access and specify JSON content
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Path to the gallery directory
$galleryDir = "assets/images/gallery/";

// Initialize an empty array to store image filenames
$images = [];

// Check if the directory exists
if (is_dir($galleryDir)) {
    // Get all files from the directory
    $files = scandir($galleryDir);
    
    // Filter out . and .. directories and only include image files
    foreach ($files as $file) {
        // Skip directories and non-image files
        if ($file !== '.' && $file !== '..' && !is_dir($galleryDir . $file)) {
            // Check if the file is an image by extension
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            if (in_array(strtolower($extension), ['jpg', 'jpeg', 'png', 'gif'])) {
                $images[] = $file;
            }
        }
    }
    
    // Sort the images alphabetically
    sort($images);
}

// Output the images as JSON
echo json_encode($images);
?> 