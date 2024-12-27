import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDGFyh__MoTMjFjC0eV9jArO0vZnevRrxE',
	authDomain: 'todolist-c4ae9.firebaseapp.com',
	projectId: 'todolist-c4ae9',
	storageBucket: 'todolist-c4ae9.firebasestorage.app',
	messagingSenderId: '201545768963',
	appId: '1:201545768963:web:28c255c8bec7d2dd136e36',
	databaseURL: 'https://todolist-c4ae9-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
