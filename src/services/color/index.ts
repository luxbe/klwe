export type HSLA = [h: number, s: number, l: number, a: number];

class ColorService {
  kustomColorToHex(color: string) {
    const matches = /#(.{2})(.{6})/.exec(color);

    return `#${matches[2]}${matches[1]}`;
  }

  hexToHsla(hex: string): HSLA {
    const a = (parseInt(hex.substr(1, 2), 16) / 255) * 100;
    const r = parseInt(hex.substr(3, 2), 16);
    const g = parseInt(hex.substr(5, 2), 16);
    const b = parseInt(hex.substr(7, 2), 16);

    return this.rgbaToHsla(r, g, b, a);
  }

  rgbaToHsla(r: number, g: number, b: number, a: number): HSLA {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h: number, s: number;
    const l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [
      Math.round(h * 360),
      Math.round(s * 100),
      Math.round(l * 100),
      Math.round(a),
    ];
  }

  hslaToHex(hsl: [h: number, s: number, l: number, a: number]): string {
    let [h, s, l, _a] = hsl;

    s /= 100;
    l /= 100;

    const b = (100 * s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - b * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };

    const a = Math.round((_a / 100) * 255)
      .toString(16)
      .padStart(2, '0');

    return `#${a}${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }

  hslaToString(hsla: HSLA) {
    return `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3]})`;
  }
}

export const colorService = new ColorService();
