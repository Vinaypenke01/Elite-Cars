import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    UploadResult
} from 'firebase/storage';
import { storage } from '@/config/firebase.config';

/**
 * Upload a car image to Firebase Storage
 */
export const uploadCarImage = async (
    file: File,
    carId: string,
    imageIndex: number = 0
): Promise<string> => {
    try {
        const timestamp = Date.now();
        const fileName = `${carId}_${imageIndex}_${timestamp}.${file.name.split('.').pop()}`;
        const storageRef = ref(storage, `cars/${carId}/${fileName}`);

        const uploadResult: UploadResult = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadResult.ref);

        return downloadURL;
    } catch (error: any) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
};

/**
 * Upload multiple car images
 */
export const uploadCarImages = async (
    files: File[],
    carId: string
): Promise<string[]> => {
    try {
        const uploadPromises = files.map((file, index) =>
            uploadCarImage(file, carId, index)
        );
        return await Promise.all(uploadPromises);
    } catch (error: any) {
        console.error('Error uploading images:', error);
        throw new Error('Failed to upload images');
    }
};

/**
 * Delete an image from Firebase Storage
 */
export const deleteCarImage = async (imageUrl: string): Promise<void> => {
    try {
        // Extract the path from the URL
        const path = decodeURIComponent(
            imageUrl.split('/o/')[1]?.split('?')[0] || ''
        );

        if (!path) {
            throw new Error('Invalid image URL');
        }

        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
    } catch (error: any) {
        console.error('Error deleting image:', error);
        throw new Error('Failed to delete image');
    }
};

/**
 * Get image URL from storage path
 */
export const getImageUrl = async (imagePath: string): Promise<string> => {
    try {
        const imageRef = ref(storage, imagePath);
        return await getDownloadURL(imageRef);
    } catch (error: any) {
        console.error('Error getting image URL:', error);
        throw new Error('Failed to get image URL');
    }
};
