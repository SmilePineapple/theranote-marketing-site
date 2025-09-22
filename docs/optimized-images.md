
# Optimized Images Usage Guide

Generated on: 2025-09-22T09:56:59.391Z

## Available Optimized Images


### app-calendar

```tsx
import { appcalendarImage } from '../components/OptimizedImages';

// Usage
<appcalendarImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### app-clients

```tsx
import { appclientsImage } from '../components/OptimizedImages';

// Usage
<appclientsImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### app-dashboard

```tsx
import { appdashboardImage } from '../components/OptimizedImages';

// Usage
<appdashboardImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### app-homepage

```tsx
import { apphomepageImage } from '../components/OptimizedImages';

// Usage
<apphomepageImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### app-login

```tsx
import { apploginImage } from '../components/OptimizedImages';

// Usage
<apploginImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### app-notes

```tsx
import { appnotesImage } from '../components/OptimizedImages';

// Usage
<appnotesImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### app-reports

```tsx
import { appreportsImage } from '../components/OptimizedImages';

// Usage
<appreportsImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### app-sessions

```tsx
import { appsessionsImage } from '../components/OptimizedImages';

// Usage
<appsessionsImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

### app-settings

```tsx
import { appsettingsImage } from '../components/OptimizedImages';

// Usage
<appsettingsImage />
```

**Generated sizes:** 320w, 640w, 768w, 1024w, 1280w, 1920w
**Formats:** WebP (modern browsers), JPEG (fallback)
**Loading:** Lazy loading enabled
**Responsive:** Automatic sizing based on viewport

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
