import { Sha256ToInt } from "../src/sha256.ts";
import { assert, test } from "vitest";

test("sha256 test", () => {
  // See also: https://github.com/zenozeng/color-hash/issues/30
  assert.notEqual(
    Sha256ToInt("2018-06-14T17"),
    Sha256ToInt("2018-06-15T09")
  );

  // See also: https://github.com/zenozeng/color-hash/issues/27
  assert.notEqual(Sha256ToInt("myView1"), Sha256ToInt("myView2"));
});
