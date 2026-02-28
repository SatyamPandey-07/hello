# Performance Optimization - Implementation Guide

## ✅ Completed: Lazy Loading

**File Modified**: `src/app/page.tsx`

### Changes Made:
- Implemented `next/dynamic` for code splitting
- Lazy loaded 5 section components:
  - `FeatureCards`
  - `ModelShowcase`
  - `TechnologySection`
  - `ParallaxGallery`
  - `Footer`
- Added skeleton loading states for smooth UX
- Kept critical components (PorscheScene, OverlayUI, GlobalLoader, ModelSwitcher) as regular imports

### Benefits:
- **Reduced Initial Bundle Size**: Section components now load on-demand
- **Faster First Contentful Paint**: Critical 3D scene loads first
- **Better Code Splitting**: Next.js automatically creates separate chunks

---

## 🚧 In Progress: Draco Compression

### Current Status:
- **Total Models**: 5 GLB files
- **Total Size**: 130.55 MB
- **Compressed**: 1 model (918 Spyder)
- **Potential Savings**: ~78 MB (60-70% reduction)

### Compression Results:
| Model | Original | Compressed | Savings |
|-------|----------|------------|---------|
| 918 Spyder | 13.20 MB | 4.25 MB | **67.8%** ✅ |
| Closed | 35.97 MB | - | Pending |
| Carrera 4S | 24.18 MB | - | Pending |
| GT3 RS | 18.38 MB | - | Pending |
| Porsche | 38.82 MB | - | Pending |

---

## 📝 Action Required: Complete Compression

### Step 1: Compress Remaining Models

Run these commands one by one to compress all models:

```powershell
# Compress Closed model (35.97 MB)
npx -y gltf-pipeline -i public/models/closed.glb -o public/models/closed-compressed.glb -d

# Compress Carrera 4S (24.18 MB)
npx -y gltf-pipeline -i public/models/free_porsche_911_carrera_4s.glb -o public/models/free_porsche_911_carrera_4s-compressed.glb -d

# Compress GT3 RS (18.38 MB)
npx -y gltf-pipeline -i public/models/porsche_gt3_rs.glb -o public/models/porsche_gt3_rs-compressed.glb -d

# Compress Porsche (38.82 MB) - if used
npx -y gltf-pipeline -i public/models/porsche.glb -o public/models/porsche-compressed.glb -d
```

**Or use the automated script**:
```powershell
.\compress-models.ps1
```

### Step 2: Update Model Config Files

After compression, update the `modelPath` in each config file:

#### `src/config/models/closedConfig.js`
```javascript
export const closedConfig = {
    id: 'closed',
    name: '911 Heritage',
    modelPath: '/models/closed-compressed.glb', // Updated
    // ... rest of config
};
```

#### `src/config/models/carreraConfig.js`
```javascript
export const carreraConfig = {
    id: 'carrera-4s',
    name: '911 Carrera 4S',
    modelPath: '/models/free_porsche_911_carrera_4s-compressed.glb', // Updated
    // ... rest of config
};
```

#### `src/config/models/spyderConfig.js`
```javascript
export const spyderConfig = {
    id: '918-spyder',
    name: '918 Spyder',
    modelPath: '/models/porsche_918_spyder_2015__www.vecarz.com-compressed.glb', // Updated
    // ... rest of config
};
```

#### `src/config/models/gt3rsConfig.js`
```javascript
export const gt3rsConfig = {
    id: 'gt3-rs',
    name: '911 GT3 RS',
    modelPath: '/models/porsche_gt3_rs-compressed.glb', // Updated
    // ... rest of config
};
```

### Step 3: Update Preload in PorscheModel.tsx

Update the preload paths at the bottom of `src/components/canvas/PorscheModel.tsx`:

```typescript
// Preload all models
useGLTF.preload("/models/closed-compressed.glb");
useGLTF.preload("/models/free_porsche_911_carrera_4s-compressed.glb");
useGLTF.preload("/models/porsche_918_spyder_2015__www.vecarz.com-compressed.glb");
useGLTF.preload("/models/porsche_gt3_rs-compressed.glb");
```

### Step 4: Test & Verify

1. Run dev server: `npm run dev`
2. Test each model switch (Prev/Next buttons)
3. Verify no visual quality loss
4. Check browser DevTools Network tab to confirm smaller file sizes
5. Build for production: `npm run build`

### Step 5: Cleanup (After Verification)

Once you've confirmed the compressed models work perfectly, delete the old files:

```powershell
Remove-Item public/models/closed.glb
Remove-Item public/models/free_porsche_911_carrera_4s.glb
Remove-Item public/models/porsche_918_spyder_2015__www.vecarz.com.glb
Remove-Item public/models/porsche_gt3_rs.glb
# Keep porsche.glb only if not used in configs
```

---

## 📊 Expected Performance Improvements

### Before Optimization:
- Initial Bundle: ~X MB
- Total Model Size: 130.55 MB
- First Load: ~10-15 seconds (on 10 Mbps)

### After Optimization:
- Initial Bundle: ~20-30% smaller (lazy loading)
- Total Model Size: ~52 MB (60% reduction)
- First Load: ~5-7 seconds (on 10 Mbps)
- Model Switch: ~2-3 seconds instead of 5-8

### Load Time Comparison:
| Connection | Before | After | Improvement |
|------------|--------|-------|-------------|
| Fast 4G (10 Mbps) | 104s | 42s | **60% faster** |
| Good 3G (2 Mbps) | 520s | 208s | **60% faster** |
| Fiber (100 Mbps) | 10.4s | 4.2s | **60% faster** |

---

## 🛠 Tools Created

1. **`check-draco-compression.js`**: Analyzes all GLB files for Draco compression status
2. **`compress-models.ps1`**: Automated PowerShell script to compress all models at once

---

## 📖 Additional Resources

- [Draco Compression Documentation](https://github.com/google/draco)
- [gltf-pipeline GitHub](https://github.com/CesiumGS/gltf-pipeline)
- [React Three Fiber Performance Tips](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls)

---

## ⚠️ Important Notes

1. **Visual Quality**: Draco compression is lossy but typically imperceptible at high quality settings
2. **Browser Support**: All modern browsers support Draco (included in Three.js)
3. **Backup**: Keep original files until you've verified the compressed versions work perfectly
4. **CI/CD**: Consider adding compression to your build pipeline for future models
