# Love Story Website 🌹

A premium, romantic, and interactive Valentine's Day website. This project features cinematic transitions, a typewriter effect, looping romantic text, and floating photo animations.

## ✨ Features
- **Responsive Design**: optimized for Mobile and Desktop.
- **Typewriter Effect**: romantic texts reveal character-by-character.
- **Floating Photos**: subtle drifting animations for a cinematic feel.
- **Lightbox**: click any photo to see it in detail.
- **WhatsApp Integration**: messages are sent directly to your phone.
- **Eternal Promise**: a special interactive replay button.

---

## 🛠️ Configuration

Before you deploy, make sure to set your own WhatsApp number:

1. Open `js/script.js`.
2. Find the line (around line 176):
   ```javascript
   const myPhoneNumber = "6285794774532";
   ```
3. Replace the placeholder with your own number in **international format** (e.g., `62` for Indonesia, without `+`).

---

## 🚀 How to Deploy (FOR FREE)

To share this website and access it on your phone, you need to "host" it. Here are the two easiest ways to do it for free:

### Option 1: Netlify (Fastest - No Code Needed)
1. Go to [Netlify](https://www.netlify.com/).
2. Create a free account or log in.
3. Once logged in, go to the **"Sites"** tab.
4. Look for the box that says **"Drag and drop your site folder here"**.
5. Drag your entire project folder (the one containing `index.html`) into that box.
6. Wait a few seconds for it to upload.
7. **Done!** Netlify will give you a link (e.g., `yoursite.netlify.app`) that you can open on your phone.

### Option 2: GitHub Pages (Best for Updates)
1. Create a repository on [GitHub](https://github.com/).
2. Upload all your files (including `css`, `js`, and `assets` folders) to the repository.
3. Go to **Settings** > **Pages** in your repository.
4. Under **"Build and deployment"**, set the Source to **"Deploy from a branch"**.
5. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
6. Wait 1-2 minutes. GitHub will provide a link at the top (e.g., `username.github.io/repository-name`).

---

## 📸 Customizing Media

- **Photos**: Replace files in `assets/images/`.
- **Music**: Place your file in `assets/music/` and name it `videoplayback.mp3`.
- **Text**: Edit the content inside `index.html`.

Made with ❤️ by Antigravity
