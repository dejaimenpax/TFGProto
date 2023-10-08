const encrypt = (str, key) => {
    let result = "";
    try {
        for (let i = 0; i < str.length; i++) {
            const encryptedChar = String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            result += encryptedChar;
        }
        return window.btoa(result); // Codificar en Base64 después de la operación XOR
    } catch (error) {
        return ""; // Devuelve un string vacío si la desencriptación falla debido a un error
    }
};
  
const decrypt = (str, key) => {
    let result = "";
    try {
        const base64Decoded = window.atob(str); // Decodificar desde Base64
        for (let i = 0; i < base64Decoded.length; i++) {
            result += String.fromCharCode(base64Decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    } catch (error) {
        return ""; // Devuelve un string vacío si la desencriptación falla debido a un error
    }
};

module.exports = {
    encrypt,
    decrypt,
};