import React, { useEffect, useState, useCallback } from "react";
import {
  Autocomplete,
  CircularProgress,
  InputLabel,
  TextField,
} from "@mui/material";
import { useDebounce } from "../services/custom-hooks/useDebounce";

interface SelectionProps {
  fetchApi: (params: { value: string }) => Promise<any>;
  value: any;
  getOptionLabel: (option: any) => string;
  handleChange: (event: React.ChangeEvent<{}>, value: any) => void;
  label: string;
  options?: any[];
  error?: boolean;
  helperText?: string;
  load?: boolean;
}
const Selection: React.FC<SelectionProps> = ({
  fetchApi,
  value,
  getOptionLabel,
  handleChange,
  label,
  options: _options,
  error,
  helperText,
  load = true,
}) => {
  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const loader: boolean = open && load;
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [autoSearch, setAutoSearch] = useState(true);
  useEffect(() => {
    setLoading(loader);
  }, [loader]);
  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setAutoSearch(value ? false : true);
    setLoading(true);
    const options = await fetchApi({ value: value });
    setOptions(options || []);
    setLoading(false);
  };
  const delayedSearch = useDebounce(handleInputChange);
  const fetchOps = useCallback(async () => {
    try {
      const response = await fetchApi({ value: "" });
      return response;
    } catch (err) {
      console.error(err);
    }
  }, [fetchApi]);
  useEffect(() => {
    if (open) {
      let active = true;
      if (!loading) {
        return undefined;
      }
      if (active && autoSearch) {
        (async () => {
          setLoading(true);
          const response = await fetchOps();
          setOptions(response || []);
          setLoading(false);
        })();
      }
      return () => {
        active = false;
      };
    }
  }, [fetchOps, autoSearch, loading, open]);
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <>
      <InputLabel>{`${label}`}</InputLabel>
      <Autocomplete
        fullWidth
        filterOptions={(x) => x}
        value={value || null}
        options={_options ? _options || [] : options}
        onInputChange={delayedSearch}
        getOptionLabel={getOptionLabel}
        noOptionsText="No Records"
        isOptionEqualToValue={(option, value) =>
          option?.value === value?.value || value === ""
        }
        loading={loading}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(e, value) => handleChange(e, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};
export default Selection;
