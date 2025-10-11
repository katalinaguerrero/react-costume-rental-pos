import { db } from "firebase";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { IceCream } from "types";

export const fetchHelados = async (): Promise<IceCream[] | null> => {
  try {
    // Query the 'helados' collection in Firestore
    const q = query(collection(db, "helados"), orderBy("helado", "asc"));

    // Fetch the data from Firestore
    const querySnapshot = await getDocs(q);

    // Map the documents to the structure you need
    const heladosData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      helado: doc.data().helado,
      precioVenta: doc.data().precio,
      precioCompra: doc.data().precioCompra,
      barcode: doc.data().barcode,
    })) as IceCream[];

    console.log(heladosData);

    return heladosData; // Return the fetched helados data
  } catch (error) {
    console.error("Error fetching helados: ", error);
    return null; // Return null or handle the error as needed
  }
};

export const fetchVentas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "ventas"));
    const ventas = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Datos recuperados:", ventas);
    return ventas;
  } catch (error) {
    console.error("Error al recuperar los datos:", error);
  }
};

export const saveVentas = async (data: IceCream[]) => {
  try {
    await addDoc(collection(db, "ventasDev"), {
      helados: data,
      fecha: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
};

export const fetchCompras = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "compras"));
    const compras = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Datos recuperados:", compras);
    return compras;
  } catch (error) {
    console.error("Error al recuperar los datos:", error);
  }
};

export const saveCompras = async (data: IceCream[]) => {
  try {
    await addDoc(collection(db, "compras"), {
      helados: data,
      fecha: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
};
