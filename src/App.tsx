import Navbar from "./components/layout/Navbar/Navbar";
import TableContainer from "./components/layout/TableContainer/TableContainer";
import { RestaurantProvider } from "./context/RestaurantProvider";
import { SelectedRestaurantProvider } from "./context/SelectedRestaurantProvider";

function App() {
  return (
    <>
      <RestaurantProvider>
        <SelectedRestaurantProvider>
          <main>
            <Navbar />
            <TableContainer />
          </main>
        </SelectedRestaurantProvider>
      </RestaurantProvider>
    </>
  );
}

export default App;
