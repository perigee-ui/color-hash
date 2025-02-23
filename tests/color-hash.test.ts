import { assert, test } from "vitest";
import { ColorHash } from "../src/index.ts";
import { v4 } from "uuid";

test("ColorHash#Hue: should return the hash color based on default hue", () => {
  const hash = new ColorHash();
  for (let i = 0; i < 100; i++) {
    const hue = hash.hsl(v4())[0];
    assert.deepEqual(hue >= 0 && hue < 359, true); // hash % 359 means max 358
  }
});

test("ColorHash#Hue: should return the hash color based on given hue value", () => {
  const hash = new ColorHash({ hue: 10 });
  for (let i = 0; i < 100; i++) {
    const hue = hash.hsl(v4())[0];
    assert.deepEqual(hue, 10);
  }
});

test("ColorHash#Hue: should return the hash color based on given hue range", () => {
  for (let min = 0; min < 361; min += 60) {
    for (let max = min + 1; max < 361; max += 60) {
      const hash = new ColorHash({ hue: { min, max } });
      for (let i = 0; i < 100; i++) {
        const hue = hash.hsl(v4())[0];
        assert.deepEqual(hue >= min && hue < max, true);
      }
    }
  }
});

test("ColorHash#Hue: should work for multiple hue ranges", () => {
  var ranges = [
    { min: 30, max: 90 },
    { min: 180, max: 210 },
    { min: 270, max: 285 },
  ];
  const hash = new ColorHash({ hue: ranges });
  for (let i = 0; i < 100; i++) {
    const hue = hash.hsl(v4())[0];
    assert.deepEqual(
      ranges.some((range) => hue >= range.min && hue < range.max),
      true
    );
  }
});

test("ColorHash#LS: should return color based on given lightness and saturation", () => {
  const hash = new ColorHash({ lightness: 0.5, saturation: 0.5 });
  const [h, s, l] = hash.hsl(v4());
  assert.deepEqual(s, 0.5);
  assert.deepEqual(l, 0.5);
});

test("ColorHash should return the hash color based on given lightness array and saturation array", () => {
  const hash = new ColorHash({
    lightness: [0.9, 1],
    saturation: [0.9, 1],
  });
  const [h, s, l] = hash.hsl(v4());
  assert.deepEqual([0.9, 1].includes(s), true);
  assert.deepEqual([0.9, 1].includes(l), true);
});

test("Custom hash function", () => {
  const customHash = function (str: string) {
    var hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return hash;
  };

  const hash = new ColorHash({ hash: customHash });
  const h = customHash("abc") % 359;

  assert.deepEqual(hash.hsl("abc")[0], h);
});
