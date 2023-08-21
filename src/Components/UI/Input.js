import { TextField } from "@mui/material";

const Input = (props) => {
    return (
        <TextField
            sx={{
                "&& fieldset": {
                    border: "1px solid #fff"
                }
            }}
            {...props}
        />
    )
}
export default Input