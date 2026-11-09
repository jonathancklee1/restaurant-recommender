import Navbar from "./components/layout/Navbar/Navbar";
import TableContainer from "./components/layout/TableContainer/TableContainer";
import MobileSideDrawer from "./components/MobileSideDrawer/MobileSideDrawer";
import { RestaurantMapProvider } from "./context/RestaurantMapProvider";
import { RestaurantProvider } from "./context/RestaurantProvider";
import { SelectedRestaurantProvider } from "./context/SelectedRestaurantProvider";

function App() {
  return (
    <>
      <RestaurantProvider>
        <SelectedRestaurantProvider>
          <RestaurantMapProvider>
            <main>
              <Navbar />
              <TableContainer />
              <MobileSideDrawer />
            </main>
          </RestaurantMapProvider>
        </SelectedRestaurantProvider>
      </RestaurantProvider>
    </>
  );
}

export default App;
