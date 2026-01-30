import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User,
    UserCredential,
    sendEmailVerification,
    updateProfile
} from 'firebase/auth';
import { auth } from '@/config/firebase.config';

/**
 * Sign up a new user with email and password
 */
export const signUpWithEmail = async (
    email: string,
    password: string,
    displayName?: string,
    skipEmailVerification: boolean = false
): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update display name if provided
        if (displayName && userCredential.user) {
            await updateProfile(userCredential.user, { displayName });
        }

        // Send email verification if not skipped
        if (userCredential.user && !skipEmailVerification) {
            await sendEmailVerification(userCredential.user);
        }

        return userCredential;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to create account');
    }
};

/**
 * Sign in an existing user with email and password
 */
export const signInWithEmail = async (
    email: string,
    password: string
): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to sign in');
    }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
    try {
        await firebaseSignOut(auth);
    } catch (error: any) {
        throw new Error(error.message || 'Failed to sign out');
    }
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

/**
 * Listen to authentication state changes
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

/**
 * Get Firebase auth error message in user-friendly format
 */
export const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please sign in instead.';
        case 'auth/invalid-email':
            return 'Invalid email address format.';
        case 'auth/operation-not-allowed':
            return 'Email/password accounts are not enabled. Please contact support.';
        case 'auth/weak-password':
            return 'Password is too weak. Please use at least 6 characters.';
        case 'auth/user-disabled':
            return 'This account has been disabled. Please contact support.';
        case 'auth/user-not-found':
            return 'No account found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your connection.';
        default:
            return 'An error occurred. Please try again.';
    }
};
