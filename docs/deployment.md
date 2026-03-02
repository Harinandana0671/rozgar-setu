# Rozgar Setu - Deployment Guide

This guide covers deploying Rozgar Setu to a live hosting platform.

---

## Deployment Checklist

Before deploying, ensure:

- [ ] All code is committed to Git
- [ ] No console errors in development
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Updated README with live link
- [ ] Security review completed
- [ ] Performance optimized
- [ ] .gitignore configured

---

## Option 1: GitHub Pages (Recommended for Free Hosting)

### Setup

1. **Push code to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/rozgar-setu.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Under "Build and deployment":
     - Set Source to `Deploy from a branch`
     - Select branch: `main`
     - Select folder: `/root`
   - Click Save

3. **Configure for root redirect**
   - Check that `index.html` exists in root
   - It should redirect visitors to `src/index.html`

4. **Access your site**
   ```
   https://yourusername.github.io/rozgar-setu
   ```

### Update README
```markdown
## 🌐 Live Demo
[Visit Rozgar Setu](https://yourusername.github.io/rozgar-setu)
```

---

## Option 2: Netlify (Easy Deployment)

### Setup via Git

1. **Sign up at [netlify.com](https://netlify.com)**

2. **Connect GitHub repository**
   - Click "New site from Git"
   - Select GitHub
   - Authorize and choose `rozgar-setu` repository

3. **Configure build settings**
   - Build command: (leave empty for static site)
   - Publish directory: `src` (or `/` for root)
   - Click Deploy

4. **Access your site**
   ```
   https://rozgar-setu.netlify.app
   ```

### Setup via Drag & Drop

1. Build your site locally (already done)
2. Compress the `src/` folder
3. Drag & drop to Netlify dashboard
4. Get instant live link

### Custom Domain
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records per Netlify instructions

---

## Option 3: Vercel

### Setup

1. **Sign up at [vercel.com](https://vercel.com)**

2. **Import Git repository**
   - Click "New Project"
   - Select GitHub repository
   - Vercel auto-detects settings

3. **Configure**
   - Root directory: `.`
   - Build command: (leave empty)
   - Output directory: `src` (or `/`)

4. **Deploy**
   ```
   https://rozgar-setu.vercel.app
   ```

---

## Option 4: Traditional Web Hosting (cPanel)

### Setup

1. **Upload files via FTP/SFTP**
   ```bash
   # Using FileZilla or similar FTP client
   # Upload contents of src/ to public_html/ folder
   ```

2. **Directory structure on hosting**
   ```
   public_html/
   ├── index.html
   ├── search-results.html
   ├── worker-dashboard.html
   ├── style.css
   ├── main.js
   └── ...other HTML files
   ```

3. **Update root index.html**
   - Keep redirect: `<meta http-equiv="refresh" content="0; url=index.html">`

4. **Enable HTTPS**
   - Use Let's Encrypt (free)
   - Configure in cPanel
   - Update all links to HTTPS

---

## Option 5: AWS S3 + CloudFront

### Setup S3 Bucket

1. **Create S3 bucket**
   ```bash
   aws s3 mb s3://rozgar-setu-bucket
   ```

2. **Upload files**
   ```bash
   # Upload src/ contents
   aws s3 sync src/ s3://rozgar-setu-bucket/
   ```

3. **Configure bucket for static hosting**
   - Bucket settings → Properties
   - Enable "Static website hosting"
   - Index document: `index.html`
   - Error document: `index.html`

4. **Set bucket policy (for public access)**
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [{
           "Sid": "PublicReadGetObject",
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::rozgar-setu-bucket/*"
       }]
   }
   ```

5. **Access via**
   ```
   http://rozgar-setu-bucket.s3-website-us-east-1.amazonaws.com
   ```

### Add CloudFront for HTTPS & Speed

1. **Create CloudFront distribution**
   - Origin: S3 bucket
   - Enable HTTPS
   - Add custom domain

2. **Access via**
   ```
   https://yourdomain.com
   ```

---

## Post-Deployment Checklist

### Testing
- [ ] Site loads without errors
- [ ] Navigation works
- [ ] Forms submit data
- [ ] Voice search works
- [ ] Mobile layout looks good
- [ ] All pages accessible

### Security
- [ ] Using HTTPS (green lock)
- [ ] No sensitive data exposed
- [ ] Content Security Policy headers set
- [ ] Security headers configured

### Performance
- [ ] Page loads fast (< 3s)
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] Lighthouse score > 90

### Monitoring
- [ ] Set up error tracking
- [ ] Monitor uptime
- [ ] Check analytics
- [ ] Monitor performance metrics

---

## Optimization Tips

### For Faster Loading

1. **Optimize images**
   ```bash
   # Use WebP format
   convert image.png -quality 75 image.webp
   
   # Compress PNG/JPG
   imagemin images/ --out-dir=optimized-images/
   ```

2. **Minify CSS & JS** (if using build tools)
   ```bash
   # Using cssnano and terser
   cssnano style.css -o style.min.css
   terser main.js -o main.min.js
   ```

3. **Add caching headers**
   ```
   Cache-Control: public, max-age=31536000
   ```

4. **Enable gzip compression**
   ```apache
   # In .htaccess
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript
   </IfModule>
   ```

### SEO Optimization

Add to `src/index.html` `<head>`:
```html
<meta name="description" content="Find work today with Rozgar Setu. Connect with workers and employers in your area.">
<meta name="keywords" content="jobs, workers, hiring, India">
<meta name="author" content="Rozgar Setu">
<meta property="og:title" content="Rozgar Setu - Find Work Today">
<meta property="og:description" content="Connect workers and employers instantly">
```

---

## Continuous Deployment (GitHub Actions)

### Auto-deploy on push

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        run: |
          mkdir -p deploy/src
          cp -r src/* deploy/src/
          cp index.html deploy/
          cp -r public/* deploy/
          echo "Deployment complete"
```

---

## Monitoring & Analytics

### Add Google Analytics

```html
<!-- Add to <head> of src/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitor Uptime

- [Uptime Robot](https://uptimerobot.com) - Free uptime monitoring
- [Pingdom](https://www.pingdom.com) - Uptime & performance monitoring
- Platform-specific analytics (GitHub Pages, Netlify, Vercel)

---

## Troubleshooting

### Pages not loading
- Check file paths are correct
- Verify stylesheet and JavaScript links
- Check browser console for errors

### HTTPS issues
- Enable SSL certificate
- Update .htaccess to redirect HTTP → HTTPS
- Check security headers

### Performance issues
- Use lighthouse to audit
- Optimize images
- Enable caching
- Use CDN

### Data not persisting
- Check LocalStorage availability
- Verify browser privacy settings
- Check console for errors

---

## Production Checklist (Pre-Launch)

- [ ] Domain registered and configured
- [ ] SSL certificate installed
- [ ] HTTPS enforced
- [ ] Sitemap.xml created
- [ ] robots.txt created
- [ ] 404 page configured
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] Backups enabled
- [ ] Monitoring tools setup
- [ ] Security headers configured
- [ ] Performance optimized

---

## Version Archive

Keep records of deployments:

```markdown
| Version | Date | Platform | URL | Notes |
|---------|------|----------|-----|-------|
| v1.0 | Mar 2, 2026 | GitHub Pages | ... | Initial launch |
```

---

**Last Updated:** March 2, 2026  
**Recommended Platform:** GitHub Pages or Netlify (free, easy, reliable)
