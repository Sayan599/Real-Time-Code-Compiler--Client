import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import FormatSizeIcon from '@mui/icons-material/FormatSize';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider({ value, handler }) {

    const handleSliderChange = (event, newValue) => {
        handler(newValue);
    };

    const handleInputChange = (event) => {
        handler(event.target.value === '' ? '' : Number(event.target.value));
    };

    return (
        <Box sx={{ width: 200 }} style={{ height: "10px", marginBottom: "20px" }} >

            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <FormatSizeIcon />
                </Grid>
                <Grid item xs>
                    <Slider
                        size="small"
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        style={{ color: "white" }}
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        inputProps={{
                            step: 5,
                            min: 0,
                            max: 30,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
