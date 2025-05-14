import { formatNum } from "./formatNum";

describe("formatNum", () => {
  it("formats basic numbers correctly", () => {
    expect(formatNum(1234.56)).toBe("1,234.56");
    expect(formatNum("1234.56")).toBe("1,234.56");
  });

  it("adds dollar sign when price is true", () => {
    expect(formatNum(1234.56, true)).toBe("$1,234.56");
  });

  it("applies M, B, T suffixes", () => {
    expect(formatNum(1_000_000, true)).toBe("$1.00M");
    expect(formatNum(2500000000, true)).toBe("$2.50B");
    expect(formatNum(8000000000000, true)).toBe("$8.00T");
  });

  it("handles small non-zero values with 6 decimals", () => {
    expect(formatNum(0.00005)).toBe("0.000050");
  });

  it("handles invalid inputs", () => {
    expect(formatNum("not-a-number")).toBe("0.00");
    expect(formatNum("not-a-number", true)).toBe("$0.00");
  });

  it("handles zero properly", () => {
    expect(formatNum(0)).toBe("0.00");
    expect(formatNum(0, true)).toBe("$0.00");
  });
});
