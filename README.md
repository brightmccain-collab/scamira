# Amira Aldahab Gold Investment Platform

A professional, high-conversion gold investment platform with application funnel, testimonials, and secure contact channels.

## 🚀 Features

- **Landing Page**: Professional gold sales funnel with testimonials
- **Application Page**: Pre-qualification quiz + detailed application form
- **Image Carousel**: Visual showcase with 9 premium images
- **WhatsApp Integration**: Direct contact for faster processing
- **Google Script Integration**: Automated Telegram notifications
- **Responsive Design**: Mobile-first, premium financial aesthetic
- **Security**: Scam warnings and official channel verification

## 📁 Project Structure

```
├── index.html              # Main landing page
├── application.html        # Application form with quiz
├── vercel.json            # Vercel deployment config
├── package.json           # Project metadata
├── README.md              # This file
├── favicon.*              # Favicon files
├── 1.jpg - 9.jpg          # Carousel images
├── hero-image.jpg         # Hero section image
├── testimonials/          # Testimonial images directory
├── about/                 # About section images directory
└── google-script-template.js # Google Apps Script template
```

## 🌐 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel --prod
```

### Manual Deployment

Simply upload all files to your web server. No build process required.

## ⚙️ Configuration

### Google Script Integration

1. Open `google-script-template.js`
2. Replace `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
3. Deploy as Google Apps Script Web App
4. Copy the URL and replace `YOUR_SCRIPT_ID` in `application.html`

### WhatsApp Number

Update WhatsApp number in:
- `index.html` (footer and CTA sections)
- `application.html` (success state)

## 🎨 Design System

- **Primary Colors**: Black, White, Gold (#D4AF37)
- **Typography**: Clean, professional sans-serif
- **Layout**: Centered, max-width containers
- **Aesthetic**: Premium financial/luxury

## 📱 Features

### Landing Page
- Hero section with compelling copy
- Process explanation
- Testimonials with images
- Benefits section
- WhatsApp CTA
- Application CTA
- Footer with security warnings

### Application Page
- Pre-qualification quiz
- Common questions FAQ
- Comprehensive application form
- Success state with WhatsApp button
- Google Script integration

### Carousel
- 9 images with captions
- Auto-play (5s intervals)
- Manual navigation
- Responsive design
- Hover pause functionality

## 🔒 Security Features

- Official channel verification
- Scam warnings
- HTTPS headers
- XSS protection
- Frame protection

## 📞 Contact

- **WhatsApp**: +1 (281) 906-3800
- **Email**: apply@amiraaldahab.online
- **Business Hours**: Monday - Friday, 9AM - 6PM EST

## 📄 License

MIT License - Feel free to use for your projects.

---

*Built with ❤️ by Amira Aldahab*
