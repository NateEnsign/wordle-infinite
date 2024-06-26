import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const SettingsSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, contrast, lightMode, disabledHard }) => ({
  width: 34,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(13px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: contrast ? '#F5793A' : (theme.palette.mode === 'dark' ? '#2ECA45' : '#538D4E'),
        opacity: disabledHard ? .5 : 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: !lightMode ? "#878A8C" : theme.palette.mode === 'light' ? '#565758' : '#565758',
    opacity: disabledHard ? .5 : 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default SettingsSwitch;

