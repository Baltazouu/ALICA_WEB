'use client';
import React from 'react';
import styles from '../../(style)/event.module.css';
import { useSession } from 'next-auth/react';

// Imports MUI
import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Event() {

    React.useEffect(() => {
        fetchData();
    }, []);

    const { data: session } = useSession();

    let date1 = new Date().toLocaleDateString();
    const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs(date1));
    const [numberInputValue, setNumberInputValue] = React.useState<number>(0);
    const [events, setEvents] = React.useState({
        title: '',
        description: '',
        date: dateValue.$d.toISOString(),
        imageURL: 'test_ImageURL',
        alumniToken: session?.user.token
    });

    const [eventsList, setEventsList] = React.useState([]);

    const [openModalAddEvent, setOpenModalAddEvent] = React.useState(false);
    const handleOpenModalAddEvent = () => setOpenModalAddEvent(true);
    const handleCloseModalAddEvent = () => setOpenModalAddEvent(false);


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const NumberInput = React.forwardRef(function CustomNumberInput(
        props: NumberInputProps,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) {
        return (
            <BaseNumberInput
                slots={{
                    root: StyledInputRoot,
                    input: StyledInput,
                    incrementButton: StyledButton,
                    decrementButton: StyledButton,
                }}
                slotProps={{
                    incrementButton: {
                        children: <AddIcon fontSize="small" />,
                        className: 'increment',
                    },
                    decrementButton: {
                        children: <RemoveIcon fontSize="small" />,
                    },
                }}
                {...props}
                ref={ref}
            />
        );
    });

    const blue = {
        100: '#daecff',
        200: '#b6daff',
        300: '#66b2ff',
        400: '#3399ff',
        500: '#007fff',
        600: '#0072e5',
        700: '#0059B2',
        800: '#004c99',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const StyledInputRoot = styled('div')(
        ({ theme }) => `
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    `,
    );

    const StyledInput = styled('input')(
        ({ theme }) => `
      font-size: 0.875rem;
      font-family: inherit;
      font-weight: 400;
      line-height: 1.375;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
            };
      border-radius: 8px;
      margin: 0 8px;
      padding: 10px 12px;
      outline: 0;
      min-width: 0;
      width: 4rem;
      text-align: center;
    
      &:hover {
        border-color: ${blue[400]};
      }
    
      &:focus {
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
      }
    
      &:focus-visible {
        outline: 0;
      }
    `,
    );

    const StyledButton = styled('button')(
        ({ theme }) => `
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      line-height: 1.5;
      border: 1px solid;
      border-radius: 999px;
      border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      width: 32px;
      height: 32px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    
      &:hover {
        cursor: pointer;
        background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
        border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
        color: ${grey[50]};
      }
    
      &:focus-visible {
        outline: 0;
      }
    
      &.increment {
        order: 1;
      }
    `,
    );

    const fetchData = async () => {
        try {
            const res = await fetch('/api/event', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                const data = await res.json();
                setEventsList(data.content);
                console.log('Events:', data);
            } else {
                console.error('Failed to fetch events:', res.statusText);
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    }

    const handleAddEvent = async (e: any) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: events.title,
                    description: events.description,
                    date: events.date,
                    imageURL: events.imageURL,
                    nbMaxRegistrations: numberInputValue,
                    alumniToken: session?.user.token
                })
            });
            if (res.status !== 201) {
                console.error('Failed to add event:', res.statusText);
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Evénements</p>
            <button className={styles.buttonAddEvent} onClick={handleOpenModalAddEvent}>add</button>
            <Modal
                open={openModalAddEvent}
                onClose={handleCloseModalAddEvent}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.modalAddEvent}>
                    <p className={styles.titleModalAddEvent}>Ajouter un événement</p>
                    <form className={styles.formModalAddEvent} onSubmit={handleAddEvent}>
                        <TextField
                            id="title"
                            label="Titre"
                            variant="outlined"
                            className={styles.inputModalAddEvent}
                            value={events.title}
                            onChange={(e) => setEvents({ ...events, title: e.target.value })}
                            sx={{ width: 350 }}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            className={styles.inputModalAddEvent}
                            value={events.description}
                            onChange={(e) => setEvents({ ...events, description: e.target.value })}
                            sx={{ width: 350 }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Controlled picker"
                                value={dateValue}
                                onChange={(newValue) => setDateValue(newValue)}
                            />
                        </LocalizationProvider>
                        <NumberInput
                            aria-label="Quantity Input"
                            min={0}
                            value={numberInputValue}
                            onChange={(event, newValue) => {
                                event.preventDefault();
                                setNumberInputValue(newValue as number);
                            }}
                        />
                        {/* <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" />
                            </Button> */}
                        <button type="submit" className={styles.buttonModalAddEvent}>Ajouter</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
