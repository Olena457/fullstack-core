"use client";

import {
  Autocomplete,
  TextField,
  AutocompleteRenderInputParams,
} from "@mui/material";
import {
  Controller,
  Control,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import type { CheckoutFormData } from "../auth/schemas/checkout";
import { useNovaPoshta } from "../../hooks/useNovaPoshta";
import type { CityOption, BranchOption } from "../../types/novaposhta";

interface NovaPoshtaFieldsProps {
  control: Control<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  isLoading: boolean;
  inputStyles: object;
}

export const NovaPoshtaFields = ({
  control,
  setValue,
  errors,
  isLoading,
  inputStyles,
}: NovaPoshtaFieldsProps) => {
  const {
    cities,
    warehouses,
    loadingCities,
    loadingWarehouses,
    fetchCities,
    fetchWarehouses,
  } = useNovaPoshta();

  return (
    <>
      {/* City */}
      <Controller
        name="npCity"
        control={control}
        render={({ field: { onChange, value, ref } }) => {
          const selectedCity =
            (cities as CityOption[]).find((c) => c.Present === value) ||
            (value ? ({ Present: value } as CityOption) : null);

          return (
            <Autocomplete<CityOption, false, false, false>
              fullWidth
              options={cities as CityOption[]}
              getOptionLabel={(option) => option.Present || ""}
              isOptionEqualToValue={(option, val) =>
                option.Present === val.Present
              }
              filterOptions={(x) => x}
              loading={loadingCities}
              disabled={isLoading}
              value={selectedCity}
              onInputChange={(_, newInputValue) => {
                if (newInputValue.length >= 2) fetchCities(newInputValue);
              }}
              onChange={(_, data) => {
                onChange(data ? data.Present : "");
                setValue("npBranch", "", { shouldValidate: true });
                if (data && data.DeliveryCity)
                  fetchWarehouses(data.DeliveryCity);
              }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  inputRef={ref}
                  label="City (Nova Poshta)"
                  error={!!errors.npCity}
                  helperText={errors.npCity?.message}
                  sx={inputStyles}
                />
              )}
            />
          );
        }}
      />

      {/* Branch */}
      <Controller
        name="npBranch"
        control={control}
        render={({ field: { onChange, value, ref } }) => {
          const selectedBranch =
            (warehouses as BranchOption[]).find(
              (w) => w.Description === value,
            ) || (value ? ({ Description: value } as BranchOption) : null);

          return (
            <Autocomplete<BranchOption, false, false, false>
              fullWidth
              options={warehouses as BranchOption[]}
              getOptionLabel={(option) => option.Description || ""}
              isOptionEqualToValue={(option, val) =>
                option.Description === val.Description
              }
              disabled={!cities.length || isLoading}
              loading={loadingWarehouses}
              value={selectedBranch}
              onChange={(_, data) => {
                onChange(data ? data.Description : "");
              }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  inputRef={ref}
                  label="Branch Number or Address"
                  error={!!errors.npBranch}
                  helperText={errors.npBranch?.message}
                  sx={inputStyles}
                />
              )}
            />
          );
        }}
      />
    </>
  );
};
