import Navbar from "./components/layout/Navbar/Navbar";
import MainContent from "./components/layout/MainContent/MainContent";
import MobileSideDrawer from "./components/layout/MobileSideDrawer/MobileSideDrawer";
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
              <MainContent />
              <MobileSideDrawer />
            </main>
          </RestaurantMapProvider>
        </SelectedRestaurantProvider>
      </RestaurantProvider>
    </>
  );
}

export default App;
