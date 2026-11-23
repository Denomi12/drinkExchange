import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiError, api, setCsrfToken } from "../src/lib/api";

const jsonResponse = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

afterEach(() => {
  vi.unstubAllGlobals();
  setCsrfToken(null);
});

describe("api", () => {
  it("pri napaki vrže ApiError s statusom in sporočilom strežnika", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(jsonResponse(401, { error: "Niste prijavljeni" })),
    );
    const error = await api("/orders").catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 401, message: "Niste prijavljeni" });
  });

  it("pri POST zahtevi pošlje CSRF žeton", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(201, {}));
    vi.stubGlobal("fetch", fetchMock);
    setCsrfToken("zeton");
    await api("/orders", { method: "POST" });
    expect(
      (fetchMock.mock.calls[0][1].headers as Headers).get("X-CSRF-Token"),
    ).toBe("zeton");
  });

  it("pri GET zahtevi ne pošlje CSRF žetona", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, []));
    vi.stubGlobal("fetch", fetchMock);
    setCsrfToken("zeton");
    await api("/drinks");
    expect(
      (fetchMock.mock.calls[0][1].headers as Headers).get("X-CSRF-Token"),
    ).toBeNull();
  });
});
