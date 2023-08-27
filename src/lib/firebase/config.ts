// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	initializeFirestore,
	persistentLocalCache,
	persistentMultipleTabManager
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDPS1XWKVx3WCXVtrNvT-gl47msxvERcc4',
	authDomain: 'supapower-kesval-com.firebaseapp.com',
	projectId: 'supapower-kesval-com',
	storageBucket: 'supapower-kesval-com.appspot.com',
	messagingSenderId: '532538746792',
	appId: '1:532538746792:web:4d3edfcff2bce0bd44df9d',
	measurementId: 'G-H6DSVDD387'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const firestore = initializeFirestore(app, {
	localCache: persistentLocalCache({
		tabManager: persistentMultipleTabManager()
	})
});
