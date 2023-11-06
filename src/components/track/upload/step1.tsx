'use client'
import { useDropzone, FileWithPath } from 'react-dropzone';
import './theme.css'
import { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


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

const Step1 = () => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        // Do something with the files
        console.log(">>> check acceptedFiles", acceptedFiles)
    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

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