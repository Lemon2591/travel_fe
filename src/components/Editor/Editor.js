import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "antd";
import axios from "axios";
import { Skeleton } from "antd";

const customStyle =
  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; border: 1px solid white; width: 1110px}" +
  "figure > figcaption {  " +
  "font-style: italic; " +
  "margin: 8px 0 0;" +
  "padding: 0 30px;" +
  "font-size: 14px;" +
  "line-height: 22px;" +
  "text-align: center;" +
  "color: #666;" +
  "}" +
  "figure { display: table; margin: 1rem auto }";

const EditorCommon = React.forwardRef(
  ({ data, onUpload, setContent }, editorRef) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <>
        <Skeleton active loading={isLoading} />
        <Editor
          apiKey="9dqzkylpes89wz0o7o1obu08w45s0tp4igytamex7xodb49r"
          onInit={(evt, editor) => {
            // setIsLoading(false)
            editorRef.current = editor;
            setIsLoading(false);
          }}
          onEditorChange={(e) => setContent(e)}
          value={data}
          init={{
            height: 700,
            plugins:
              "save preview paste searchreplace autolink directionality visualblocks visualchars " +
              " fullscreen template codesample table charmap hr pagebreak nonbreaking anchor toc " +
              "insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern  " +
              "help code image   ",
            object_resizing: "table, img, iframe, video, figure",
            autosave_interval: "30s",
            // images_upload_url: 'postAcceptor.php',
            image_advtab: true,
            entity_encoding: "raw",
            image_caption: true,
            verify_html: true,
            extended_valid_elements:
              "img[style|class|src|alt|title|width|loading=lazy]",
            menubar: "file edit view insert format tools table help",
            toolbar:
              "undo redo | bold italic underline strikethrough | fontselect fontsizeselect " +
              "formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist " +
              "bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  " +
              "preview save print | insertfile image  template link anchor codesample | ltr rtl | media",
            toolbar_mode: "wrap",
            imagetools_cors_hosts: ["picsum.photos"],
            noneditable_noneditable_class: "mceNonEditable",
            content_style: customStyle,
            contextmenu: "link image imagetools table",
            // quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            templates: [
              {
                title: "New Table",
                description: "creates a new table",
                content:
                  '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
              },
              {
                title: "Starting my story",
                description: "A cure for writers block",
                content: "Once upon a time...",
              },
              {
                title: "New list with dates",
                description: "New List with dates",
                content:
                  '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
              },
            ],
            images_upload_handler: onUpload,
            // onUpload(blobInfo, progress, failure),
            content_style: `html, body { overflow-x: hidden; }`,
          }}
          scriptLoading={{ async: true }}
        />
      </>
    );
  }
);

export default EditorCommon;
