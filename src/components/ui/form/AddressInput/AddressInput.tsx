import { startTransition, useActionState, useState } from "react";
import styles from "./AddressInput.module.css";
import Button from "../../Button/Button";
import Input from "../Input/Input";
import { searchAddress, type AddressResult } from "../../../../utils/helpers/searchAddress";
import type { LatLong } from "../../../../utils/types";

export interface AddressInputProps {
  value: string;
  onChange: (address: string) => void;
  className?: string;
  setLatLong: (latLong: LatLong | undefined) => void;
}

export const AddressInput = ({
  value,
  onChange,
  className = "",
  setLatLong,
}: AddressInputProps) => {
  const [results, searchAction, isPending] = useActionState(
    (_prev: AddressResult[], address: string) => searchAddress(address),
    [],
  );
  const [openDropdown, setOpenDropDown] = useState(false);

  return (
    <div className={`${styles.container} ${className}`}>
      <Input
        className={styles.input}
        type="text"
        id="address"
        name="address"
        required
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setLatLong(undefined);
        }}
      />
      {openDropdown && (
        <ul className={styles.dropdown}>
          {isPending ? (
            <span>Loading...</span>
          ) : (
            <>
              <li key="header">Set Pin to</li>
              {results.map((result, index) => {
                return (
                  <li
                    // Labels can repeat, and each search replaces the whole list.
                    key={index}
                    onClick={() => {
                      setLatLong(result.latLong);
                      setOpenDropDown(false);
                    }}
                  >
                    {result.label}
                  </li>
                );
              })}
            </>
          )}
          {results.length === 0 && !isPending && <div>No results</div>}
        </ul>
      )}
      <Button
        type="button"
        disabled={isPending}
        onClick={() => {
          startTransition(() => searchAction(value));
          setOpenDropDown(true);
        }}
      >
        Add Map Pin
      </Button>
    </div>
  );
};

export default AddressInput;
