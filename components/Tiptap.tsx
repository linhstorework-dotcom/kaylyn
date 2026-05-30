"use client";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";

import TextAlign from "@tiptap/extension-text-align";

import Link from "@tiptap/extension-link";

import Image from "@tiptap/extension-image";

import Highlight from "@tiptap/extension-highlight";

import Typography from "@tiptap/extension-typography";

import Placeholder from "@tiptap/extension-placeholder";

import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  ImageIcon,
  LinkIcon,
  Highlighter,
} from "lucide-react";

type Props = {
  value: string;

  onChange: (
    content: string
  ) => void;

  slug?: string;
};

export default function Tiptap({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Highlight,

      Typography,

      Link.configure({
        openOnClick: false,
      }),

      Image,

      TextAlign.configure({
        types: [
          "heading",
          "paragraph",
        ],
      }),

      Placeholder.configure({
        placeholder:
          "Viết nội dung bài viết...",
      }),
    ],

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[350px] outline-none p-5 prose max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(
        editor.getHTML()
      );
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt(
      "Nhập URL ảnh"
    );

    if (url) {
      editor
        .chain()
        .focus()
        .setImage({ src: url })
        .run();
    }
  };

  const addLink = () => {
    const url = window.prompt(
      "Nhập URL"
    );

    if (url) {
      editor
        .chain()
        .focus()
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="border border-pink-200 rounded-2xl overflow-hidden bg-white">
      {/* TOOLBAR */}
      <div className="border-b border-pink-100 p-3 flex flex-wrap gap-2 bg-pink-50">
        <ToolbarButton
          active={editor.isActive(
            "bold"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        >
          <Bold size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive(
            "italic"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          <Italic size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive(
            "underline"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
        >
          <UnderlineIcon
            size={18}
          />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive(
            "highlight"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight()
              .run()
          }
        >
          <Highlighter
            size={18}
          />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive(
            "heading",
            {
              level: 1,
            }
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 1,
              })
              .run()
          }
        >
          <Heading1 size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive(
            "heading",
            {
              level: 2,
            }
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 2,
              })
              .run()
          }
        >
          <Heading2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive(
            "bulletList"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          <List size={18} />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive(
            "orderedList"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        >
          <ListOrdered
            size={18}
          />
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive(
            "blockquote"
          )}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
        >
          <Quote size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={addImage}
        >
          <ImageIcon size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={addLink}
        >
          <LinkIcon size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <Undo2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <Redo2 size={18} />
        </ToolbarButton>
      </div>

      {/* CONTENT */}
      <EditorContent
        editor={editor}
      />

      <style jsx global>{`
        .ProseMirror h1 {
          font-size: 32px;
          font-weight: 700;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        .ProseMirror h2 {
          font-size: 24px;
          font-weight: 700;
          margin-top: 16px;
          margin-bottom: 10px;
        }

        .ProseMirror p {
          margin-bottom: 12px;
          line-height: 1.8;
        }

        .ProseMirror ul {
          list-style: disc;
          padding-left: 24px;
          margin-bottom: 16px;
        }

        .ProseMirror ol {
          list-style: decimal;
          padding-left: 24px;
          margin-bottom: 16px;
        }

        .ProseMirror blockquote {
          border-left: 4px solid
            #f472b6;

          padding-left: 16px;

          color: #666;

          margin: 16px 0;
        }

        .ProseMirror img {
          border-radius: 16px;
          margin: 16px 0;
        }

        .ProseMirror a {
          color: #ec4899;
          text-decoration: underline;
        }

        .ProseMirror mark {
          background: #fef08a;
          border-radius: 4px;
          padding: 2px 4px;
        }
      `}</style>
    </div>
  );
}

type ToolbarButtonProps = {
  children: React.ReactNode;

  active?: boolean;

  onClick: () => void;
};

function ToolbarButton({
  children,
  active,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition
        ${
          active
            ? "bg-pink-500 text-white"
            : "bg-white hover:bg-pink-100 text-gray-700"
        }
      `}
    >
      {children}
    </button>
  );
}