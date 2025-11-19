import React, { useRef, useState } from 'react';
import {
  CanvasPanel,
  RenderAnnotationPage,
  SequenceThumbnails,
  CombinedMetadata,
  useCanvas,
  useAnnotationPageManager,
  useVault,
  useManifest,
  LocaleString,
  ComplexTimelineControls,
} from 'player-iiif-video';

const runtimeOptions = { maxOverZoom: 5 };

function CanvasAnnotations() {
  const canvas = useCanvas();
  const pm = useAnnotationPageManager(canvas?.id);
  const vault = useVault();

  if (!canvas || pm.enabledPageIds.length === 0) return null;

  return (
    <>
      {pm.enabledPageIds.map((id) => (
        <RenderAnnotationPage key={id} page={vault.get(id)} />
      ))}
    </>
  );
}

function Label() {
  const manifest = useManifest();
  if (!manifest) return <div>Loading..</div>;
  return <LocaleString as="h2" className="text-2xl my-3">{manifest.label}</LocaleString>;
}

const components = {
  ComplexTimelineControls, // montera à l’endroit où le provider est dispo
};

export default function Player({
  manifest,
  startCanvas,
  pagingEnabledDefault = true,
}) {
  const ref = useRef(null);
  const [pagingEnabled, setPagingEnabled] = useState(pagingEnabledDefault);

  return (
    <>
      <style>{`
        [data-textual-content="true"] {
          background: #fff;
          font-size: 1.2em;
          font-family: system-ui, sans-serif;
          padding: 1em;
          margin-top: 1em;
        }
        * { box-sizing: border-box; }
        .atlas-container { background: #000; }
        body { padding: 0.5em }
      `}</style>

      <CanvasPanel
        key={`${manifest}-${startCanvas}`}
        ref={ref}
        spacing={20}
        height={800}
        header={<Label />}
        reuseAtlas
        mode="explore"
        pagingEnabled={pagingEnabled}
        runtimeOptions={runtimeOptions}
        manifest={manifest}
        startCanvas={startCanvas}
        components={components}
        annotations={
          <>
            <CanvasAnnotations />
          </>
        }
        renderAnnotationContextMenu={() => <div>This is indeed an annotation</div>}
      >
        <div className="actions hide flex gap-2 my-4">
          <button
            className="p-2 bg-blue-500 text-white hover:bg-blue-400"
            onClick={() => setPagingEnabled((p) => !p)}
          >
            toggle paging
          </button>
          <button
            className="p-2 bg-blue-500 text-white hover:bg-blue-400"
            onClick={() => ref.current?.previousCanvas()}
          >
            prev
          </button>
          <button
            className="p-2 bg-blue-500 text-white hover:bg-blue-400"
            onClick={() => ref.current?.nextCanvas()}
          >
            next
          </button>
        </div>

        <SequenceThumbnails
          classes={{
            container: 'actions hide flex gap-1 overflow-x-auto',
            row: 'flex gap-2 border border-gray-200 flex-none p-2 m-2',
            img: 'max-h-[128px] max-w-[128px] object-contain h-full w-full',
            selected: { row: 'flex gap-2 border border-blue-400 flex-none p-2 m-2 bg-blue-100' },
          }}
          fallback={
            <div className="flex items-center justify-center w-32 h-32 bg-gray-200 text-gray-400 select-none">
              No thumb
            </div>
          }
        />

        <CombinedMetadata
          allowHtml
          classes={{
            container: 'm-4',
            row: 'border-b border-gray-200',
            label: 'font-bold p-2 text-slate-600',
            value: 'text-sm p-2 text-slate-800',
            empty: 'text-gray-400',
          }}
        />
      </CanvasPanel>
    </>
  );
}
