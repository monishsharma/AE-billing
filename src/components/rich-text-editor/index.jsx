import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
          ],
        },
      });

      // Set default value ONLY ONCE
      if (value && !hasInitialized.current) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
        hasInitialized.current = true;
      }

      // Listen for changes
      quillRef.current.on("text-change", () => {
        const text = quillRef.current.getText().trim();
        const html = quillRef.current.root.innerHTML;

        if (text.length === 0) {
          onChange && onChange("");   // treat as empty
        } else {
          onChange && onChange(html);
        }
      });

    }
  }, []);

  return <div ref={editorRef} style={{ height: "200px" }} />;
}
