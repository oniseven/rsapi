import AsyncHandler from "../AsyncHandler";

describe("AsyncHandler middleware", () => {
  it("should call the wrapped function and handle resolve promises", async () => {
    const mockFn = jest.fn().mockResolvedValue("success");
    const mockNext = jest.fn();
    const req = {};
    const res = {};

    const wrappedFn = AsyncHandler(mockFn);

    await wrappedFn(res, res, mockNext);

    expect(mockFn).toHaveBeenCalledWith(req, res, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should call next with the error when the wrapped function rejected", async () => {
    const mockError = new Error("test error");
    const mockFn = jest.fn().mockRejectedValue(mockError);
    const mockNext = jest.fn();
    const req = {};
    const res = {};

    const wrappedFn = AsyncHandler(mockFn);

    await wrappedFn(res, res, mockNext);

    expect(mockFn).toHaveBeenCalledWith(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
