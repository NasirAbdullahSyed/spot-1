import { initializeApp } from 'firebase/app';
import firebaseConfig from './config';
import  { getStorage, ref } from 'firebase/storage';

export const firebaseApp = initializeApp(firebaseConfig)
export const storage = getStorage(firebaseApp, 'gs://spot-41cb1.appspot.com/')

export const imageRef = ref(storage, '/images/')