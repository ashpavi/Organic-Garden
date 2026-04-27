import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebaseConfig";

const isFirebaseReady = Boolean(db?.app?.options?.projectId);


/* GET ALL CATEGORIES */

export const getCategories = async () => {

  if (!isFirebaseReady) {
    return [];
  }

  const categoryCollection = collection(db, "categories");

  const snapshot = await getDocs(categoryCollection);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));

};


/* ADD CATEGORY */

export const addCategory = async (categoryData) => {

  if (!isFirebaseReady) {
    throw new Error("Firebase is not configured.");
  }

  const categoryCollection = collection(db, "categories");

  const docRef = await addDoc(categoryCollection, categoryData);

  return docRef.id;

};


/* UPDATE CATEGORY */

export const updateCategory = async (id, updatedData) => {

  if (!isFirebaseReady) {
    throw new Error("Firebase is not configured.");
  }

  const categoryRef = doc(db, "categories", id);

  await updateDoc(categoryRef, updatedData);

};


/* DELETE CATEGORY */

export const deleteCategory = async (id) => {

  if (!isFirebaseReady) {
    throw new Error("Firebase is not configured.");
  }

  const categoryRef = doc(db, "categories", id);

  await deleteDoc(categoryRef);

};