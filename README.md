# Portfolio Website

A modern, responsive portfolio website built with Astro, React islands, shadcn/ui components, and deployed on GitHub Pages.

## 🚀 Features

- ⚡ **Static Site Generation** with Astro for optimal performance
- 🏝️ **React Islands** for selective interactivity (Hero animation, Project filtering)
- 🎨 **shadcn/ui Components** with Tailwind CSS for beautiful UI
- 📱 **Fully Responsive** design that works on all devices
- 🌐 **GitHub Pages Ready** with automated deployment
- 📝 **Content Collections** for easy project management
- ♿ **Accessible** with WCAG compliant components
- 🔍 **SEO Optimized** with proper meta tags

## 📋 TODO - Personalize Your Portfolio

Before deploying, update the following with your information:

### 1. **Update Site Configuration**
- [ ] Edit `astro.config.mjs` - Replace 'username' with your GitHub username
- [ ] Update site title and description in `src/pages/index.astro`
- [ ] Modify meta tags in `src/layouts/BaseLayout.astro`

### 2. **Hero Section** (`src/components/islands/HeroAnimation.tsx`)
- [ ] Replace "Your Name" with your actual name
- [ ] Update roles array with your job titles
- [ ] Add your profile image to `public/profile.jpg`
- [ ] Update tech stack badges
- [ ] Add your social media links (GitHub, LinkedIn, Email)

### 3. **About Section** (`src/components/sections/About.astro`)
- [ ] Write your bio/introduction
- [ ] Update years of experience
- [ ] Adjust project/client numbers

### 4. **Skills Section** (`src/components/sections/Skills.astro`)
- [ ] Update Frontend skills
- [ ] Update Backend skills
- [ ] Update Tools & DevOps skills
- [ ] Update Design skills
- [ ] Update Marketing skills
- [ ] Update Soft skills

### 5. **Projects** (`src/content/projects/`)
- [ ] Replace sample projects with your actual projects
- [ ] Add project descriptions
- [ ] Include demo and GitHub links
- [ ] Add project screenshots to `public/images/projects/`

### 6. **Contact Section** (`src/components/sections/Contact.astro`)
- [ ] Update email address
- [ ] Add phone number (optional)
- [ ] Update location
- [ ] Add social media links

## 🛠️ Tech Stack

- **Framework**: Astro 5.x
- **UI Components**: React with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:4321`

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run Astro checks
- `npm run lint` - Run TypeScript checks

### Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── islands/      # React interactive components
│   │   └── sections/     # Page sections
│   ├── content/
│   │   └── projects/     # Project markdown files
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── lib/
│       └── utils.ts
├── public/
│   └── images/
└── astro.config.mjs
```

## 🚀 Deployment to GitHub Pages

1. **Update Configuration**:
   - Edit `astro.config.mjs`
   - Replace `username` with your GitHub username
   - If using a custom domain, update the `site` URL

2. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to Settings → Pages in your repository
   - Under "Build and deployment", select "GitHub Actions"
   - The workflow will automatically deploy on push to main

4. **Access Your Site**:
   - Your site will be available at `https://yourusername.github.io/portfolio`
   - First deployment may take a few minutes

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/global.css` to change the color scheme.

### Fonts
Update font imports in `src/layouts/BaseLayout.astro`.

### Components
All UI components are in `src/components/ui/` and can be customized.

## 📝 Adding New Projects

1. Create a new markdown file in `src/content/projects/`
2. Follow the frontmatter schema defined in `src/content/config.ts`
3. Add project images to `public/images/projects/`
4. The project will automatically appear in your portfolio

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using [Astro](https://astro.build) and [shadcn/ui](https://ui.shadcn.com)