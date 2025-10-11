import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebase";
import { enqueueSnackbar } from "notistack";

// Rental type definition
type Rental = {
  id: string;
  costume: string;
  clientName: string;
  contactNumber: string;
  rentalDate: { seconds: number } | Date | null;
  rentalValue: number;
  guarantee: number;
  returnDate: { seconds: number } | Date | null;
  returned: boolean;
};

// Save a new rental to Firestore
export const saveRental = async (rentalData: unknown) => {
  enqueueSnackbar("Arriendo registrado con éxito!", {
    variant: "success",
  });
  return await addDoc(collection(db, "rentals"), rentalData);
};

// Fetch all rentals, ordered by rental date (newest first)
export const fetchRentals = async (): Promise<Rental[] | null> => {
  try {
    const q = query(collection(db, "rentals"), orderBy("rentalDate", "desc"));

    const querySnapshot = await getDocs(q);
    const rentalData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      costume: doc.data().costume,
      clientName: doc.data().clientName,
      rentalDate: doc.data().rentalDate,
      rentalValue: doc.data().rentalValue,
      guarantee: doc.data().guarantee,
      returned: doc.data().returned,
      contactNumber: doc.data().contactNumber,
      returnDate: doc.data().returnDate,
    })) as Rental[];
    console.log(rentalData);

    return rentalData;
  } catch (error) {
    console.error("Error al cargar los disfraces: ", error);
    return null;
  }
};

// Fetch a single rental by ID
export const getRentalById = async (id: string) => {
  try {
    console.log("printing by id", id);

    const docRef = doc(db, "rentals", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const rentalData = {
        id: docSnap.id,
        costume: docSnap.data()?.costume,
        clientName: docSnap.data()?.clientName,
        rentalDate: docSnap.data()?.rentalDate,
        rentalValue: docSnap.data()?.rentalValue,
        guarantee: docSnap.data()?.guarantee,
        returned: docSnap.data()?.returned,
        returnDate: docSnap.data()?.returnDate,
        contactNumber: docSnap.data()?.contactNumber,
      };
      return rentalData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

// Update a rental by ID
export async function updateRentalById(id: string, rentalData: Rental) {
  try {
    const rentalRef = doc(db, "rentals", id);
    await updateDoc(rentalRef, rentalData); // Update all of the doc values
    console.log(rentalData);

    enqueueSnackbar(`Arriendo modificado con éxito!`, {
      variant: "success",
    });
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    enqueueSnackbar("Error al actualizar arriendo!", {
      variant: "error",
    });
    return false;
  }
}
