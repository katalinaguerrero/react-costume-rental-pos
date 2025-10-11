import styles from "./Actions.module.css";
import React, { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { enqueueSnackbar } from "notistack";
import Voucher from "components/Rental/Print/Voucher";
import { saveRental, updateRentalById } from "services/rentals/rentalServices";
import LoadingBar from "react-top-loading-bar";
import { Rental } from "components/Rental/List/RentalWrap"; // Cambia esta ruta según donde esté la interfaz Rental
import { calculateRentalTotal } from "utils/number.utils";

interface RentalActionsProps {
  onClear: () => void;
  onReload: () => void;
  id?: string;
  costume: string;
  clientName: string;
  contactNumber: string;
  rentalValue: string;
  guarantee: string;
  isModification: boolean;
  returned: boolean;
  rentalDate: { seconds: number } | Date | null;
}

type LoadingBar = any;

const RentalActions: React.FC<RentalActionsProps> = ({
  onClear,
  onReload,
  costume,
  clientName,
  contactNumber,
  rentalValue,
  guarantee,
  isModification,
  id,
  returned,
  rentalDate,
}) => {
  const [costumeId, setCostumeId] = useState("");
  const [saving, setSaving] = useState(false);
  const [voucherKey, setVoucherKey] = useState(0); // State to force re-render
  const loadingBarRef = useRef<LoadingBar>(null); // Ref for loading bar

  const handleSave = async () => {
    if (
      !costume ||
      !clientName ||
      !contactNumber ||
      !rentalValue ||
      !guarantee
    ) {
      enqueueSnackbar("Todos los campos son obligatorios!", {
        variant: "error",
      });
      return; // Salir de la función si hay campos vacíos
    }
    loadingBarRef.current?.continuousStart();
    if (isModification && id) {
      try {
        const rentalData: Rental = {
          id: id, // Este debe ser el id correspondiente o generado
          costume,
          clientName,
          contactNumber,
          rentalValue: parseFloat(rentalValue),
          guarantee: parseFloat(guarantee),
          returnDate: returned ? new Date() : null, // No devuelto inicialmente
          returned: returned,
          rentalDate,
        };
        console.log("Actions", rentalData);

        setCostumeId(rentalData.id);
        onReload();
        // Actualiza todo el objeto RentalData
        const updateSuccess = await updateRentalById(id, rentalData); // Método que actualiza en la base de datos
        console.log(updateSuccess);
      } catch (e) {
        console.error("Error al agregar el arriendo: ", e);
        enqueueSnackbar("Error al agregar el arriendo!", {
          variant: "error",
        });
      }
    } else {
      try {
        setSaving(true);
        const rentalData: Partial<Rental> = {
          costume,
          clientName,
          contactNumber,
          rentalDate: new Date(), // Fecha de arriendo actual
          rentalValue: parseFloat(rentalValue),
          guarantee: parseFloat(guarantee),
          returnDate: null, // No devuelto inicialmente
          returned: false, // No devuelto inicialmente
        };

        // Actualiza todo el objeto RentalData
        const rental = await saveRental(rentalData);
        console.log("Arriendo registrado con éxito: ", rental.id);
        setCostumeId(rental.id);

        onClear();
      } catch (e) {
        console.error("Error al agregar el arriendo: ", e);
        enqueueSnackbar("Error al agregar el arriendo!", {
          variant: "error",
        });
      } finally {
        setSaving(false);
      }
    }
    setVoucherKey((prevKey) => prevKey + 1); // Increment key to reset Voucher
    loadingBarRef.current?.complete();
  };

  useEffect(() => {
    if (id) setCostumeId(id);
  }, [id]);

  const handleClear = () => {
    // Lógica para limpiar los campos del formulario
    onClear();
    setVoucherKey((prevKey) => prevKey + 1); // Increment key to reset Voucher
  };

  return (
    <>
      <div className="field">
        <label className="label" htmlFor="txtTotal">
          Total
        </label>
        <div className="control">
          <NumericFormat
            className="input"
            id="txtTotal"
            value={calculateRentalTotal(rentalValue, guarantee)}
            disabled
            thousandSeparator="."
            decimalSeparator=","
            prefix="$"
            decimalScale={0} // Solo enteros
          />
        </div>
      </div>

      <div className={`${styles.gridActions} is-8`}>
        <LoadingBar color="#5f22d9" ref={loadingBarRef} />
        <button
          type="button"
          className={`${styles.buttonPrimary} button is-primary mr-3 mt-5 mb-2`}
          onClick={handleSave}
        >
          {isModification ? "Editar Arriendo" : "Guardar Arriendo"}
        </button>

        <a
          href="/arriendos"
          className={`button  mr-3 mt-5 mb-2`}
          style={{
            textTransform: "none",
          }}
        >
          Lista de Arriendos
        </a>
        {costumeId && (
          <Voucher
            key={voucherKey} // Add key to force re-render
            costumeId={costumeId}
            text="Imprimir Voucher"
            saving={saving}
          />
        )}

        <button
          type="button"
          className="button is-danger mr-3 mt-5 mb-2"
          onClick={handleClear}
          title="Borrar campos"
        >
          <i className="fa-solid fa-eraser has-text-white"></i>
        </button>
      </div>
    </>
  );
};

export default RentalActions;
