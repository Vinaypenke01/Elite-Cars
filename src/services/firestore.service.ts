import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    DocumentData,
    QueryConstraint
} from 'firebase/firestore';
import { db } from '@/config/firebase.config';
import { Car } from '@/data/carsData';

// Collection names
const COLLECTIONS = {
    CARS: 'cars',
    BOOKINGS: 'bookings',
    ADMINS: 'admins',
    RECENTLY_SOLD: 'recently_sold',
    SETTINGS: 'settings'
};

// ============ SETTINGS COLLECTION ============

export interface DealershipSettings {
    id: string;
    address: string;
    phone: string;
    email: string;
    businessHours: {
        mon_sat: string;
        sunday: string;
    };
}

/**
 * Get dealership settings
 */
export const getDealershipSettings = async (): Promise<DealershipSettings | null> => {
    try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as DealershipSettings;
        }
        return null;
    } catch (error: any) {
        console.error('Error fetching settings:', error);
        throw new Error('Failed to fetch dealership settings');
    }
};

/**
 * Update dealership settings
 */
export const updateDealershipSettings = async (data: Partial<DealershipSettings>): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, 'contact');
        await setDoc(docRef, data, { merge: true });
    } catch (error: any) {
        console.error('Error updating settings:', error);
        throw new Error('Failed to update dealership settings');
    }
};

// ============ CARS COLLECTION ============

/**
 * Get all cars from Firestore
 */
export const getCars = async (): Promise<Car[]> => {
    try {
        const carsRef = collection(db, COLLECTIONS.CARS);
        const snapshot = await getDocs(carsRef);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as any as Car));
    } catch (error: any) {
        console.error('Error fetching cars:', error);
        throw new Error('Failed to fetch cars');
    }
};

/**
 * Get a single car by ID
 */
export const getCarById = async (id: string): Promise<Car | null> => {
    try {
        const carRef = doc(db, COLLECTIONS.CARS, id);
        const carSnap = await getDoc(carRef);

        if (carSnap.exists()) {
            return { ...carSnap.data(), id: carSnap.id } as any as Car;
        }
        return null;
    } catch (error: any) {
        console.error('Error fetching car:', error);
        throw new Error('Failed to fetch car details');
    }
};

/**
 * Get featured cars
 */
export const getFeaturedCars = async (): Promise<Car[]> => {
    try {
        const carsRef = collection(db, COLLECTIONS.CARS);
        const q = query(carsRef, where('featured', '==', true));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as any as Car));
    } catch (error: any) {
        console.error('Error fetching featured cars:', error);
        throw new Error('Failed to fetch featured cars');
    }
};

/**
 * Add a new car (Admin only)
 */
export const addCar = async (carData: Omit<Car, 'id'>): Promise<string> => {
    try {
        const carsRef = collection(db, COLLECTIONS.CARS);
        const docRef = await addDoc(carsRef, carData);
        return docRef.id;
    } catch (error: any) {
        console.error('Error adding car:', error);
        throw new Error('Failed to add car');
    }
};

/**
 * Update a car (Admin only)
 */
export const updateCar = async (id: string, carData: Partial<Car>): Promise<void> => {
    try {
        const carRef = doc(db, COLLECTIONS.CARS, id);
        await updateDoc(carRef, carData as DocumentData);
    } catch (error: any) {
        console.error('Error updating car:', error);
        throw new Error('Failed to update car');
    }
};

/**
 * Delete a car (Admin only)
 */
export const deleteCar = async (id: string): Promise<void> => {
    try {
        const carRef = doc(db, COLLECTIONS.CARS, id);
        await deleteDoc(carRef);
    } catch (error: any) {
        console.error('Error deleting car:', error);
        throw new Error('Failed to delete car');
    }
};

// ============ BOOKINGS COLLECTION ============

export interface Booking {
    id?: string;
    carId: string;
    carName: string;
    packageType: 'basic' | 'premium' | 'ultimate';
    customerName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    message?: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: Timestamp;
}

/**
 * Create a new booking
 */
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    try {
        const bookingsRef = collection(db, COLLECTIONS.BOOKINGS);
        const docRef = await addDoc(bookingsRef, {
            ...bookingData,
            status: 'pending',
            createdAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error: any) {
        console.error('Error creating booking:', error);
        throw new Error('Failed to create booking');
    }
};

/**
 * Get all bookings (Admin only)
 */
export const getBookings = async (): Promise<Booking[]> => {
    try {
        const bookingsRef = collection(db, COLLECTIONS.BOOKINGS);
        const q = query(bookingsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
    } catch (error: any) {
        console.error('Error fetching bookings:', error);
        throw new Error('Failed to fetch bookings');
    }
};

/**
 * Get a single booking by ID
 */
export const getBookingById = async (id: string): Promise<Booking | null> => {
    try {
        const bookingRef = doc(db, COLLECTIONS.BOOKINGS, id);
        const bookingSnap = await getDoc(bookingRef);

        if (bookingSnap.exists()) {
            return { id: bookingSnap.id, ...bookingSnap.data() } as Booking;
        }
        return null;
    } catch (error: any) {
        console.error('Error fetching booking:', error);
        throw new Error('Failed to fetch booking details');
    }
};

/**
 * Update booking status (Admin only)
 */
export const updateBookingStatus = async (
    id: string,
    status: Booking['status']
): Promise<void> => {
    try {
        const bookingRef = doc(db, COLLECTIONS.BOOKINGS, id);
        await updateDoc(bookingRef, { status });
    } catch (error: any) {
        console.error('Error updating booking status:', error);
        throw new Error('Failed to update booking status');
    }
};

// ============ ADMIN COLLECTION ============

export interface AdminProfile {
    uid: string;
    email: string;
    displayName?: string;
    role: 'admin' | 'super_admin';
    createdAt: Timestamp;
}

/**
 * Create admin profile in Firestore
 */
export const createAdminProfile = async (
    uid: string,
    data: Omit<AdminProfile, 'uid' | 'createdAt'>
): Promise<void> => {
    try {
        const adminRef = doc(db, COLLECTIONS.ADMINS, uid);
        await setDoc(adminRef, {
            uid,
            ...data,
            createdAt: Timestamp.now()
        }, { merge: true });
    } catch (error: any) {
        console.error('Error creating admin profile:', error);
        throw new Error('Failed to create admin profile');
    }
};

/**
 * Get admin profile
 */
export const getAdminProfile = async (uid: string): Promise<AdminProfile | null> => {
    try {
        const adminRef = doc(db, COLLECTIONS.ADMINS, uid);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
            return adminSnap.data() as AdminProfile;
        }
        return null;
    } catch (error: any) {
        console.error('Error fetching admin profile:', error);
        throw new Error('Failed to fetch admin profile');
    }
};

// ============ RECENTLY SOLD COLLECTION ============

export interface RecentlySold {
    id?: string;
    carName: string;
    price: string;
    soldDate: Timestamp;
    image: string;
}

/**
 * Get recently sold cars
 */
export const getRecentlySold = async (limit: number = 10): Promise<RecentlySold[]> => {
    try {
        const soldRef = collection(db, COLLECTIONS.RECENTLY_SOLD);
        const q = query(soldRef, orderBy('soldDate', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.slice(0, limit).map(doc => ({ id: doc.id, ...doc.data() } as RecentlySold));
    } catch (error: any) {
        console.error('Error fetching recently sold cars:', error);
        throw new Error('Failed to fetch recently sold cars');
    }
};
