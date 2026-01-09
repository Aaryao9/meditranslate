// src/shared/utils/sanitizer.util.js
export const sanitizeHtml = (text) => {
  if (!text) return text;
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const sanitizeMedicalReport = (text) => {
  // Remove potentially harmful characters while preserving medical terminology
  return text
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
};
