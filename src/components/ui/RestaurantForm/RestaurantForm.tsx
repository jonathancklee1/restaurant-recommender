import { useContext, useState, type SubmitEvent } from "react";
import Button from "../Button/Button";
import Input from "../form/Input/Input";
import PriceRange from "../form/PriceRange/PriceRange";
import RatingInput from "../form/RatingInput/RatingInput";
import TextArea from "../form/TextArea/TextArea";
import type { RestaurantType } from "../../../utils/types";
import { RestaurantContext } from "../../../context/RestaurantProvider";

export interface RestaurantFormProps {
  initialPlace?: RestaurantType | null;
  onDone: () => void;
}

/** Blank restaurant with every field set, used to reset the form. */
const createEmptyRestaurant = (): RestaurantType => ({
  id: crypto.randomUUID(),
  name: "",
  imageUrl: "",
  cuisine: "",
  rating: undefined,
  price: "$",
  visits: 0,
  comments: "",
  address: "",
  lat: undefined,
  lng: undefined,
  addedAt: new Date().toISOString().slice(0, 10),
  lastVisitedAt: "",
  isFavourited: false,
});

/**
 * Add/edit form holding a local draft of the restaurant.
 * The draft is seeded from `initialPlace` on mount, so give this a `key` that changes per place.
 */
export const RestaurantForm = ({ initialPlace, onDone }: RestaurantFormProps) => {
  const { dispatch } = useContext(RestaurantContext);
  const [restaurant, setRestaurant] = useState<RestaurantType>(
    initialPlace ?? createEmptyRestaurant(),
  );

  const updateField = <K extends keyof RestaurantType>(field: K, value: RestaurantType[K]) =>
    setRestaurant({ ...restaurant, [field]: value });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (initialPlace) {
      dispatch(["UPDATE_RESTAURANT", restaurant.id, restaurant]);
    } else {
      dispatch(["ADD_RESTAURANT", restaurant]);
    }
    setRestaurant(createEmptyRestaurant());
    onDone();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialPlace ? "Edit" : "Add"} Place</h2>
      <p>
        {initialPlace
          ? "Edit details of your saved restaurant"
          : "Save a new restaurant to your Sydney wishlist"}
      </p>

      <div>
        <label htmlFor="name">Restaurant Name</label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          value={restaurant.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cuisine">Cuisine</label>
        <Input
          type="text"
          id="cuisine"
          name="cuisine"
          required
          autoComplete="off"
          value={restaurant.cuisine}
          onChange={(e) => updateField("cuisine", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <Input
          type="text"
          id="address"
          name="address"
          required
          autoComplete="street-address"
          value={restaurant.address}
          onChange={(e) => updateField("address", e.target.value)}
        />
      </div>
      <div>
        <label>Price Tier</label>
        <PriceRange
          initialPrice={restaurant.price}
          changePrice={(price) => updateField("price", price)}
        />
      </div>
      <div>
        <label>Your Rating</label>
        <RatingInput
          initialValue={restaurant.rating}
          changeRating={(rating) => updateField("rating", rating)}
        />
      </div>
      <div>
        <label htmlFor="comments">Comments</label>
        <TextArea
          id="comments"
          value={restaurant.comments}
          onChange={(e) => updateField("comments", e.target.value)}
        />
      </div>

      <Button type="submit">{initialPlace ? "Save Changes" : "Add Place"}</Button>
    </form>
  );
};

export default RestaurantForm;
