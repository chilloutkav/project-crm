import { z } from 'zod';

/**
 * Validation schemas using Zod
 * Prevents XSS attacks and ensures data integrity
 */

// Contact validation schema
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z.string()
    .email('Invalid email format')
    .max(254, 'Email must not exceed 254 characters'),

  job_title: z.string()
    .min(2, 'Job title must be at least 2 characters')
    .max(100, 'Job title must not exceed 100 characters')
    .optional()
    .or(z.literal('')),

  company: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must not exceed 200 characters')
    .optional()
    .or(z.literal(''))
});

// Deal validation schema
export const dealSchema = z.object({
  deal_name: z.string()
    .min(2, 'Deal name must be at least 2 characters')
    .max(200, 'Deal name must not exceed 200 characters'),

  deal_stage: z.enum(['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'], {
    errorMap: () => ({ message: 'Please select a valid deal stage' })
  }),

  deal_type: z.enum(['New Business', 'Existing Business', 'Renewal'], {
    errorMap: () => ({ message: 'Please select a valid deal type' })
  }).optional(),

  amount: z.number({
    invalid_type_error: 'Amount must be a number',
    required_error: 'Amount is required'
  })
    .positive('Amount must be greater than 0')
    .max(999999999, 'Amount must not exceed 999,999,999')
});

// Note validation schema
export const noteSchema = z.object({
  title: z.string()
    .min(2, 'Title must be at least 2 characters')
    .max(200, 'Title must not exceed 200 characters'),

  details: z.string()
    .min(10, 'Details must be at least 10 characters')
    .max(5000, 'Details must not exceed 5000 characters')
});

// User signup validation schema
export const signupSchema = z.object({
  first_name: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),

  last_name: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),

  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  email: z.string()
    .email('Invalid email format')
    .max(254, 'Email must not exceed 254 characters'),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')
});

/**
 * Password strength validation
 * Checks for complexity requirements
 */
export const validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;
  const isValid = passedChecks === 5;

  let strength = 'weak';
  if (passedChecks >= 4) strength = 'medium';
  if (passedChecks === 5) strength = 'strong';

  return { checks, strength, isValid, score: passedChecks };
};

/**
 * Generic validation helper
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {Object} data - Data to validate
 * @returns {Object} - { success: boolean, errors: Object }
 */
export const validateData = (schema, data) => {
  try {
    schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _general: 'Validation failed' } };
  }
};

/**
 * Sanitize string input
 * Removes potentially dangerous characters
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;

  // Remove any HTML tags
  return str.replace(/<[^>]*>/g, '').trim();
};
