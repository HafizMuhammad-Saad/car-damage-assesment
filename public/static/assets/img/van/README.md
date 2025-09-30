# Car Part Images Directory Structure

This directory contains the transparent PNG images for the layered 2D car viewer.

## Directory Structure:
```
public/static/assets/img/car/
├── frontLeft/
│   ├── body.png
│   ├── hood.png
│   ├── frontBumper.png
│   ├── windshield.png
│   ├── doorFrontLeft.png
│   ├── wheelFrontLeft.png
│   └── headlightLeft.png
├── frontRight/
│   ├── body.png
│   ├── hood.png
│   ├── frontBumper.png
│   ├── windshield.png
│   ├── doorFrontRight.png
│   ├── wheelFrontRight.png
│   └── headlightRight.png
├── rearLeft/
│   ├── body.png
│   ├── trunk.png
│   ├── rearBumper.png
│   ├── rearWindshield.png
│   ├── doorRearLeft.png
│   ├── wheelRearLeft.png
│   └── taillightLeft.png
└── rearRight/
    ├── body.png
    ├── trunk.png
    ├── rearBumper.png
    ├── rearWindshield.png
    ├── doorRearRight.png
    ├── wheelRearRight.png
    └── taillightRight.png
```

## Image Requirements:
- All images should be transparent PNG files
- Images should be properly aligned so they overlay correctly
- Recommended size: 400x300px for consistent display
- Each part should be isolated with transparent background

## Usage:
The CarViewer2D component will automatically load these images based on the current view and display them as clickable layers.
