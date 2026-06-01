import { cookies } from "next/headers";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || "fretelab-secret-key-12345";
export const COOKIE_NAME = "fretelab_admin_session";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  expires: number;
}

// Password hashing helper using standard Node pbkdf2
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, hash] = storedHash.split(":");
    if (!salt || !hash) return false;
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === verifyHash;
  } catch (error) {
    return false;
  }
}

// Simple signed session implementation (dependency-free token)
export function signSession(payload: SessionPayload): string {
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadStr).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(payloadBase64)
    .digest("base64url");
  return `${payloadBase64}.${signature}`;
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const [payloadBase64, signature] = token.split(".");
    if (!payloadBase64 || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(payloadBase64)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payloadStr = Buffer.from(payloadBase64, "base64url").toString("utf8");
    const payload = JSON.parse(payloadStr) as SessionPayload;

    if (Date.now() > payload.expires) {
      return null; // Expired
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    
    const session = verifySession(token);
    if (session && (session.role === "ADMIN" || session.role === "admin")) {
      return session;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function setAdminSession(user: { id: string; email: string; name: string; role: string }) {
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const token = signSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    expires,
  });
  
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
