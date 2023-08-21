import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function MyEditor({ description, setDescription }) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <div style={{ margin: "20px 0px" }}>
                <ReactQuill theme="snow" onChange={setDescription} value={description}
                />
            </div>
        </>
    );
}