#!/usr/bin/env bash
# Genera variantes responsive (WebP) a partir de los originales en a/.
# Uso: bash scripts/images.sh   (requiere cwebp, dwebp y sips — macOS + Homebrew webp)
set -euo pipefail
cd "$(dirname "$0")/../a"
SRC=../src/img
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

resize() { # src ancho salida calidad
  dwebp -quiet "$1" -o "$TMP/src.png"
  cwebp -quiet -q "$4" -m 6 -sharp_yuv -resize "$2" 0 "$TMP/src.png" -o "$3"
}

for img in portal-dia portal-tarde club valla nocturna casa; do
  native=$(sips -g pixelWidth "$SRC/$img.webp" | awk '/pixelWidth/{print $2}')
  for w in 480 800 1200; do [ "$w" -lt "$native" ] && resize "$SRC/$img.webp" $w "$img-$w.webp" 72; done
  dwebp -quiet "$SRC/$img.webp" -o "$TMP/src.png"   # variante grande al ancho nativo (sin escalar)
  cwebp -quiet -q 72 -m 6 -sharp_yuv "$TMP/src.png" -o "$img-lg.webp"
done
resize "$SRC/logo-light.webp" 320 logo-light-320.webp 82
resize "$SRC/logo-light.webp" 160 logo-light-160.webp 82
resize "$SRC/logo-light.webp" 200 logo-light-200.webp 82
resize "$SRC/logo-mark.webp" 64 logo-mark-64.webp 85
resize "$SRC/logo-firma.webp" 440 logo-firma-440.webp 82

# Imagen Open Graph 1200x630 (JPG: WhatsApp/Facebook no siempre aceptan WebP)
dwebp -quiet "$SRC/portal-dia.webp" -o "$TMP/og.png"
sips -s format jpeg -s formatOptions 80 --resampleWidth 1200 "$TMP/og.png" --out "$TMP/og-w.jpg" >/dev/null
sips --cropToHeightWidth 630 1200 "$TMP/og-w.jpg" --out og-portal.jpg >/dev/null
echo "OK"
