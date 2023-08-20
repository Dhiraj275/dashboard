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

                {/* <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={value}
                    // value={value}
                    onKeyUp={() => setCustomForm({ ...value, description: editorRef.current.getContent() })
                    }
                    apiKey='msmwdfvd65lobwl67zyhn79m8n8oobzzjnj5jdpuho2fn7ab'
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                /> */}
                <ReactQuill theme="snow" onChange={setDescription} value={description}
                // onChange={setCustomForm}
                />
            </div>
        </>
    );
}