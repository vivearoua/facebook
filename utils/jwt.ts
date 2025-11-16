import jwt from "jsonwebtoken";

const secretKey = "default-secret-key";


/**
 * 
 * @param payload 
 * @param expiresIn 
 * @returns 
 */

export const generateToken = (payload: object, expiresIn = "25d"): string => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

/**
 * 
 * @param token
 * @returns 
 * @throws 
 */
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Token verification failed");
  }
};
