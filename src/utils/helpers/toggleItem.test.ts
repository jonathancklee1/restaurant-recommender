import { describe, expect, it } from "vite-plus/test";
import { toggleItem } from "./toggleItem";

describe("toggleItem", () => {
  it("adds an item to list", () => {
    expect(toggleItem([], "new item")).toEqual(["new item"]);
  });
  it("removes the item from list if it contains it", () => {
    expect(toggleItem(["new item"], "new item")).toEqual([]);
  });

  it("adds a missing item to the end of a non-empty list", () => {
    expect(toggleItem(["a", "b"], "c")).toEqual(["a", "b", "c"]);
  });
  it("removes an item from the middle and keeps the rest in order", () => {
    expect(toggleItem(["a", "b", "c"], "b")).toEqual(["a", "c"]);
  });

  it("does not change the original list", () => {
    const x = ["x"];
    expect(toggleItem(x, "y")).not.toBe(x);
  });

  it("toggling the same item twice gives back the original list", () => {
    const x = ["x"];
    const newArr = toggleItem(x, "y");
    const newArr2 = toggleItem(newArr, "y");
    expect(newArr2).toEqual(["x"]);
  });

  it("works with numbers", () => {
    expect(toggleItem([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
  });
  it("differentiates between number and string", () => {
    expect(toggleItem([1, 2, "3"], 3)).toEqual([1, 2, "3", 3]);
  });

  it("does not remove case-sensitive strings ", () => {
    expect(toggleItem(["one", "two"], "Two")).toEqual(["one", "two", "Two"]);
  });

  it("removes every copy of the input", () => {
    expect(toggleItem([1, 2, 3, 1, 1], 1)).toEqual([2, 3]);
  });

  it("adds a new reference of an object with the same keys and values", () => {
    expect(toggleItem([{ a: 1, b: 2 }], { a: 1, b: 2 })).toEqual([
      { a: 1, b: 2 },
      { a: 1, b: 2 },
    ]);
  });
});
