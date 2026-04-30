import { existsSync } from "node:fs";
import { join } from "node:path";

export function hasPublicAsset(assetPath: string) {
  const cleanPath = assetPath.replace(/^\/+/, "");
  return existsSync(join(process.cwd(), "public", cleanPath));
}
