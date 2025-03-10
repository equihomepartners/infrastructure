#!/bin/bash

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Installing via Homebrew..."
    brew install imagemagick
fi

# Set icon path
ICON_PATH="public/equihome-icon.png"

# Check if icon exists
if [ ! -f "$ICON_PATH" ]; then
    echo "Error: Icon not found at $ICON_PATH"
    exit 1
fi

echo "Creating icon set from $ICON_PATH..."

# Create iconset directory
mkdir -p Equihome.iconset

# Generate icon files
convert "$ICON_PATH" -resize 16x16 Equihome.iconset/icon_16x16.png
convert "$ICON_PATH" -resize 32x32 Equihome.iconset/icon_16x16@2x.png
convert "$ICON_PATH" -resize 32x32 Equihome.iconset/icon_32x32.png
convert "$ICON_PATH" -resize 64x64 Equihome.iconset/icon_32x32@2x.png
convert "$ICON_PATH" -resize 128x128 Equihome.iconset/icon_128x128.png
convert "$ICON_PATH" -resize 256x256 Equihome.iconset/icon_128x128@2x.png
convert "$ICON_PATH" -resize 256x256 Equihome.iconset/icon_256x256.png
convert "$ICON_PATH" -resize 512x512 Equihome.iconset/icon_256x256@2x.png
convert "$ICON_PATH" -resize 512x512 Equihome.iconset/icon_512x512.png
convert "$ICON_PATH" -resize 1024x1024 Equihome.iconset/icon_512x512@2x.png

# Create icns file
iconutil -c icns Equihome.iconset

# Clean up
rm -rf Equihome.iconset

echo "Icon created as Equihome.icns" 