
# Optimized Images Usage Guide

Generated on: 2025-09-22T08:27:59.501Z

## Available Optimized Images


### feature-icon

```tsx
import { featureiconImage } from '../components/OptimizedImages';

// Usage
<featureiconImage />
```

**Generated sizes:** 320w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### hero-background

```tsx
import { herobackgroundImage } from '../components/OptimizedImages';

// Usage
<herobackgroundImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport


## Manual Image Usage

For custom implementations, use this pattern:

```tsx
<picture>
  <source
    srcSet="/images/optimized/image-320w.webp 320w, /images/optimized/image-640w.webp 640w, /images/optimized/image-1024w.webp 1024w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    type="image/webp"
  />
  <source
    srcSet="/images/optimized/image-320w.jpg 320w, /images/optimized/image-640w.jpg 640w, /images/optimized/image-1024w.jpg 1024w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    type="image/jpeg"
  />
  <img
    src="/images/optimized/image-1024w.jpg"
    alt="Descriptive alt text"
    loading="lazy"
    decoding="async"
    className="w-full h-auto"
  />
</picture>
```

## Performance Benefits

- **WebP Format:** 25-35% smaller file sizes compared to JPEG
- **Responsive Images:** Appropriate image size for each device
- **Lazy Loading:** Images load only when needed
- **Progressive Enhancement:** Fallback to JPEG for older browsers
- **Optimized Quality:** Balanced quality vs file size

## File Structure

```
public/images/
├── original-images/     # Your original images
└── optimized/          # Generated optimized images
    ├── image-320w.webp
    ├── image-320w.jpg
    ├── image-640w.webp
    ├── image-640w.jpg
    └── ...
```
