import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const isFirebaseReady = Boolean(db?.app?.options?.projectId);

//  SUBSCRIBE
export const subscribePromoConfig = (onData, onError) => {
  if (!isFirebaseReady) {
    onData(null);
    return () => {};
  }

  const promoRef = doc(db, "homepage", "promo");

  return onSnapshot(
    promoRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data());
      } else {
        onData(null);
      }
    },
    (error) => {
      console.error("Promo fetch error:", error);
      if (onError) onError(error);
    }
  );
};

//  SAVE 
export const savePromoConfig = async (data) => {
  if (!isFirebaseReady) {
    throw new Error("Firebase is not configured.");
  }

  const promoRef = doc(db, "homepage", "promo");

  await setDoc(promoRef, data, { merge: true });
};