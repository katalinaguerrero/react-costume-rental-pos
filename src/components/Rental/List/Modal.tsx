import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "components/Rental/Actions/Actions.module.css";
import Voucher from "components/Rental/Print/Voucher";
// Definimos la interfaz para las props del modal
interface ModalProps {
  onConfirm: () => void; // La función que se llamará al confirmar
}

const Modal = forwardRef(({ onConfirm }: ModalProps, ref) => {
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [rentalData, setRental] = useState<any>(null); // Cambia a `any` según tu tipo

  // Función para abrir el modal
  const openModal = (costume: any) => {
    setIsActive(true);
    setRental(costume);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsActive(false);
    setRental(null); // Limpia los datos del disfraz al cerrar
  };

  // Función para manejar la confirmación
  const handleConfirm = () => {
    onConfirm(); // Llama a la función del padre
    closeModal(); // Cierra el modal después de confirmar
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal(); // Cierra el modal si se hace clic fuera
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal(); // Cierra el modal al presionar Escape
      }
    });

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeModal();
        }
      });
    };
  }, [rentalData]);

  // Exponer las funciones para que puedan ser usadas en el componente padre
  useImperativeHandle(ref, () => ({
    openModal,
  }));
  if (!rentalData) return null;
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content" ref={modalRef}>
        <div className="box">
          <div className="content">
            <h2 className="has-text-centered">
              ¿Marcar este arriendo como
              <span className="has-text-danger">
                {" "}
                {!rentalData.returned ? "Sí" : "No"}{" "}
              </span>
              devuelto?
            </h2>
            <table className="table is-fullwidth">
              <tbody>
                {rentalData ? ( // Verificamos que rentalData no sea null
                  <>
                    <tr>
                      <th>Cliente</th>
                      <td>{rentalData.clientName}</td>
                    </tr>
                    <tr>
                      <th>Disfraz</th>
                      <td>{rentalData.costume}</td>
                    </tr>
                    <tr>
                      <th>Valor</th>
                      <td>$ {rentalData.rentalValue}</td>
                    </tr>
                    <tr>
                      <th>Garantía</th>
                      <td>$ {rentalData.guarantee}</td>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <td>{rentalData.id}</td>
                    </tr>
                    <tr>
                      <th>Actualización:</th>
                      <td>
                        {rentalData.returned ? "Sí" : "No"}{" "}
                        <i className="fa-solid fa-arrow-right"></i>{" "}
                        {!rentalData.returned ? "Sí" : "No"}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={2} className="has-text-centered">
                      Cargando datos...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="columns is-centered">
            <div className="column">
              <button
                className={`${styles.buttonPrimary} button is-fullwidth`}
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
            <div className="column is-narrow">
              {rentalData && <Voucher costumeId={rentalData.id} />}
            </div>
            <div className="column ">
              <button
                className="button is-danger is-outlined is-fullwidth"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      ></button>
    </div>
  );
});

export default Modal;
