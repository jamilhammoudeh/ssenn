import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Link2 } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

const RichTextEditor = ({ value, onChange, placeholder, label, required }: RichTextEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);

  const formatText = (format: string) => {
    const textarea = document.getElementById('rich-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    onChange(newValue);
  };

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
      .replace(/^- (.*)/gm, '<ul><li>$1</li></ul>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="rich-textarea">
          {label} {required && '*'}
        </Label>
      )}
      
      <div className="border rounded-md">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b bg-muted/20">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('list')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('link')}
            className="h-8 w-8 p-0"
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <div className="ml-auto">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>

        {/* Content Area */}
        {isPreview ? (
          <div 
            className="p-3 min-h-[120px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <Textarea
            id="rich-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="border-0 resize-none focus-visible:ring-0 min-h-[120px]"
            required={required}
          />
        )}
      </div>
      
      <p className="text-xs text-muted-foreground">
        Use **bold**, *italic*, [link](url), and - for lists. Click Preview to see formatting.
      </p>
    </div>
  );
};

export default RichTextEditor;