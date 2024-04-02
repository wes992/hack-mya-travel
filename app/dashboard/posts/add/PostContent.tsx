"use client";
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";

import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  TableBubbleMenu,
  insertImages,
} from "mui-tiptap";
import { Toolbar } from "./Toolbar";
// import { useExtensions } from "../utils";
// import { defaultHTML } from "./util";
import { useFormContext } from "react-hook-form";
import { useExtensions } from "./utils";

function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

type PostContentProps = {
  cancelButton?: any;
  disabled: Boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export const PostContent = forwardRef(
  ({ disabled, setDisabled, cancelButton }: PostContentProps, ref) => {
    const {
      formState: { defaultValues },
      setValue,
    } = useFormContext();

    const extensions = useExtensions({
      placeholder: "Add your own content here...",
    });
    const rteRef = useRef<any>(null);
    const [showMenuBar, setShowMenuBar] = useState(true);

    const handleNewImageFiles = useCallback(
      (files: File[], insertPosition?: number): void => {
        if (!rteRef.current?.editor) {
          return;
        }

        // For the sake of a demo, we don't have a server to upload the files to,
        // so we'll instead convert each one to a local "temporary" object URL.
        // This will not persist properly in a production setting. You should
        // instead upload the image files to your server, or perhaps convert the
        // images to bas64 if you would like to encode the image data directly
        // into the editor content, though that can make the editor content very
        // large. You will probably want to use the same upload function here as
        // for the MenuButtonImageUpload `onUploadFiles` prop.
        const attributesForImageFiles = files.map((file) => ({
          src: URL.createObjectURL(file),
          alt: file.name,
        }));

        insertImages({
          images: attributesForImageFiles,
          editor: rteRef.current.editor,
          position: insertPosition,
        });
      },
      []
    );

    // Allow for dropping images into the editor
    const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
      useCallback(
        (view, event, _slice, _moved) => {
          if (!(event instanceof DragEvent) || !event.dataTransfer) {
            return false;
          }

          const imageFiles = fileListToImageFiles(event.dataTransfer.files);
          if (imageFiles.length > 0) {
            const insertPosition = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            })?.pos;

            handleNewImageFiles(imageFiles, insertPosition);

            // Return true to treat the event as handled. We call preventDefault
            // ourselves for good measure.
            event.preventDefault();
            return true;
          }

          return false;
        },
        [handleNewImageFiles]
      );

    // Allow for pasting images
    const handlePaste: NonNullable<
      EditorOptions["editorProps"]["handlePaste"]
    > = useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          // Return true to mark the paste event as handled. This can for
          // instance prevent redundant copies of the same image showing up,
          // like if you right-click and copy an image from within the editor
          // (in which case it will be added to the clipboard both as a file and
          // as HTML, which Tiptap would otherwise separately parse.)
          return true;
        }

        // We return false here to allow the standard paste-handler to run.
        return false;
      },
      [handleNewImageFiles]
    );

    const handleSave = () => {
      const JSON = rteRef.current?.editor?.getJSON();
      const HTML = rteRef.current?.editor?.getHTML();
      if (!JSON && !HTML) return;
      else setValue("content", { html: HTML, children: JSON.content });
    };

    return (
      <Box
        ref={ref}
        sx={{
          // An example of how editor styles can be overridden. In this case,
          // setting where the scroll anchors to when jumping to headings. The
          // scroll margin isn't built in since it will likely vary depending on
          // where the editor itself is rendered (e.g. if there's a sticky nav
          // bar on your site).
          "& .ProseMirror": {
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
            minHeight: 300,
          },
          width: "100%",
        }}
      >
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          content={defaultValues?.content || ""} //this will need to come from the post itself or be empty as defined in the form context
          editable={!disabled}
          editorProps={{
            handleDrop: handleDrop,
            handlePaste: handlePaste,
          }}
          renderControls={() => <Toolbar />}
          RichTextFieldProps={{
            // The "outlined" variant is the default (shown here only as
            // example), but can be changed to "standard" to remove the outlined
            // field border from the editor
            variant: "outlined",
            MenuBarProps: {
              hide: !showMenuBar,
            },
            // Below is an example of adding a toggle within the outlined field
            // for showing/hiding the editor menu bar, and a "submit" button for
            // saving/viewing the HTML content
            footer: (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  borderTopStyle: "solid",
                  borderTopWidth: 1,
                  borderTopColor: (theme) => theme.palette.divider,
                  py: 1,
                  px: 1.5,
                }}
              >
                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    showMenuBar ? "Hide formatting" : "Show formatting"
                  }
                  size="small"
                  onClick={() =>
                    setShowMenuBar((currentState) => !currentState)
                  }
                  selected={showMenuBar}
                  IconComponent={TextFields}
                  {...(disabled ? { disabled: true } : {})}
                />

                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    disabled
                      ? "Allow edits"
                      : "Prevent edits (use read-only mode)"
                  }
                  size="small"
                  onClick={() =>
                    setDisabled((currentState: boolean) => !currentState)
                  }
                  {...(disabled ? { selected: true } : {})}
                  IconComponent={disabled ? LockOpen : Lock}
                />

                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  onClick={handleSave}
                  disabled={!!disabled}
                >
                  Save
                </Button>
                {cancelButton?.()}
              </Stack>
            ),
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
    );
  }
);

PostContent.displayName = "PostContent";
