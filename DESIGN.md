---
name: Mystic Inquiry
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#d3bcf7'
  on-secondary: '#392757'
  secondary-container: '#503d6f'
  on-secondary-container: '#c1abe5'
  tertiary: '#cecbe7'
  on-tertiary: '#2f2e43'
  tertiary-container: '#b2b0cb'
  on-tertiary-container: '#434359'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ecdcff'
  secondary-fixed-dim: '#d3bcf7'
  on-secondary-fixed: '#231141'
  on-secondary-fixed-variant: '#503d6f'
  tertiary-fixed: '#e2e0fc'
  tertiary-fixed-dim: '#c6c4df'
  on-tertiary-fixed: '#1a1a2e'
  on-tertiary-fixed-variant: '#45455b'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  h1:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-edge: 32px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is crafted to evoke an atmosphere of modern esotericism—a digital sanctuary where ancient wisdom meets contemporary refinement. The personality is intuitive, wise, and high-end, targeting an audience that seeks both spiritual guidance and a premium, curated experience.

The visual style blends **Glassmorphism** with **Minimalism**. By utilizing translucent layers and ethereal blurs, the interface feels like it exists in a liminal space. This is balanced by a strict adherence to fine-line geometry and significant whitespace, ensuring the application feels like a sophisticated tool rather than a novelty. The tactile element is introduced through "metallic" accents—gold foil and silver light—which provide a grounded, physical contrast to the atmospheric backgrounds.

## Colors

The palette is anchored in deep, nocturnal tones to provide a sense of mystery and focus. The background uses a tiered approach of charcoal blacks and midnight blues to create perceived depth. 

- **Primary Gold (#D4AF37):** Reserved for moments of "enlightenment" — active states, primary calls to action, and intricate foil details.
- **Deep Purple (#2D1B4B):** Used for primary surfaces and containers to maintain a thematic warmth.
- **Midnight Blue (#1A1A2E):** Used for background layering and secondary surface textures.
- **Ethereal Silver (#E0E0E0):** The primary color for typography and delicate borders, ensuring high legibility without the harshness of pure white.

## Typography

Typography in this design system creates a rhythmic contrast between the ceremonial and the functional. **Noto Serif** is used for all headings to establish a literary, authoritative voice. It should be typeset with generous leading to allow the "air" of the design to flow through the text.

**Inter** handles all utility and body text. Its neutral, systematic nature provides a necessary grounding effect, ensuring that complex tarot interpretations remain highly readable. Labels and small metadata should utilize uppercase styling with increased letter spacing to emulate the look of classical inscriptions.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model to create a centered, focused experience reminiscent of a physical reading table. A 12-column grid is used for desktop, while mobile layouts collapse into a single fluid column with significant top and bottom padding.

Spacing is generous. Elements are given "room to breathe" to prevent the interface from feeling cluttered or overwhelming. Large vertical margins (stack-lg) are used to separate distinct phases of the user journey, such as the transition from card selection to interpretation.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Ambient Glows** rather than traditional drop shadows. 

1.  **Level 0 (Base):** Charcoal black (#121212).
2.  **Level 1 (Surface):** Midnight blue (#1A1A2E) with a subtle 1px silver border at 10% opacity.
3.  **Level 2 (Overlay):** Deep purple (#2D1B4B) with a semi-transparent backdrop blur (12px to 20px).

To indicate interactivity or "spiritual energy," components use an outer glow (box-shadow) with the primary gold color at very low opacity (15-20%) and high blur radius (30px+). Fine-line borders (0.5pt to 1pt) are used to define edges without adding visual weight.

## Shapes

The shape language is **Soft (Level 1)**. Elements use a 0.25rem (4px) base radius. This creates a refined, slightly sharp aesthetic that feels more like cut stone or thick cardstock than plastic. 

Tarot card components should use a slightly larger radius (rounded-lg: 8px) to mimic the feel of premium playing cards. Circular elements are reserved exclusively for celestial metaphors, such as moon phase indicators or orb-like buttons.

## Components

### Tarot Cards
The signature component. Cards feature a 1px Gold (#D4AF37) border. On hover, they should trigger a "foil" gradient effect that moves with the cursor and an ambient gold glow. The card back should feature a minimalist, geometric pattern in silver line-work.

### Glowing Buttons
Primary buttons are styled with a solid Midnight Blue fill and a 1px Gold border. The text is rendered in Gold. A persistent, subtle outer glow gives the impression of a light source beneath the button. On press, the glow intensifies.

### Mystical Icons
Icons must be "fine-line" style (1px stroke weight). Avoid filled icons. Use Gold for active icons and Silver for inactive or decorative ones.

### Input Fields
Inputs are minimal: a single Silver bottom border (1px). The placeholder text is italicized Noto Serif to maintain the mystical tone. Upon focus, the border transitions to Gold with a soft glow.

### Chips & Tags
Used for "Arcana" or "Suit" labels. These should be semi-transparent purple with silver text and a Pill-shaped (Level 3) radius to distinguish them from structural UI elements.

### Progress Indicators
Represented by "Lunar Phases." As the user progresses through a reading, an icon transitions from a New Moon to a Full Moon using the Primary Gold color.
