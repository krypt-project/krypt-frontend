# mindvault-frontend | Next.js + TypeScript + TailwindCSS

![Landing page screenshot](<img width="467" height="1079" alt="Capture d'écran 2025-09-07 173334" src="https://github.com/user-attachments/assets/9201d672-c462-4b0a-9048-50dd3bf073d8" />
)

> Example interface of the landing page including Hero, Features, CTA, and Footer sections.

---

## Description

This frontend project is built with **Next.js**, **TypeScript**, and **TailwindCSS**, aiming to create a modern and responsive landing page with:

- **Reusable components**: `Button`, `Card`, `Input`, `Badge`, etc.  
- **Typical landing page sections**: Hero, Features, Testimonials, CTA, Footer.  
- **Consistent design** using **global CSS variables**.  
- **Responsive & accessible**, production-ready.  
- Easily extendable for a **dashboard**, **editor**, or other pages.

---

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/) 
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/) for icons  
- [Tiptap](https://tiptap.dev/) for rich-text editor (optional)  

---

## Project Architecture

```text
src/
 └─ app
     ├─ landing
     │   ├─ components
     │   │   ├─ Header.tsx
     │   │   ├─ Hero.tsx
     │   │   ├─ Features.tsx
     │   │   ├─ Testimonials.tsx
     │   │   ├─ CTA.tsx
     │   │   └─ Footer.tsx
     │   └─ page.tsx
     ├─ dashboard
     │   └─ components
     │       └─ ... (same structure as landing)
     ├─ account-verified
     │   └─ components
     │       └─ ... (same structure as landing)
     └─ login-register
         └─ components
             └─ ... (same structure as landing)
 ├─ components
 │   ├─ atoms
 │   │   ├─ Button.tsx
 │   │   ├─ Badge.tsx
 │   │   └─ Card.tsx
 │   ├─ molecules
 │   │   └─ FeatureCard.tsx
 │   └─ feedback
 ├─ config
 ├─ hooks
 ├─ services
 ├─ styles
 │   ├─ globals.css
 │   ├─ editor.css
 │   ├─ landing.css
 │   └─ dashboard.css
 ├─ types
 └─ utils
 ```
