import { useState, useEffect, useCallback } from "react";
import RentalActions from "components/Rental/Actions/Actions";
import styles from "./Form.module.css";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import Switch from "react-switch";
import { getRentalById } from "services/rentals/rentalServices";
import { Rental } from "components/Rental/List/RentalWrap";
import { getFormattedDate } from "utils/date.utils";
import { MaxLengths } from "constants/lengthLimits";

const RentalForm = () => {
  const [costume, setCostume] = useState("");
  const [clientName, setClientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [value, setValue] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [rentalId, setRentalId] = useState("");
  const [rentalDate, setRentalDate] = useState<Rental["rentalDate"]>(null); // Inicializar con null
  const [returnDate, setReturnDate] = useState<Rental["returnDate"]>(null); // Inicializar con null
  const [isReturned, setReturned] = useState(false);
  const [isModification, setModification] = useState(false);
  const { id } = useParams();

  const fetchRentalData = useCallback(async (id: string) => {
    if (id) {
      const rentalFromApi = await getRentalById(id);
      if (rentalFromApi) {
        setCostume(rentalFromApi.costume);
        setClientName(rentalFromApi.clientName);
        setContactNumber(rentalFromApi.contactNumber);
        setValue(rentalFromApi.rentalValue);
        setGuarantee(rentalFromApi.guarantee);
        setRentalId(rentalFromApi.id);
        setModification(true);

        setRentalDate(rentalFromApi.rentalDate || null);
        setReturnDate(rentalFromApi.returnDate || null);
        setReturned(rentalFromApi.returned);
        console.log("Api", rentalFromApi);

        // Espera hasta el próximo ciclo de renderizado para hacer scroll
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }, 0); // Puedes ajustar el retraso a 0 o 10 ms si es necesario
        });
      } else {
        clearFields();
      }
    } else {
      clearFields();
    }
  }, []);

  // Usa useEffect para establecer los datos solo una vez
  useEffect(() => {
    if (id) {
      fetchRentalData(id);
    } else {
      clearFields();
      setModification(false);
    }
  }, [fetchRentalData, id]); // Ahora se incluye fetchRentalData

  const reloadData = () => {
    fetchRentalData(rentalId);
  };

  const clearFields = () => {
    setCostume("");
    setClientName("");
    setContactNumber("");
    setValue("");
    setGuarantee("");
  };

  return (
    <form className={`${styles.form} section`}>
      {isModification ? (
        <div className="is-horizontal is-horizontal mb-3">
          <div className="field-body">
            <div className="field">
              <label className="label" htmlFor="txtFecha">
                Fecha de Arriendo
              </label>
              <div className="control">
                <input
                  className="input"
                  id="txtFecha"
                  type="text"
                  value={getFormattedDate(rentalDate)} // Aquí llamas a la función
                  disabled
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="txtFecha">
                Fecha de Devolución
              </label>
              <div className="control">
                <input
                  className="input"
                  id="txtFecha"
                  type="text"
                  value={getFormattedDate(returnDate)} // Aquí también
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="field">
        <label className="label" htmlFor="txtDisfraz">
          Disfraz
        </label>
        <div className="control">
          <input
            className="input"
            id="txtDisfraz"
            type="text"
            value={costume}
            onChange={(e) => setCostume(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="txtCliente">
          Nombre Cliente
        </label>
        <div className="control">
          <input
            className="input"
            id="txtCliente"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="txtFono">
          Número de Contacto
        </label>
        <div className="control">
          <input
            className="input"
            id="txtFono"
            maxLength={MaxLengths.phoneNumber}
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="txtValor">
          Valor
        </label>
        <div className="control">
          <NumericFormat
            className="input"
            id="txtValor"
            value={value}
            onValueChange={(values) => setValue(values.value)}
            thousandSeparator="."
            allowNegative={false}
            prefix="$"
            decimalScale={0}
            decimalSeparator=","
            maxLength={MaxLengths.rentalValue}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="txtGarantia">
          Garantía
        </label>
        <div className="control">
          <NumericFormat
            className="input"
            id="txtGarantia"
            value={guarantee}
            onValueChange={(values) => setGuarantee(values.value)}
            thousandSeparator="."
            allowNegative={false}
            prefix="$"
            decimalScale={0}
            decimalSeparator=","
            maxLength={MaxLengths.guarantee}
          />
        </div>
      </div>
      {isModification ? (
        <>
          <div className="field">
            <label className="label" htmlFor="txtDevuelto">
              ¿Devuelto?
            </label>
            <div className="control">
              <Switch
                onChange={(checked) => setReturned(checked)}
                checked={isReturned}
                onColor="#5f22d9"
                handleDiameter={35}
                height={35}
                width={100}
              />
            </div>
          </div>
          <style>
            {`
          svg {
            height: inherit;
            width: inherit;
          }
        `}
          </style>
        </>
      ) : (
        ""
      )}

      <RentalActions
        rentalDate={rentalDate}
        onClear={clearFields}
        onReload={reloadData}
        costume={costume}
        clientName={clientName}
        contactNumber={contactNumber}
        rentalValue={value}
        guarantee={guarantee}
        isModification={isModification}
        returned={isReturned}
        id={rentalId}
      />
    </form>
  );
};

export default RentalForm;
