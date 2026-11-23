import { describe, expect, it } from "vitest";
import { formatEur } from "../src/lib/api";

describe("formatEur", () => {
  it("prikaže znesek v evrih z decimalno vejico", () => {
    expect(formatEur(2.5)).toMatch(/^2,50\s€$/);
  });

  it("pretvori znesek iz niza, kot ga vrne API", () => {
    expect(formatEur("10")).toMatch(/^10,00\s€$/);
  });
});
