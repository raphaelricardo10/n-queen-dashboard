import { formatSeconds } from "./columns";

describe("column formatters", () => {
  describe("time formatters", () => {
    it("should convert to milliseconds", () => {
      expect(formatSeconds(0.001)).toEqual("1 ms");
      expect(formatSeconds(0.01)).toEqual("10 ms");
      expect(formatSeconds(0.1)).toEqual("100 ms");
    });

    it("should add seconds unit (s)", () => {
      expect(formatSeconds(1)).toEqual("1 s");
      expect(formatSeconds(10)).toEqual("10 s");
    });

    it("should convert to minutes", () => {
      expect(formatSeconds(60)).toEqual("1 min");
      expect(formatSeconds(120)).toEqual("2 min");
    });
  });
});
