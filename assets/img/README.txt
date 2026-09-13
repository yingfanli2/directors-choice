IMAGE SLOTS — drop files here with these exact names and the page picks them up.
Until a file exists, the page shows a dashed placeholder naming the slot.

  show/     — IN PLACE. Eight collages, one per product family, 1800px wide:
              the hero slideshow on screens wider than 560px. They sit on pure
              black, which is why the band uses object-fit:contain over a black
              ground: nothing is cropped and the letterbox is invisible. Most
              are 2.05:1; 01 is cropped to 2.9:1 so its long single row fills
              the width of the window.

  show-portrait/ — IN PLACE. The same eight for phones (560px and narrower).
              1200x1500 (4:5) to match the phone band so the products show
              large; 07 stays 1000x1946 because its photo fills the tall
              frame. Keep the black ground, and keep products clear of the top
              ~13% (logo and menu button) and the bottom ~7% (slide dots).

  clients/  — IN PLACE (disney, universal-studios, seaworld,
             kennedy-space-center). Supplied by the client and knocked out to a
             single light tone so the four marks read as one row rather than
             four competing brand palettes. The trust strip shows each
             client's wordmark as type until a logo file appears, then swaps to
             the image automatically. Expected filenames:

               clients/disney.png
               clients/universal-studios.png
               clients/seaworld.png
               clients/kennedy-space-center.png

             White or light knockout versions, transparent PNG, about 200px
             tall. See NOTES.md before adding these - using a client's mark in
             your own marketing usually needs their written permission.


BRAND ASSETS - already in place, generated from "DC Logo.pdf". Do not overwrite
without regenerating both colourways together.

  logo.png                 900 x 247    brand red #CB2026 — the ONLY colourway.
                                        The mark is always the brand red, on
                                        every background. Do not substitute a
                                        light version for contrast reasons.
  favicon.png              512 x 512    "D" in paper on a brand-red rounded square
  apple-touch-icon.png     180 x 180    same mark, square (iOS masks its own corners)

Use JPG for the photography (quality ~80-88, under ~400 KB each).
