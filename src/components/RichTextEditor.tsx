import { useState, useEffect, useRef } from 'react';
import { Label } from "@/components/ui/label";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

const RichTextEditor = ({ value, onChange, placeholder, label, required }: RichTextEditorProps) => {
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import ReactQuill to avoid SSR issues
    const loadQuill = async () => {
      try {
        const { default: QuillComponent } = await import('react-quill');
        await import('react-quill/dist/quill.snow.css');
        setReactQuill(() => QuillComponent);
      } catch (error) {
        console.error('Failed to load ReactQuill:', error);
      }
    };

    loadQuill();
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link'
  ];

  if (!isClient || !ReactQuill) {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor="description">
            {label} {required && '*'}
          </Label>
        )}
        <div className="border rounded-md p-3 min-h-[150px] bg-muted/20 animate-pulse">
          <p className="text-muted-foreground text-sm">Loading rich text editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="description">
          {label} {required && '*'}
        </Label>
      )}
      <div className="border rounded-md [&_.ql-editor]:min-h-[120px] [&_.ql-toolbar]:border-b [&_.ql-container]:border-t-0">
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          theme="snow"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;