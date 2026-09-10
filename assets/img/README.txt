IMAGE SLOTS — drop files here with these exact names and the page picks them up.
Until a file exists, the page shows a dashed placeholder naming the slot.

  show/     — IN PLACE. Seven 3000x1600 collages, one per product family,
              resized to 1800px wide. These run as the hero slideshow. They sit
              on pure black, which is why the band uses object-fit:contain over
              a black ground: nothing is cropped and the letterbox is invisible.
              Replacements should keep the black ground and roughly 1.875:1.

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

Use JPG for the photography (quality ~80, under ~400 KB each).
