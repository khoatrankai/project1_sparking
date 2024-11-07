
import * as crypto from "crypto";
export function encryptJson(jsonData: object, secretKey: string): string {
    const jsonString = JSON.stringify(jsonData);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    
    let encrypted = cipher.update(jsonString, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return iv.toString('hex') + ':' + encrypted;
}

export function decryptJson(encryptedData: string, secretKey: string): object {
    try{
        const [ivHex, encryptedText] = encryptedData.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
        
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    }catch(err){
        return {}
    }
   
  }