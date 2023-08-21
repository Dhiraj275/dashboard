import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Select as MUISelect} from '@mui/material';
import React from 'react';
const Select = ({ children, label, defaultValue, handleFormChanges }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <MUISelect
                    labelId="demo-simple-MUISelect-label"
                    id="demo-simple-select"
                    defaultValue={defaultValue}
                    label={label}
                    sx={
                        {
                            "&& fieldset": {
                                border: "1px solid #fff"
                            }
                        }
                    }
                    MenuProps={{
                        sx: {
                            "&& .Mui-selected": {
                                backgroundColor: "#192036"
                            },
                            "&& .Mui-selected:hover": {
                                backgroundColor: "#192036"
                            },
                            "&& .MuiMenu-list": {
                                backgroundColor: "#111827"
                            }
                        }
                    }}
                    // value={changedStatus}
                    onChange={handleFormChanges}
                    required
                >
                    {
                        children
                    }
                </MUISelect>
            </FormControl>
        </div>
    )
}
export default Select