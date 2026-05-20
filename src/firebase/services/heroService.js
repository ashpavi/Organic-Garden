import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";

const isFirebaseReady = Boolean(db?.app?.options?.projectId);

const normalizeSlide = (slide = {}) => ({
  tag: slide.tag || "",
  title: slide.title || "",
  subtitle: slide.subtitle || "",
  image: slide.image || "",
});

export const subscribeHomepageHeroConfig = (onData, onError) => {
  if (!isFirebaseReady) {
    onData({ slides: [], preferredStyle: "", updatedAt: null });
    return () => {};
  }

  const homepageHeroDocRef = doc(db, "siteConfig", "homepageHero");

  return onSnapshot(
    homepageHeroDocRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        onData({ slides: [], preferredStyle: "", updatedAt: null });
        return;
      }

      const data = snapshot.data();

      onData({
        slides: Array.isArray(data.slides)
          ? data.slides.map(normalizeSlide)
          : [],
        preferredStyle: data.preferredStyle || "",
        updatedAt: data.updatedAt || null,
      });
    },
    onError
  );
};

export const saveHomepageHeroConfig = async ({ slides, preferredStyle = "" }) => {
  if (!isFirebaseReady) {
    throw new Error("Firebase is not configured.");
  }

  const homepageHeroDocRef = doc(db, "siteConfig", "homepageHero");

  const cleanedSlides = (slides || [])
    .map(normalizeSlide)
    .filter((slide) => slide.image);

  await setDoc(
    homepageHeroDocRef,
    {
      slides: cleanedSlides,
      preferredStyle,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};
