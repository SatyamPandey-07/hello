# Audio Assets

This folder contains audio files for the Porsche 911 3D experience.

## Required Audio Files

To enable audio features, add the following files to this directory:

### Engine Sounds
- **engine-idle.mp3** - Low rumble, looping background engine sound (5-10s loop)
- **engine-rev-low.mp3** - Gentle rev sound (~2-3s)
- **engine-rev-mid.mp3** - Medium intensity rev (~2-3s)
- **engine-rev-high.mp3** - High intensity rev, sporty (~2-4s)

### Interaction Sounds
- **door-open.mp3** - Car door opening sound (~1-2s)

### Ambient
- **ambient.mp3** - Subtle background atmosphere, looping (10-20s loop)

## Where to Find Audio

You can source these sounds from:

1. **Free Resources:**
   - [Freesound.org](https://freesound.org/) - Search for "porsche engine" or "sports car"
   - [Zapsplat](https://www.zapsplat.com/) - Free sound effects
   - [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/)

2. **Premium Libraries:**
   - Epidemic Sound
   - AudioJungle
   - Artlist

3. **Recording Tips:**
   - Use high-quality recordings (at least 192kbps MP3 or WAV)
   - Normalize volume levels across files
   - Trim silence from beginnings/endings
   - For loops, ensure seamless transitions

## File Format Guidelines

- **Format:** MP3 or OGG (for web compatibility)
- **Sample Rate:** 44.1kHz or 48kHz
- **Bit Rate:** 128-320 kbps
- **Size:** Keep individual files under 500KB for faster loading

## Fallback

If audio files are missing, the application will still work - audio will simply fail silently with console warnings.
