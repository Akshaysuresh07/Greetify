import React, { useState, useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import pluginNewsletter from 'grapesjs-preset-newsletter';
import juice from 'juice';

const GrapesJSEditor = ({ content, onSave }) => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const grapesEditor = grapesjs.init({
      container: '#editor',
      height: '100%',
      width: '100%',
      storageManager: { type: 'none' },
      plugins: [pluginNewsletter],
      pluginsOpts: { 'gjs-preset-newsletter': {} },
      removable: true, // Allows the component to be removed
      draggable: true, // Allows the component to be moved

    panels: {
      defaults: [
        {
          id: 'panel-top',
          el: '.panel__top',
        },
        {
          id: 'panel-basic',
          el: '.panel__basic-actions',
          buttons: [
            {
              id: 'send-email',
              className: 'fa fa-paper-plane',
              command: 'send-email',
              attributes: { title: 'Send Email' },
            },
          ],
        },
      ],
    },
  });

    if (content) {
      grapesEditor.setComponents(content);
    }

    

    setEditor(grapesEditor);
    return () => {
      grapesEditor.destroy();
    };
  }, [content, onSave]);

  const handleSave = () => {
    const htmlContent = editor.getHtml(); // Get HTML content
const cssContent = editor.getCss();   // Get CSS content

// Inline CSS
const combinedContent = juice.inlineContent(htmlContent, cssContent);

console.log(combinedContent); 


    // Send the data to the parent component
    onSave(combinedContent);
  };

  return (
    <div className="flex w-full mt-5 flex-col h-full">
    {/* <header className="text-center p-4 bg-gray-800 text-white">
      <h1>Email Template Editor</h1>
    </header> */}
    <div className="flex-1 overflow-y-visible">
      <div id="editor" className="h-full w-2/6 border border-gray-300"></div>
    </div>
    <div className="text-center p-4 ">
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Template
      </button>
    </div>
  </div>
  );
};

export default GrapesJSEditor;