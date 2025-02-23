import { BKDRHash } from "../src/bkdr-hash.ts";
import { assert, test } from "vitest";

test("BKDRHash should return different value for different string", () => {
  assert.notEqual(BKDRHash("abc"), BKDRHash("hij"));
});

test("BKDRHash should work for very long string", () => {
  let longstr = "";
  for (let i = 0; i < 10 * 1000; i++) {
    longstr += "Hello World.";
  }
  const hash = BKDRHash(longstr);
  assert.notEqual(hash, Infinity);
  assert.notEqual(hash, 0);

  const hash2 = BKDRHash(longstr.substring(0, longstr.length - 1));
  assert.notEqual(hash, hash2);
});
