'use client'

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useSession } from "next-auth/react"
import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';


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

function InputFileUpload(props: any) {
    const { data: session } = useSession();
    const { setInfo, info } = props;

    const handleUpload = async (image: any) => {
        const formData = new FormData()
        formData.append('fileUpload', image)

        try {
            const res = await axios.post(
                'http://localhost:8000/api/v1/files/upload',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${session?.access_token}`,
                        'target_type': 'images',
                    },
                }
            )
            setInfo({
                ...info,
                imgUrl: res.data.data.fileName,
            })

        } catch (e) {
            //@ts-ignore
            alert(e?.response?.data?.message)
        }
    }

    return (
        <Button
            onChange={(e) => {
                const event = e.target as HTMLInputElement;
                if (event.files) {
                    handleUpload(event.files[0])
                }
            }}
            component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}


function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function LinearWithValueLabel(props: IProps) {
    const [progress, setProgress] = React.useState(10);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={props.trackUpload.percent} />
        </Box>
    );
}

const category = [
    {
        value: 'CHILL',
        label: 'CHILL',
    },
    {
        value: 'WORKOUT',
        label: 'WORKOUT',
    },
    {
        value: 'PARTY',
        label: 'PARTY',
    }
];

interface IProps {
    trackUpload: {
        fileName: string,
        percent: number,
        uploadedTrackName: string,
    }
    setValue: (v: number) => void
}

interface INewTrack {
    title: string,
    description: string,
    trackUrl: string,
    imgUrl: string,
    category: string
}

const Step2 = (props: IProps) => {
    const { data: session } = useSession();
    const toast = useToast()
    const { trackUpload, setValue } = props
    const [info, setInfo] = React.useState<INewTrack>({
        title: "",
        description: "",
        trackUrl: "",
        imgUrl: "",
        category: "",
    })

    React.useEffect(() => {
        if (trackUpload && trackUpload.uploadedTrackName) {
            setInfo({
                ...info,
                trackUrl: trackUpload.uploadedTrackName,
            })
        }
    }, [trackUpload])

    const handleSubmitForm = async () => {
        // console.log(">>> check info:", info)
        const res = await sendRequest<IBackendRes<ITrackTop[]>>({
            url: 'http://localhost:8000/api/v1/tracks',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.access_token}`,
            },
            // body: { ...info }
            body: info
        })
        if (res.data) {
            // alert("create a track successfully!")
            toast.success("create a track successfully!")
            setValue(0)
        } else {
            // alert(res.message)
            toast.error(res.message)
        }
    }

    return (
        <>
            <div>
                <div>
                    {trackUpload.fileName}
                </div>
                <LinearWithValueLabel
                    trackUpload={trackUpload}
                    setValue={setValue}
                />
            </div>

            <Grid container spacing={2} mt={5}>
                <Grid item xs={6} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div style={{ height: 250, width: 250, background: "#ccc" }}>
                        <div>
                            {info.imgUrl &&
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`}
                                    height={250}
                                    width={250}
                                />
                            }
                        </div>

                    </div>
                    <div >
                        <InputFileUpload
                            setInfo={setInfo}
                            info={info}
                        />
                    </div>

                </Grid>
                <Grid item xs={6} md={8}>
                    <TextField
                        value={info.title}
                        onChange={(event) => setInfo({
                            ...info,
                            title: event.target.value,
                        })}
                        label="Title" variant="standard" fullWidth margin="dense" />
                    <TextField
                        value={info.description}
                        onChange={(event) => setInfo({
                            ...info,
                            description: event.target.value,
                        })}
                        label="Description" variant="standard" fullWidth margin="dense" />
                    <TextField
                        onChange={(event) => setInfo({
                            ...info,
                            category: event.target.value,
                        })}
                        sx={{
                            mt: 3
                        }}
                        select
                        label="Category"
                        fullWidth
                        variant="standard"
                    //   defaultValue="EUR"
                    >
                        {category.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        onClick={() => handleSubmitForm()}
                        variant="outlined"
                        sx={{
                            mt: 5
                        }}>Save</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Step2;