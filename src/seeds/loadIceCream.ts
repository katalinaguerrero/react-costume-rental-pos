import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "firebase";
import { barcodeAndNames, heladosData, updatePrices } from "./iceCreamData";

// Adds initial helado data to Firestore if it doesn't exist already
export const initialSaveDataToFirebase = async () => {
  try {
    const heladosCollection = collection(db, "helados");
    for (const helado of heladosData) {
      const q = query(heladosCollection, where("helado", "==", helado.helado));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(heladosCollection, helado);
        console.log(`Added: ${helado.helado}`);
      } else {
        console.log(`Helado ${helado.helado} already exists, skipping.`);
      }
    }
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data: ", error);
  }
};

// Adds barcodes to existing helado documents in Firestore
export const updateBulkDataBarcode = async () => {
  try {
    const heladoCollection = collection(db, "helados");

    for (const { barcode, name } of barcodeAndNames) {
      const q = query(heladoCollection, where("helado", "==", name));
      const querySnapshot = await getDocs(q);

      for (const docSnapshot of querySnapshot.docs) {
        const docRef = doc(db, "helados", docSnapshot.id);
        await updateDoc(docRef, { barcode: barcode });
        console.log(`Added barcode for: ${name} to ${barcode}`);
      }
    }

    console.log("Barcode update completed.");
  } catch (error) {
    console.error("Error updating barcodes:", error);
  }
};

// Updates the prices for existing Ice Cream documents in Firestore
export const updateBulkDataPrices = async () => {
  try {
    const heladoCollection = collection(db, "helados");

    for (const { precio: precio, name } of updatePrices) {
      const q = query(heladoCollection, where("helado", "==", name));
      const querySnapshot = await getDocs(q);

      for (const docSnapshot of querySnapshot.docs) {
        const docRef = doc(db, "helados", docSnapshot.id);
        await updateDoc(docRef, { precio: precio });
        console.log(`Updated price for: ${name} to ${precio}`);
      }
    }

    console.log("Barcode update completed.");
  } catch (error) {
    console.error("Error updating barcodes:", error);
  }
};
