import Navbar from "./components/layout/Navbar/Navbar";
import TableContainer from "./components/layout/TableContainer/TableContainer";
import Modal from "./components/ui/Modal/Modal";
import { RestaurantProvider } from "./context/RestaurantProvider";

function App() {
  return (
    <>
      <RestaurantProvider>
        <main>
          <Navbar />
          <TableContainer />
          <Modal />
        </main>
      </RestaurantProvider>
    </>
  );
}

export default App;
