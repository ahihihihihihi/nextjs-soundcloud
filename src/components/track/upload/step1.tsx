'use client'
import { useDropzone, FileWithPath } from 'react-dropzone';
import './theme.css'
import { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSession } from "next-auth/react"
import axios from 'axios';
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

function InputFileUpload() {
    return (
        <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={(e) => e.preventDefault()}
        >
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}

interface IProps {
    setValue: (v: number) => void,
    setTrackUpload: any,
    trackUpload: any
}

const Step1 = (props: IProps) => {
    const { data: session } = useSession();

    const toast = useToast()

    const { trackUpload } = props;

    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        if (acceptedFiles && acceptedFiles[0]) {
            props.setValue(1)
            const audio = acceptedFiles[0];
            // console.log(">>> check audio", audio)
            const formData = new FormData()
            formData.append('fileUpload', audio)

            try {
                const res = await axios.post(
                    'http://localhost:8000/api/v1/files/upload',
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${session?.access_token}`,
                            'target_type': 'tracks',
                            // delay: 5000
                        },
                        onUploadProgress: progressEvent => {
                            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
                            props.setTrackUpload({
                                ...trackUpload,
                                fileName: audio.name,
                                percent: percentCompleted
                            })
                        }
                    }
                )
                props.setTrackUpload((preState: any) => ({
                    ...preState,
                    uploadedTrackName: res.data.data.fileName,
                }))

                // console.log(">>>check res:", res.data.data.fileName)
            } catch (e) {
                //@ts-ignore
                toast.error(e?.response?.data?.message)
                // alert(e?.response?.data?.message)
            }
        }
        // console.log(">>> check acceptedFiles", acceptedFiles)
    }, [session])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'audio': ['.mp3', '.m4a', '.wav']
        }
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <InputFileUpload />
                <p>Click or Drag/Drop to upload file track</p>
            </div>
            <aside>
                <h4>Uploaded Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default Step1;