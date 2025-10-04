/**
 * Error handling utilities
 * Provides user-friendly error messages for common Supabase errors
 */

/**
 * Parse Supabase errors into user-friendly messages
 * @param {Object} error - Supabase error object
 * @returns {string} - User-friendly error message
 */
export const handleSupabaseError = (error) => {
  if (!error) return 'An unexpected error occurred';

  const errorMessage = error.message?.toLowerCase() || '';

  // Authentication errors
  if (errorMessage.includes('invalid login credentials') || errorMessage.includes('invalid email or password')) {
    return 'Invalid email or password. Please try again.';
  }

  if (errorMessage.includes('email not confirmed')) {
    return 'Please confirm your email address before logging in.';
  }

  if (errorMessage.includes('user already registered')) {
    return 'An account with this email already exists.';
  }

  if (errorMessage.includes('password should be at least')) {
    return 'Password must be at least 8 characters long.';
  }

  // Database errors
  if (errorMessage.includes('duplicate key') || errorMessage.includes('unique constraint')) {
    return 'This record already exists. Please use a different value.';
  }

  if (errorMessage.includes('foreign key constraint') || errorMessage.includes('violates foreign key')) {
    return 'Cannot delete this record because it is referenced by other data.';
  }

  if (errorMessage.includes('not found') || errorMessage.includes('no rows')) {
    return 'The requested record was not found.';
  }

  if (errorMessage.includes('permission denied') || errorMessage.includes('row level security')) {
    return 'You do not have permission to perform this action.';
  }

  // Network errors
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'Network error. Please check your internet connection and try again.';
  }

  if (errorMessage.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }

  // Validation errors
  if (errorMessage.includes('invalid input syntax')) {
    return 'Invalid data format. Please check your input and try again.';
  }

  if (errorMessage.includes('value too long')) {
    return 'One or more fields exceed the maximum length.';
  }

  // Default fallback
  return error.message || 'An unexpected error occurred. Please try again.';
};

/**
 * Format error for display
 * @param {Object} error - Error object
 * @param {string} context - Context of where the error occurred (e.g., 'adding contact')
 * @returns {string} - Formatted error message
 */
export const formatError = (error, context = '') => {
  const baseMessage = handleSupabaseError(error);

  if (context) {
    return `Error ${context}: ${baseMessage}`;
  }

  return baseMessage;
};

/**
 * Check if error is a network error
 * @param {Object} error - Error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  if (!error) return false;

  const errorMessage = error.message?.toLowerCase() || '';
  return errorMessage.includes('network') ||
         errorMessage.includes('fetch') ||
         errorMessage.includes('timeout');
};

/**
 * Check if error is an authentication error
 * @param {Object} error - Error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  if (!error) return false;

  const errorMessage = error.message?.toLowerCase() || '';
  return errorMessage.includes('login') ||
         errorMessage.includes('credentials') ||
         errorMessage.includes('authentication') ||
         errorMessage.includes('unauthorized');
};
