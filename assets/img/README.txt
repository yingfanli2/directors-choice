IMAGE SLOTS — drop files here with these exact names and the page picks them up.
Until a file exists, the page shows a dashed placeholder naming the slot.

  gallery/  — IN PLACE. Fifteen product photographs, resized to 900px on the
             long side. These ARE the hero: the whole first screen is the arc,
             so they carry the first impression.

             Thirteen are shot on pure black, which is why the cards use
             object-fit:contain over a black ground — the letterbox and the
             photo background are the same colour, so nothing is cropped and
             nothing shows a seam. Keep that convention for replacements.

             Cards share a HEIGHT, not a width: a landscape photograph is
             simply a wider card. Any aspect ratio is fine.

             14-personalisation-kiosk.jpg and 15-in-park-fixture.jpg came from
             HEIC originals whose EXIF said portrait while the stored buffer
             was landscape. `sips -s format jpeg` does NOT apply that rotation,
             so they had to be turned a quarter turn clockwise afterwards. If
             you ever add another iPhone photo this way, check it stands up.

  about.jpg               1200 x 1500    4:5    development / production shot
  product-plush.jpg       1200 x 1500    4:5
  product-silicone.jpg    1200 x 1500    4:5
  product-drinkware.jpg   1200 x 1500    4:5
  product-injection.jpg   1200 x 1500    4:5
  facility.jpg            1400 x 1050    4:3    factory / QC / inspection
  og.jpg                  1200 x  630    1.91:1 social share preview


  clients/  — EMPTY, and the page works without it. The trust strip shows each
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
