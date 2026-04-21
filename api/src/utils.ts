import path from "path";

export const safeSegment = (rawInput: string): string => {
    const input = String(rawInput || "").trim();

    if (!input)
        throw new Error("Empty path segment");

    if (input.includes("/") ||
        input.includes("\\") ||
        input === "." ||
        input === ".."
    ) {
        throw new Error(`Invalid segment: ${input}`);
    }
    return input
};

export const safePaths = (input: string) => {
    const normalized = path.posix.normalize(String(input));

    if (
        normalized === ".." ||
        normalized.startsWith("../") ||
        path.isAbsolute(normalized)
    ) {
        throw new Error("Invalid path");
    }
    return normalized;
}