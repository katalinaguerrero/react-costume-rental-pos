import RentalForm from "components/Rental/Form/Form";
import CostumesList from "components/Rental/List/RentalWrap"; // Asegúrate de importar todos los componentes necesarios
import Grid from "components/Sales/GalleryMode/Grid/Grid";
import POSModePage from "Pages/Sales/POSModePage";

interface AppRoute {
  path: string;
  element: JSX.Element;
  showInNavBar: boolean;
  windowTitle: string;
  navbarTitle?: string;
}

export const routes: AppRoute[] = [
  {
    windowTitle: "Arriendo de Disfraces",
    navbarTitle: "Arrendar",
    path: "/",
    element: <RentalForm />,
    showInNavBar: true,
  },
  {
    windowTitle: "Lista de Arriendos",
    navbarTitle: "Lista de Arriendos",
    path: "/arriendos",
    element: <CostumesList />,
    showInNavBar: true,
  },
  {
    windowTitle: "Detalle Arriendo",
    path: "/arriendo/:id",
    element: <RentalForm />,
    showInNavBar: false,
  },
  {
    windowTitle: "Galería de Helados",
    navbarTitle: "Galería",
    path: "/galeria",
    element: <Grid />,
    showInNavBar: false,
  },
  {
    windowTitle: "Compra de Helados Osorno",
    navbarTitle: "Osorno",
    path: "/CompraHelados",
    element: <POSModePage esCompra={true} />,
    showInNavBar: false,
  },
  {
    windowTitle: "Venta de Helados",
    navbarTitle: "Venta de Helados",
    path: "/helados",
    element: <POSModePage />,
    showInNavBar: true,
  },
];
