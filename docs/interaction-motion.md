# Interaction & Motion Guidelines

## 1. The "Jr Camps" Physics
* **For B2B (Partners):** Motion should be **Smooth, Weighted, and Professional**.
    * *Usage:* Fade-in text on scroll, slow parallax on hero images.
    * *Ease:* `ease-out-cubic` (Soft landing).
* **For B2C (Parents/Kids):** Motion can be **Bouncy, Reactive, and Playful**.
    * *Usage:* Buttons that scale up on hover, cards that tilt slightly.
    * *Ease:* `spring` (Energy).

## 2. Micro-Interactions (Mandatory)
Never leave an interactive element "naked."
* **Buttons:** Must have `hover:scale-105 active:scale-95 transition-all duration-300` classes.
* **Cards:** On hover, apply a subtle lift: `hover:-translate-y-1 hover:shadow-lg`.
* **Inputs:** On focus, border color must transition smoothly to `brand-blue`.

## 3. Loading States
* **Skeleton Loaders:** Never show a blank screen. Use a pulsing gray skeleton that matches the shape of the content (Circle for avatars, Rectangles for text).
* **Image Blur-Up:** All large images must use Next.js `blurDataURL` or a blur transition effect upon loading.