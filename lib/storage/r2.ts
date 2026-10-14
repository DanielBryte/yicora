import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export const R2_BUCKET = process.env.R2_BUCKET_NAME || "";

export function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey || !R2_BUCKET) {
    throw new Error("Private media storage is not configured. Add the Cloudflare R2 settings to the server environment.");
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function storePrivateAsset(key: string, body: Uint8Array, contentType: string) {
  await getR2Client().send(new PutObjectCommand({ Bucket: R2_BUCKET, Key: key, Body: body, ContentType: contentType }));
}

export async function getPrivateAssetUrl(key: string) {
  return getSignedUrl(getR2Client(), new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }), { expiresIn: 900 });
}
