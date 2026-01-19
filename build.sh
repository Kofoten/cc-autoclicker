#!/bin/bash

ZIP_NAME="cc-autoclicker.zip"

echo "Packaging extension..."

mkdir -p "out"

if [ -f "out/$ZIP_NAME" ]; then
    rm "out/$ZIP_NAME"
fi

cd src || { echo "ERROR: 'src' directory not found"; exit 1; }

tar --format=zip -cf ../out/"$ZIP_NAME" manifest.json content.js injected_cheat.js icons

if [ $? -eq 0 ]; then
    echo "Success! '$ZIP_NAME' created in project the 'out' folder."
else
    echo "ERROR: Packaging failed."
    exit 1
fi