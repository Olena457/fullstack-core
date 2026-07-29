
"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Autocomplete, Box, TextField, CircularProgress } from "@mui/material";
import type { AutocompleteRenderInputParams } from "@mui/material";
import {
  Controller,
  Control,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import type { CheckoutFormData } from "../auth/schemas/checkout";
import { useNovaPoshta } from "../../hooks/useNovaPoshta";
import type { CityOption, BranchOption } from "../../types/novaposhta";

type ParamsWithSlotProps = AutocompleteRenderInputParams & {
  slotProps?: {
    input?: {
      endAdornment?: ReactNode;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
};

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

  const [cityInputValue, setCityInputValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (cityInputValue.length >= 2) {
        fetchCities(cityInputValue);
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [cityInputValue, fetchCities]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        width: "100%",
      }}
    >
      {/* City */}
      <Controller
        name="npCity"
        control={control}
        render={({ field: { onChange, value, ref } }) => {
          const safeCities = Array.isArray(cities) ? cities : [];

          const selectedCity =
            safeCities.find((c: CityOption) => c.Present === value) ||
            (value ? ({ Present: value } as CityOption) : null);

          return (
            <Autocomplete<CityOption, false, false, false>
              fullWidth
              options={safeCities}
              getOptionLabel={(option) => option.Present || ""}
              isOptionEqualToValue={(option, val) =>
                option.Present === val?.Present
              }
              filterOptions={(x) => x}
              loading={loadingCities}
              disabled={isLoading}
              value={selectedCity}
              onInputChange={(_, newInputValue) =>
                setCityInputValue(newInputValue)
              }
              onChange={(_, data) => {
                const cityData = data as CityOption | null;

                onChange(cityData ? cityData.Present || "" : "");
                setValue("npBranch", "", { shouldValidate: true });

                const cityRef = cityData?.Ref || cityData?.DeliveryCity;

                if (cityData && typeof cityRef === "string") {
                  fetchWarehouses(cityRef);
                }
              }}
              renderInput={(baseParams) => {
                const params = baseParams as ParamsWithSlotProps;
                const inputSlotProps = params.slotProps?.input ?? {};

                return (
                  <TextField
                    {...params}
                    inputRef={ref}
                    label="City (Nova Poshta, in Ukrainian, e.g., Київ)"
                    error={!!errors.npCity}
                    helperText={errors.npCity?.message}
                    sx={inputStyles}
                    slotProps={{
                      ...params.slotProps,
                      input: {
                        ...inputSlotProps,
                        endAdornment: (
                          <>
                            {loadingCities ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {inputSlotProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                );
              }}
            />
          );
        }}
      />

      {/* Branch */}
      <Controller
        name="npBranch"
        control={control}
        render={({ field: { onChange, value, ref } }) => {
          const safeWarehouses = Array.isArray(warehouses) ? warehouses : [];

          const selectedBranch =
            safeWarehouses.find((w: BranchOption) => w.Description === value) ||
            (value ? ({ Description: value } as BranchOption) : null);

          return (
            <Autocomplete<BranchOption, false, false, false>
              fullWidth
              options={safeWarehouses}
              getOptionLabel={(option) => option.Description || ""}
              isOptionEqualToValue={(option, val) =>
                option.Description === val?.Description
              }
              disabled={isLoading}
              loading={loadingWarehouses}
              value={selectedBranch}
              onInputChange={(_, newInputValue) => {
                onChange(newInputValue);
              }}
              onChange={(_, data) => onChange(data ? data.Description : "")}
              renderInput={(baseParams) => {
                const params = baseParams as ParamsWithSlotProps;
                const inputSlotProps = params.slotProps?.input ?? {};

                return (
                  <TextField
                    {...params}
                    inputRef={ref}
                    label="Branch Number or Address"
                    error={!!errors.npBranch}
                    helperText={errors.npBranch?.message}
                    sx={inputStyles}
                    slotProps={{
                      ...params.slotProps,
                      input: {
                        ...inputSlotProps,
                        endAdornment: (
                          <>
                            {loadingWarehouses ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {inputSlotProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                );
              }}
            />
          );
        }}
      />
    </Box>
  );
};