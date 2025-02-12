interface PasswordStrengthResult {
  score: number;
  feedback: {
    warning?: string;
    suggestions: string[];
  };
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const score = Object.values(checks).filter(Boolean).length;

  const feedback: PasswordStrengthResult['feedback'] = {
    suggestions: [],
    warning: undefined
  };

  if (!checks.length) feedback.suggestions.push('Password should be at least 8 characters long');
  if (!checks.uppercase) feedback.suggestions.push('Include at least one uppercase letter');
  if (!checks.lowercase) feedback.suggestions.push('Include at least one lowercase letter');
  if (!checks.numbers) feedback.suggestions.push('Include at least one number');
  if (!checks.specialChars) feedback.suggestions.push('Include at least one special character');

  if (score <= 2) feedback.warning = 'Weak password';
  else if (score <= 4) feedback.warning = 'Medium strength password';

  return { score, feedback };
}