import * as React from "react";
type Row = { RowHeader: string; Cells: string[] };
type VisitMeta = {
 VisitNumber?: string;
 VisitName?: string;
};
type AssessmentMeta = {
 AssessmentName?: string;
};
type TablePayload = {
 Columns: string[];
 Rows: Row[];
 VisitMeta?: VisitMeta[];
 AssessmentMeta?: AssessmentMeta[];
};
export type MatrixProps = {
 initialJson?: string;
 onChange: (json: string) => void;
};
const DEFAULT_COLUMNS = ["", ""];
const DEFAULT_ROWS: Row[] = [
 { RowHeader: "", Cells: ["", ""] },
 { RowHeader: "", Cells: ["", ""] }
];
const DEFAULT_TABLE: TablePayload = {
 Columns: DEFAULT_COLUMNS,
 Rows: DEFAULT_ROWS,
 VisitMeta: [],
 AssessmentMeta: []
};
function normalizePayload(obj: Partial<TablePayload>): TablePayload {
 const cols = Array.isArray(obj.Columns) && obj.Columns.length > 0 ? obj.Columns : DEFAULT_COLUMNS;
 const rows =
   Array.isArray(obj.Rows) && obj.Rows.length > 0
     ? obj.Rows.map(r => ({
         RowHeader: r.RowHeader ?? "",
         Cells: Array.isArray(r.Cells) ? r.Cells : Array(cols.length).fill("")
       }))
     : DEFAULT_ROWS;
 // normalize row cell lengths
 const normRows = rows.map(r => ({
   RowHeader: r.RowHeader ?? "",
   Cells: (r.Cells || []).slice(0, cols.length).concat(
     Array(Math.max(cols.length - (r.Cells ? r.Cells.length : 0), 0)).fill("")
   )
 }));
 const visitMeta = Array.isArray(obj.VisitMeta) ? obj.VisitMeta : [];
 const assessmentMeta = Array.isArray(obj.AssessmentMeta) ? obj.AssessmentMeta : [];
 return {
   Columns: cols,
   Rows: normRows,
   VisitMeta: visitMeta,
   AssessmentMeta: assessmentMeta
 };
}
function parsePayload(raw?: string): TablePayload {
 if (!raw || raw.trim() === "") return DEFAULT_TABLE;
 try {
   const obj = JSON.parse(raw) as Partial<TablePayload>;
   if (!obj || typeof obj !== "object") return DEFAULT_TABLE;
   return normalizePayload(obj);
 } catch {
   return DEFAULT_TABLE;
 }
}
type PaneState =
 | { mode: "column"; index: number }
 | { mode: "row"; index: number }
 | null;
 
export const Matrix: React.FC<MatrixProps> = ({ initialJson, onChange }) => {

  // start with defaults

  const [columns, setColumns] = React.useState<string[]>(DEFAULT_TABLE.Columns);

  const [rows, setRows] = React.useState<Row[]>(DEFAULT_TABLE.Rows);

  const [visitMeta, setVisitMeta] = React.useState<VisitMeta[]>([]);

  const [assessmentMeta, setAssessmentMeta] = React.useState<AssessmentMeta[]>([]);

  const [pane, setPane] = React.useState<PaneState>(null);

  // whenever initialJson changes (e.g., varMatrixJSON loaded from SharePoint),

  // re-hydrate the table state from it

  React.useEffect(() => {

    const parsed = parsePayload(initialJson);

    setColumns(parsed.Columns);

    setRows(parsed.Rows);

    setVisitMeta(parsed.VisitMeta || []);

    setAssessmentMeta(parsed.AssessmentMeta || []);

  }, [initialJson]);
 
 // keep JSON in sync
 React.useEffect(() => {
   const payload: TablePayload = {
     Columns: columns,
     Rows: rows,
     VisitMeta: visitMeta,
     AssessmentMeta: assessmentMeta
   };
   onChange(JSON.stringify(payload));
 }, [columns, rows, visitMeta, assessmentMeta, onChange]);
 // --- helpers ------------------------------------------------------
 const addColumn = () => {
   const newColName = "";
   setColumns(prev => [...prev, newColName]);
   setRows(prev => prev.map(r => ({ ...r, Cells: [...r.Cells, ""] })));
   setVisitMeta(prev => [...prev, {}]); // keep index aligned
 };
 const addRow = () => {
   setRows(prev => [...prev, { RowHeader: "", Cells: Array(columns.length).fill("") }]);
   setAssessmentMeta(prev => [...prev, {}]); // keep index aligned
 };
 const removeColumn = (i: number) => {
   setColumns(prev => prev.filter((_, idx) => idx !== i));
   setRows(prev =>
     prev.map(r => ({
       ...r,
       Cells: r.Cells.filter((_, idx) => idx !== i)
     }))
   );
   setVisitMeta(prev => prev.filter((_, idx) => idx !== i));
   // close pane if it was this column
   setPane(p => (p && p.mode === "column" && p.index === i ? null : p));
 };
 const removeRow = (i: number) => {
   setRows(prev => prev.filter((_, idx) => idx !== i));
   setAssessmentMeta(prev => prev.filter((_, idx) => idx !== i));
   setPane(p => (p && p.mode === "row" && p.index === i ? null : p));
 };
 const renameColumn = (i: number, v: string) => {
   setColumns(prev => prev.map((c, idx) => (idx === i ? v : c)));
 };
 const renameRow = (i: number, v: string) => {
   setRows(prev => prev.map((r, idx) => (idx === i ? { ...r, RowHeader: v } : r)));
 };
 const setCell = (rIndex: number, cIndex: number, v: string) => {
   setRows(prev => {
     const copy = [...prev];
     const row = { ...copy[rIndex] };
     const cells = [...row.Cells];
     cells[cIndex] = v;
     row.Cells = cells;
     copy[rIndex] = row;
     return copy;
   });
 };
 const moveColumn = (from: number, to: number) => {
   if (to < 0 || to >= columns.length) return;
   setColumns(prev => {
     const copy = [...prev];
     const [moved] = copy.splice(from, 1);
     copy.splice(to, 0, moved);
     return copy;
   });
   setRows(prev =>
     prev.map(r => {
       const cells = [...r.Cells];
       const [movedCell] = cells.splice(from, 1);
       cells.splice(to, 0, movedCell);
       return { ...r, Cells: cells };
     })
   );
   setVisitMeta(prev => {
     const arr = [...prev];
     const [movedMeta] = arr.splice(from, 1);
     arr.splice(to, 0, movedMeta);
     return arr;
   });
 };
 const moveRow = (from: number, to: number) => {
   if (to < 0 || to >= rows.length) return;
   setRows(prev => {
     const copy = [...prev];
     const [moved] = copy.splice(from, 1);
     copy.splice(to, 0, moved);
     return copy;
   });
   setAssessmentMeta(prev => {
     const arr = [...prev];
     const [movedMeta] = arr.splice(from, 1);
     arr.splice(to, 0, movedMeta);
     return arr;
   });
 };
 // visit pane: set dropdowns + update header label
 const updateVisitMeta = (index: number, patch: Partial<VisitMeta>) => {
   setVisitMeta(prev => {
     const arr = [...prev];
     const current = arr[index] || {};
     const updated: VisitMeta = { ...current, ...patch };
     arr[index] = updated;
     const headerText = [updated.VisitNumber, updated.VisitName].filter(Boolean).join(" - ");
     setColumns(prevCols => {
       const cols = [...prevCols];
       cols[index] = headerText;
       return cols;
     });
     return arr;
   });
 };
 const updateAssessmentMeta = (index: number, patch: Partial<AssessmentMeta>) => {
   setAssessmentMeta(prev => {
     const arr = [...prev];
     const current = arr[index] || {};
     const updated: AssessmentMeta = { ...current, ...patch };
     arr[index] = updated;
     const headerText = updated.AssessmentName ?? "";
     setRows(prevRows => {
       const rowsCopy = [...prevRows];
       const row = rowsCopy[index] || { RowHeader: "", Cells: Array(columns.length).fill("") };
       rowsCopy[index] = { ...row, RowHeader: headerText };
       return rowsCopy;
     });
     return arr;
   });
 };
 // --- render panes -------------------------------------------------
 const renderPane = () => {
   if (!pane) return null;
   if (pane.mode === "column") {
     const vm = visitMeta[pane.index] || {};
     return (
<div className="dm-pane">
<div className="dm-pane-content">
<div className="dm-pane-header">
<h3>Build Visit (Column {pane.index + 1})</h3>
<button type="button" className="dm-pane-close" onClick={() => setPane(null)}>
               ×
</button>
</div>
<div className="dm-pane-field">
<label>Visit Number</label>
<select
               value={vm.VisitNumber ?? ""}
               onChange={e => updateVisitMeta(pane.index, { VisitNumber: e.target.value })}
>
<option value=""></option>
<option value="Visit 00">Visit 00</option>
<option value="Visit 0">Visit 0</option>
<option value="Visit 1">Visit 1</option>
<option value="Visit 2">Visit 2</option>
<option value="Visit 3">Visit 3</option>
<option value="Visit 4">Visit 4</option>
<option value="Visit 5">Visit 5</option>
<option value="Visit 6">Visit 6</option>
<option value="Visit 7">Visit 7</option>
<option value="Visit 8">Visit 8</option>
<option value="Visit 9">Visit 9</option>
<option value="Visit 10">Visit 10</option>
<option value="Visit 11">Visit 11</option>
<option value="Visit 12">Visit 12</option>
<option value="Visit 13">Visit 13</option>
<option value="Visit 14">Visit 14</option>
<option value="Visit 15">Visit 15</option>
<option value="Visit 16">Visit 16</option>
<option value="Visit 17">Visit 17</option>
<option value="Visit 18">Visit 18</option>
<option value="Visit 19">Visit 19</option>
<option value="Visit 20">Visit 20</option>
</select>
</div>
<div className="dm-pane-field">
<label>Visit Name</label>
<select
               value={vm.VisitName ?? ""}
               onChange={e => updateVisitMeta(pane.index, { VisitName: e.target.value })}
>
<option value=""></option>
<option value="Baseline">Baseline</option>
<option value="Lens">Lens</option>
<option value="Exit">Exit</option>
</select>
</div>
<div className="dm-pane-footer">
<button type="button" onClick={() => setPane(null)}>
               Save & Close
</button>
</div>
</div>
</div>
     );
   }
   if (pane.mode === "row") {
     const am = assessmentMeta[pane.index] || {};
     return (
<div className="dm-pane">
<div className="dm-pane-content">
<div className="dm-pane-header">
<h3>Build Assessment (Row {pane.index + 1})</h3>
<button type="button" className="dm-pane-close" onClick={() => setPane(null)}>
               ×
</button>
</div>
<div className="dm-pane-field">
<label>Assessment Name</label>
<select
               value={am.AssessmentName ?? ""}
               onChange={e => updateAssessmentMeta(pane.index, { AssessmentName: e.target.value })}
>
<option value=""></option>
<option value="Adverse Events">Adverse Events</option>
<option value="Demographics">Demographics</option>
<option value="Inclusion/ Exclusion Criteria">Inclusion/ Exclusion Criteria</option>
<option value="Informed Consent">Informed Consent</option>
</select>
</div>
<div className="dm-pane-footer">
<button type="button" onClick={() => setPane(null)}>
               Save & Close
</button>
</div>
</div>
</div>
     );
   }
   return null;
 };
 // --- main render ---------------------------------------------------
 return (
<div className="dm-container">
<div className="dm-toolbar">
<button type="button" onClick={addRow}>
         + Add Row
</button>
<button type="button" onClick={addColumn}>
         + Add Column
</button>
</div>
<div className="dm-table-wrapper">
<table className="dm-table" cellPadding={4} cellSpacing={0}>
<thead>
<tr>
<th style={{ minWidth: 180 }}>Row Header</th>
             {columns.map((c, i) => (
<th key={i}>
<div className="dm-col-header-wrapper">
<input
                     value={c}
                     onChange={e => renameColumn(i, e.target.value)}
                     className="dm-input dm-col-header"
                   />
<div className="dm-header-buttons">
<button
                       type="button"
                       className="dm-small"
                       onClick={() => moveColumn(i, i - 1)}
                       title="Move left"
>
                       ←
</button>
<button
                       type="button"
                       className="dm-small"
                       onClick={() => moveColumn(i, i + 1)}
                       title="Move right"
>
                       →
</button>
<button
                       type="button"
                       className="dm-small"
                       onClick={() => setPane({ mode: "column", index: i })}
                       title="Build visit"
>
                       ⚙
</button>
<button
                       type="button"
                       className="dm-danger dm-small"
                       onClick={() => removeColumn(i)}
                       title="Delete column"
>
                       ×
</button>
</div>
</div>
</th>
             ))}
</tr>
</thead>
<tbody>
           {rows.map((r, ri) => (
<tr key={ri}>
<td>
<div className="dm-row-head">
<input
                     value={r.RowHeader}
                     onChange={e => renameRow(ri, e.target.value)}
                     className="dm-input dm-row-header"
                   />
<div className="dm-header-buttons">
<button
                       type="button"
                       className="dm-small"
                       onClick={() => moveRow(ri, ri - 1)}
                       title="Move up"
>
                       ↑
</button>
<button
                       type="button"
                       className="dm-small"
                       onClick={() => moveRow(ri, ri + 1)}
                       title="Move down"
>
                       ↓
</button>
<button
                       type="button"
                       className="dm-small"
                       onClick={() => setPane({ mode: "row", index: ri })}
                       title="Build assessment"
>
                       ⚙
</button>
<button
                       type="button"
                       className="dm-danger dm-small"
                       onClick={() => removeRow(ri)}
                       title="Delete row"
>
                       ×
</button>
</div>
</div>
</td>
               {columns.map((_, ci) => (
<td key={ci}>
<input
                     value={r.Cells[ci] ?? ""}
                     onChange={e => setCell(ri, ci, e.target.value)}
                     className="dm-input dm-cell"
                   />
</td>
               ))}
</tr>
           ))}
</tbody>
</table>
</div>
     {renderPane()}
</div>
 );
};