import fs from "fs";
import { importSPKI, exportJWK } from "jose";
import path from "path";

async function generateJWKS() {
  const publicPem = fs.readFileSync(
    path.join(__dirname, "certs", "public.pem"),
    "utf-8",
  );

  const publicKey = await importSPKI(publicPem, "RS256");
  const jwk = await exportJWK(publicKey);
  const jwks = { keys: [jwk] };

  const jwksPath = path.join(__dirname, "public", ".well-known");
  fs.mkdirSync(jwksPath, { recursive: true });

  fs.writeFileSync(
    path.join(jwksPath, "jwks.json"),
    JSON.stringify(jwks, null, 2),
  );
}

void generateJWKS();
