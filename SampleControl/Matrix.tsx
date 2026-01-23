import * as React from "react";
type Row = { RowHeader: string; Cells: string[] };
type VisitMeta = {
 VisitNumber?: string;
 VisitName?: string;
};
type AssessmentMeta = {
 AssessmentName?: string;
 Eye?: string;
 Correction?: string;
 Notation?: string;
 Distance?: string;
 Lighting?: string;
 Contrast?: string;
 Specify_Bioslit?: string;
 Metadata_Bioslit?: string[];
 // ✅ NEW: custom assessment support
 IsCustom?: boolean;
 CustomAssessment?: string;
};
type TablePayload = {
 Columns: string[];
 Rows: Row[];
 VisitMeta?: VisitMeta[];
 AssessmentMeta?: AssessmentMeta[];
 AssessmentNames?: string[];
};
export type MatrixProps = {
 initialJson?: string;
 onChange: (json: string) => void;
};
// -------------------- Constants --------------------
const ASSESSMENT_OPTIONS: string[] = [
 "Aberrometry",
 "Adverse Event(s)",
 "Autorefractometry",
 "Axial Length",
 "Axis Orientation",
 "Baseline Characteristics",
 "Best Corrected Distance Visual Acuity (BCDVA)",
 "Best Corrected Intermediate Visual Acuity (BCIVA)",
 "Best Corrected Near Visual Acuity (BCNVA)",
 "Best Corrected Visual Acuity (BCVA)",
 "Biometry",
 "Biomicroscopy",
 "Canadian Dry Eye Epidemiology Study (CANDEES)",
 "Nd:YAG capsulotomy",
 "Cataract Grading",
 "Conjunctival Staining",
 "Contact Lens Corrected Distance Visual Acuity (CLCDVA)",
 "Contact Lens Dry Eye Questionnaire (CLDEQ)",
 "Continuous Wear Duration",
 "Contrast Sensitivity",
 "Corneal Topography",
 "Cycloplegic Refraction",
 "Defocus Curve",
 "Demographics",
 "Device Deficiency",
 "Digital Device Use",
 "Distance Corrected Intermediate Visual Acuity (DCIVA)",
 "Distance Corrected Near Visual Acuity (DCNVA)",
 "Distance Corrected Visual Acuity (DCVA)",
 "Dry Eye Drops Usage",
 "Dry Eye Questionnaire (DEQ)",
 "Dry Eye Screening for Dry Eye Epidemiology Projects (DEEP)",
 "ECP Rating on Ease of Fit",
 "ePRO",
 "Exposure",
 "Fundus Examination",
 "Gonioscopy",
 "Habitual History",
 "History of Primary Diagnosis",
 "Horizontal Visible Iris Diameter (HVID)",
 "Hours of Digital Use Per Day",
 "Impact of Dry Eye in Everyday Life (IDEEL)",
 "Inclusion / Exclusion Criteria",
 "Informed Consent",
 "Intraocular Lens Satisfaction (IOLSAT)",
 "Intraocular Pressure",
 "IOL Information",
 "IOL Observations",
 "IOL Position (Tilt and Centration)",
 "IP Dispense",
 "Keratometry",
 "Lens Fit Assessments",
 "Lens Oscillation",
 "Lens Rotational Recovery",
 "Lens Settling Time",
 "Lens Surface Assessments (Wettabiity, Deposits)",
 "Lens Wear Time",
 "Lissamine Green Circumlimbal Conjunctival Staining",
 "Manifest Refraction",
 "McCarty Symptom Questionnaire",
 "McMonnies Questionnaire",
 "Medical History and Concomitant Medications",
 "Meibomian Gland Functionality Assessment",
 "Misallocation",
 "National Eye Institute Visual Function Questionnaire-25 (NEI-VFQ25)",
 "Non-Invasive Keratography Break-Up Time (NIKBUT)",
 "Non-Invasive Tear Break-Up Time (NITBUT)",
 "Number of Lenses for Successful Fit",
 "Objective Refraction",
 "Ocular Comfort Index (OCI)",
 "Ocular Hypotensive Medications",
 "Ocular Surface Disease Index (OSDI)",
 "Optical Coherence Tomography (OCT)",
 "Optional Assessments",
 "Pachymetry",
 "Physical Examination (Targeted)",
 "Posterior Capsule Opacification",
 "Pregnancy Test",
 "Pupil Size",
 "Quality of Vision (QoV)",
 "Questionnaire for Visual Disturbances (QUVID)",
 "Range of Vision",
 "Reading Speed",
 "Rewetting Drop Usage",
 "Schein Questionnaire",
 "Scribe Mark Visibility",
 "Slit Lamp Examination",
 "Standard Patient Evaluation of Eye Dryness Questionnaire (SPEED)",
 "Stereopsis Test",
 "Study Lens Power",
 "Subject Diary",
 "Subjective Likert Questionnaire (5-Point Scale)",
 "Subjective Ratings",
 "Subjective Ratings (1-10 Scale)",
 "Symptom Assessment In Dry Eye (SANDE)",
 "Symptomatology Questionnaire",
 "Symptoms, Problems, and Complaints",
 "Tear Meniscus Height",
 "Texas Eye Research and Technology Center Dry Eye Questionnaire (TERTC-DEQ)",
 "Time to Questionnaire Completion",
 "Uncorrected Distance Visual Acuity (UCDVA)",
 "Uncorrected Intermediate Visual Acuity (UCIVA)",
 "Uncorrected Near Visual Acuity (UCNVA)",
 "Uncorrected Visual Acuity (UCVA)",
 "Unplanned Lens Replacment",
 "Vision Stability with Blink",
 "Visual Acuity",
 "Visual Analog Scale (VAS)",
 "Visual Blur Profile",
 "Visual Field Test",
 "Vital Signs",
 "Surgical Report",
 "Depth of Focus",
 "Severity Score",
 "Secondary Surgical Interventions",
 "Anterior Chamber Depth",
 "Target Residual Refractive Error",
 "Predicted Residual Astigmatism",
 "Stimulus-Based Subjective Questions",
 "Real-World Subjective Questions",
 "Randomization"
];
const ASSESSMENTS_WITH_EYE: string[] = [
 "Aberrometry",
 "Autorefractometry",
 "Axial Length",
 "Axis Orientation",
 "Biometry",
 "Nd:YAG capsulotomy",
 "Cataract Grading",
 "Conjunctival Staining",
 "Continuous Wear Duration",
 "Corneal Topography",
 "Device Deficiency",
 "Dry Eye Drops Usage",
 "Dry Eye Questionnaire (DEQ)",
 "Dry Eye Screening for Dry Eye Epidemiology Projects (DEEP)",
 "ECP Rating on Ease of Fit",
 "Fundus Examination",
 "Gonioscopy",
 "History of Primary Diagnosis",
 "Horizontal Visible Iris Diameter (HVID)",
 "Impact of Dry Eye in Everyday Life (IDEEL)",
 "Intraocular Lens Satisfaction (IOLSAT)",
 "Intraocular Pressure",
 "IOL Information",
 "IOL Observations",
 "IOL Position (Tilt and Centration)",
 "Keratometry",
 "Lens Oscillation",
 "Lens Rotational Recovery",
 "Lens Settling Time",
 "Lens Surface Assessments (Wettabiity, Deposits)",
 "Lens Wear Time",
 "Lissamine Green Circumlimbal Conjunctival Staining",
 "McCarty Symptom Questionnaire",
 "McMonnies Questionnaire",
 "Meibomian Gland Functionality Assessment",
 "National Eye Institute Visual Function Questionnaire-25 (NEI-VFQ25)",
 "Non-Invasive Keratography Break-Up Time (NIKBUT)",
 "Non-Invasive Tear Break-Up Time (NITBUT)",
 "Number of Lenses for Successful Fit",
 "Ocular Comfort Index (OCI)",
 "Ocular Surface Disease Index (OSDI)",
 "Optical Coherence Tomography (OCT)",
 "Pachymetry",
 "Posterior Capsule Opacification",
 "Pupil Size",
 "Quality of Vision (QoV)",
 "Questionnaire for Visual Disturbances (QUVID)",
 "Rewetting Drop Usage",
 "Schein Questionnaire",
 "Scribe Mark Visibility",
 "Standard Patient Evaluation of Eye Dryness Questionnaire (SPEED)",
 "Stereopsis Test",
 "Study Lens Power",
 "Symptom Assessment In Dry Eye (SANDE)",
 "Tear Meniscus Height",
 "Texas Eye Research and Technology Center Dry Eye Questionnaire (TERTC-DEQ)",
 "Unplanned Lens Replacment",
 "Vision Stability with Blink",
 "Visual Blur Profile",
 "Surgical Report",
 "Secondary Surgical Interventions",
 "Anterior Chamber Depth",
 "Target Residual Refractive Error",
 "Predicted Residual Astigmatism",
 "Stimulus-Based Subjective Questions",
 "Real-World Subjective Questions",
 "Randomization"
];
const VISUAL_ACUITY_ASSESSMENTS: string[] = [
 "Best Corrected Distance Visual Acuity (BCDVA)",
 "Best Corrected Intermediate Visual Acuity (BCIVA)",
 "Best Corrected Near Visual Acuity (BCNVA)",
 "Best Corrected Visual Acuity (BCVA)",
 "Contact Lens Corrected Distance Visual Acuity (CLCDVA)",
 "Distance Corrected Intermediate Visual Acuity (DCIVA)",
 "Distance Corrected Near Visual Acuity (DCNVA)",
 "Distance Corrected Visual Acuity (DCVA)",
 "Uncorrected Distance Visual Acuity (UCDVA)",
 "Uncorrected Intermediate Visual Acuity (UCIVA)",
 "Uncorrected Near Visual Acuity (UCNVA)",
 "Uncorrected Visual Acuity (UCVA)"
];
const BIOSLIT_ASSESSMENTS: string[] = [
 "Biomicroscopy",
 "Slit Lamp Examination",
];
const CORRECTION_OPTIONS: string[] = [
 "with Habitual Correction",
 "with Habitual Lens",
 "with Study Lenses",
 "with Study Lenses and Over-Spectacles",
 "with Over Refraction",
 "with Manifest Refraction",
 "with Autorefraction"
];
const EYE_OPTIONS: string[] = [
 "OD",
 "OS",
 "OU",
 "Study Eye",
 "Monocular",
 "Binocular",
 "OD/OS",
 "OD/OS/OU",
 "(Fellow Eye)"
];
const NOTATION_OPTIONS: string[] = [
 "Snellen",
 "logMAR",
 "Decimal",
 "Letters Read"
];
const DISTANCE_OPTIONS: string[] = [
 "6m",
 "4m",
 "2m",
 "1m",
 "120cm",
 "66cm",
 "60cm",
 "40cm",
 "33cm"
];
const LIGHTING_OPTIONS: string[] = [
 "Photopic",
 "Mesopic",
 "Scotopic",
 "Bright Light"
];
const CONTRAST_OPTIONS: string[] = [
 "High Contrast",
 "Low Contrast"
];
const BIOSLIT_SPECIFY: string[] = [
 "(Change in Corneal Signs)",
 "(Corneal Haze)",
 "(Epithelial Defect)",
 "(Epithelial Ingrowth)",
 "(Lens Opacification)",
 "(Retroillumination)",
 "(Targeted)",
 "(Posterior capsule opacification)",
 "(Posterior capsulotomy evaluation)"
];
const BIOSLIT_METADATA_MULTISELECT: string[] = [
 "Anterior capsule phimosis",
 "Anterior Chamber Cells",
 "Anterior Chamber Flare",
 "Anterior Chamber Synechiae",
 "Arcus Lipoides",
 "Bulbar Redness",
 "Chemosis",
 "Conjunctiva",
 "Conjunctival Compression/Indentation",
 "Conjunctival Edema",
 "Conjunctival Hyperemia",
 "Conjunctival Staining",
 "Cornea",
 "Corneal Edema",
 "Corneal Epithelial Edema",
 "Corneal Infiltrates",
 "Corneal Staining",
 "Corneal Stromal Edema",
 "Corneal Vascularization",
 "Keratic Precipitates",
 "Lens Opacity",
 "Lens Status",
 "Lids",
 "Limbal Hyperemia",
 "Microbial Keratitis",
 "Neovascularization and Stromal Haze",
 "Palpebral Conjunctival",
 "Posterior Chamber Synechiae",
 "Rueosis Iridis",
 "Subconjunctival Hemorrhage"
];
const hasEyeDropdown = (name?: string): boolean =>
 !!name && (ASSESSMENTS_WITH_EYE.includes(name) || VISUAL_ACUITY_ASSESSMENTS.includes(name));
const isVisualAcuityAssessment = (name?: string): boolean =>
 !!name && VISUAL_ACUITY_ASSESSMENTS.includes(name);
const isBioslitAssessment = (name?: string): boolean =>
 !!name && BIOSLIT_ASSESSMENTS.includes(name);
// ✅ UPDATED: supports custom assessment rows
const formatAssessmentHeader = (meta: AssessmentMeta): string => {
 if (meta.IsCustom) return meta.CustomAssessment ?? "";
 if (!meta.AssessmentName) return "";
 const parts: string[] = [];
 if (meta.Eye) parts.push(meta.Eye);
 if (meta.Correction) parts.push(meta.Correction);
 if (meta.Notation) parts.push(meta.Notation);
 if (meta.Distance) parts.push(meta.Distance);
 if (meta.Lighting) parts.push(meta.Lighting);
 if (meta.Contrast) parts.push(meta.Contrast);
 if (meta.Specify_Bioslit) parts.push(meta.Specify_Bioslit);
 if (parts.length === 0) return meta.AssessmentName;
 return `${meta.AssessmentName} ${parts.join(", ")}`;
};
const DEFAULT_COLUMNS = ["", ""];
// ✅ NEW: default 5 assessment rows on first load
const DEFAULT_ASSESSMENTS: string[] = [
 "Adverse Event(s)",
 "Demographics",
 "Inclusion / Exclusion Criteria",
 "Informed Consent",
 "Medical History and Concomitant Medications"
];
const DEFAULT_ROWS: Row[] = DEFAULT_ASSESSMENTS.map(() => ({
 RowHeader: "",
 Cells: ["", ""]
}));
const DEFAULT_ASSESSMENT_META: AssessmentMeta[] = DEFAULT_ASSESSMENTS.map(a => ({
 AssessmentName: a,
 IsCustom: false,
 Metadata_Bioslit: []
}));
const DEFAULT_TABLE: TablePayload = {
 Columns: DEFAULT_COLUMNS,
 Rows: DEFAULT_ROWS,
 VisitMeta: [],
 AssessmentMeta: DEFAULT_ASSESSMENT_META,
 AssessmentNames: DEFAULT_ASSESSMENTS
};
function normalizePayload(obj: Partial<TablePayload>): TablePayload {
 const cols = Array.isArray(obj.Columns) && obj.Columns.length > 0 ? obj.Columns : DEFAULT_COLUMNS;
 const rows =
   Array.isArray(obj.Rows) && obj.Rows.length > 0
     ? obj.Rows.map(r => ({
         RowHeader: r.RowHeader ?? "",
         Cells: Array.isArray(r.Cells) ? r.Cells : Array(cols.length).fill("")
       }))
     : DEFAULT_ROWS.map(r => ({
         RowHeader: r.RowHeader,
         Cells: Array(cols.length).fill("")
       }));
 const normRows = rows.map(r => ({
   RowHeader: r.RowHeader ?? "",
   Cells: (r.Cells || []).slice(0, cols.length).concat(
     Array(Math.max(cols.length - (r.Cells ? r.Cells.length : 0), 0)).fill("")
   )
 }));
 const visitMeta = Array.isArray(obj.VisitMeta) ? obj.VisitMeta : [];
 const assessmentMeta = Array.isArray(obj.AssessmentMeta) ? obj.AssessmentMeta : [];
 const assessmentNames = Array.isArray(obj.AssessmentNames) ? obj.AssessmentNames : undefined;
 return {
   Columns: cols,
   Rows: normRows,
   VisitMeta: visitMeta,
   AssessmentMeta: assessmentMeta,
   AssessmentNames: assessmentNames
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
// -------------------- Component --------------------
export const Matrix: React.FC<MatrixProps> = ({ initialJson, onChange }) => {
 const [columns, setColumns] = React.useState<string[]>(DEFAULT_TABLE.Columns);
 const [rows, setRows] = React.useState<Row[]>(DEFAULT_TABLE.Rows);
 const [visitMeta, setVisitMeta] = React.useState<VisitMeta[]>([]);
 const [assessmentMeta, setAssessmentMeta] = React.useState<AssessmentMeta[]>([]);
 const [pane, setPane] = React.useState<PaneState>(null);
 // ✅ bioslit dropdown open index must live INSIDE component
 const [openBioSlitMenuIndex, setOpenBioSlitMenuIndex] = React.useState<number | null>(null);
 // ✅ NEW: searchable assessment picker state (per open pane)
 const [assessmentSearch, setAssessmentSearch] = React.useState<string>("");
 const [assessmentDropdownOpen, setAssessmentDropdownOpen] = React.useState<boolean>(false);
 // ✅ NEW: custom assessment mode state
 const [customModeRowIndex, setCustomModeRowIndex] = React.useState<number | null>(null);
 const [customAssessmentText, setCustomAssessmentText] = React.useState<string>("");
 // Re-hydrate from JSON
 React.useEffect(() => {
   const parsed = parsePayload(initialJson);
   setColumns(parsed.Columns);
   setRows(parsed.Rows);
   setVisitMeta(parsed.VisitMeta || []);
   setAssessmentMeta(parsed.AssessmentMeta || []);
   // ✅ If initialJson is empty, ensure row headers are populated for defaults
   if (!initialJson || initialJson.trim() === "") {
     setRows(prev => {
       const updated = [...prev];
       const meta = parsed.AssessmentMeta || DEFAULT_ASSESSMENT_META;
       for (let i = 0; i < updated.length; i++) {
         const m = meta[i] || {};
         updated[i] = { ...updated[i], RowHeader: formatAssessmentHeader(m) };
       }
       return updated;
     });
   }
 }, [initialJson]);
 // keep JSON in sync
 React.useEffect(() => {
   const assessmentNames = assessmentMeta
     .map(m => m.AssessmentName)
     .filter((x): x is string => !!x);
   const payload: TablePayload = {
     Columns: columns,
     Rows: rows,
     VisitMeta: visitMeta,
     AssessmentMeta: assessmentMeta,
     AssessmentNames: assessmentNames
   };
   onChange(JSON.stringify(payload));
 }, [columns, rows, visitMeta, assessmentMeta, onChange]);
 // ✅ highlight indices derived from pane
 const selectedColIndex = pane?.mode === "column" ? pane.index : null;
 const selectedRowIndex = pane?.mode === "row" ? pane.index : null;
 // -------------------- helpers --------------------
 const addColumn = () => {
   setColumns(prev => [...prev, ""]);
   setRows(prev => prev.map(r => ({ ...r, Cells: [...r.Cells, ""] })));
   setVisitMeta(prev => [...prev, {}]);
 };
 const addRow = () => {
   setRows(prev => [...prev, { RowHeader: "", Cells: Array(columns.length).fill("") }]);
   setAssessmentMeta(prev => [...prev, { Metadata_Bioslit: [] }]);
 };
 const removeColumn = (i: number) => {
   setColumns(prev => prev.filter((_, idx) => idx !== i));
   setRows(prev => prev.map(r => ({ ...r, Cells: r.Cells.filter((_, idx) => idx !== i) })));
   setVisitMeta(prev => prev.filter((_, idx) => idx !== i));
   setPane(p => (p && p.mode === "column" && p.index === i ? null : p));
 };
 const removeRow = (i: number) => {
   setRows(prev => prev.filter((_, idx) => idx !== i));
   setAssessmentMeta(prev => prev.filter((_, idx) => idx !== i));
   setPane(p => (p && p.mode === "row" && p.index === i ? null : p));
   setCustomModeRowIndex(prev => (prev === i ? null : prev));
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
 // Visit pane update
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
     const current = arr[index] || { Metadata_Bioslit: [] };
     let updated: AssessmentMeta = { ...current, ...patch };
     // If AssessmentName changed, reset dependent fields (keep your prior behavior)
     if (patch.AssessmentName !== undefined) {
       updated = {
         AssessmentName: patch.AssessmentName,
         Eye: undefined,
         Correction: undefined,
         Notation: undefined,
         Distance: undefined,
         Lighting: undefined,
         Contrast: undefined,
         Specify_Bioslit: undefined,
         Metadata_Bioslit: [],
         IsCustom: false,
         CustomAssessment: undefined
       };
     }
     // If switching to custom
     if (patch.IsCustom) {
       updated = {
         IsCustom: true,
         CustomAssessment: patch.CustomAssessment ?? updated.CustomAssessment ?? "",
         Metadata_Bioslit: [],
         AssessmentName: undefined,
         Eye: undefined,
         Correction: undefined,
         Notation: undefined,
         Distance: undefined,
         Lighting: undefined,
         Contrast: undefined,
         Specify_Bioslit: undefined
       };
     }
     arr[index] = updated;
     const headerText = formatAssessmentHeader(updated);
     setRows(prevRows => {
       const rowsCopy = [...prevRows];
       const row = rowsCopy[index] || { RowHeader: "", Cells: Array(columns.length).fill("") };
       rowsCopy[index] = { ...row, RowHeader: headerText };
       return rowsCopy;
     });
     return arr;
   });
 };
 // -------------------- Searchable assessment picker --------------------
 const filteredAssessmentOptions = React.useMemo(() => {
   const q = assessmentSearch.trim().toLowerCase();
   if (!q) return ASSESSMENT_OPTIONS;
   return ASSESSMENT_OPTIONS.filter(opt => opt.toLowerCase().includes(q));
 }, [assessmentSearch]);
 // -------------------- Render pane --------------------
 const renderPane = () => {
   if (!pane) return null;
   // -------------------- Column pane --------------------
   if (pane.mode === "column") {
     const vm = visitMeta[pane.index] || {};
     return (
<div className="dm-pane">
<div className="dm-pane-content">
<div className="dm-pane-header">
<h3>Visit Details</h3>
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
               {Array.from({ length: 21 }, (_, i) => i).map(i => (
<option key={i} value={`Visit ${i}`}>
                   {`Visit ${i}`}
</option>
               ))}
<option value="Visit 00">Visit 00</option>
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
   // -------------------- Row pane --------------------
   if (pane.mode === "row") {
     const am = assessmentMeta[pane.index] || { Metadata_Bioslit: [] };
     const showEye = hasEyeDropdown(am.AssessmentName);
     const isVA = isVisualAcuityAssessment(am.AssessmentName);
     const isBioslit = isBioslitAssessment(am.AssessmentName);
     const isCustomMode = customModeRowIndex === pane.index;
     return (
<div className="dm-pane">
<div className="dm-pane-content">
<div className="dm-pane-header">
             {/* ✅ requirement #2 */}
<h3>Assessment Details</h3>
<button type="button" className="dm-pane-close" onClick={() => setPane(null)}>
               ×
</button>
</div>
           {/* ✅ requirement #3: custom entry mode */}
           {isCustomMode ? (
<div className="dm-pane-field">
<label>Custom Assessment</label>
<input
                 className="dm-input"
                 value={customAssessmentText}
                 onChange={e => setCustomAssessmentText(e.target.value)}
                 placeholder="Type any custom assessment name..."
               />
<div className="dm-help-text">
                 This will replace the row header with your custom text.
</div>
</div>
           ) : (
<>
               {/* ✅ requirement #4: searchable assessment selector */}
<div className="dm-pane-field">
<label>Assessment Name</label>
<div className="dm-search-select">
<input
                     className="dm-input"
                     value={assessmentDropdownOpen ? assessmentSearch : (am.AssessmentName ?? "")}
                     placeholder="Type to search..."
                     onFocus={() => {
                       setAssessmentDropdownOpen(true);
                       setAssessmentSearch(am.AssessmentName ?? "");
                     }}
                     onChange={e => {
                       setAssessmentDropdownOpen(true);
                       setAssessmentSearch(e.target.value);
                     }}
                   />
                   {assessmentDropdownOpen && (
<div className="dm-search-select-menu">
<div
                         className="dm-search-select-item dm-clear"
                         onClick={() => {
                           updateAssessmentMeta(pane.index, { AssessmentName: "" });
                           setAssessmentSearch("");
                           setAssessmentDropdownOpen(false);
                         }}
>
                         (Clear)
</div>
                       {filteredAssessmentOptions.slice(0, 200).map(name => (
<div
                           key={name}
                           className="dm-search-select-item"
                           onClick={() => {
                             updateAssessmentMeta(pane.index, { AssessmentName: name });
                             setAssessmentSearch(name);
                             setAssessmentDropdownOpen(false);
                           }}
>
                           {name}
</div>
                       ))}
                       {filteredAssessmentOptions.length === 0 && (
<div className="dm-search-select-item dm-empty">
                           No matches
</div>
                       )}
</div>
                   )}
</div>
</div>
               {/* Eye dropdown */}
               {showEye && (
<div className="dm-pane-field">
<label>Eye</label>
<select
                     value={am.Eye ?? ""}
                     onChange={e => updateAssessmentMeta(pane.index, { Eye: e.target.value })}
>
<option value=""></option>
                     {EYE_OPTIONS.map(opt => (
<option key={opt} value={opt}>
                         {opt}
</option>
                     ))}
</select>
</div>
               )}
               {/* VA dropdowns */}
               {isVA && (
<>
<div className="dm-pane-field">
<label>Correction</label>
<select
                       value={am.Correction ?? ""}
                       onChange={e => updateAssessmentMeta(pane.index, { Correction: e.target.value })}
>
<option value=""></option>
                       {CORRECTION_OPTIONS.map(opt => (
<option key={opt} value={opt}>
                           {opt}
</option>
                       ))}
</select>
</div>
<div className="dm-pane-field">
<label>Notation</label>
<select
                       value={am.Notation ?? ""}
                       onChange={e => updateAssessmentMeta(pane.index, { Notation: e.target.value })}
>
<option value=""></option>
                       {NOTATION_OPTIONS.map(opt => (
<option key={opt} value={opt}>
                           {opt}
</option>
                       ))}
</select>
</div>
<div className="dm-pane-field">
<label>Distance</label>
<select
                       value={am.Distance ?? ""}
                       onChange={e => updateAssessmentMeta(pane.index, { Distance: e.target.value })}
>
<option value=""></option>
                       {DISTANCE_OPTIONS.map(opt => (
<option key={opt} value={opt}>
                           {opt}
</option>
                       ))}
</select>
</div>
<div className="dm-pane-field">
<label>Lighting</label>
<select
                       value={am.Lighting ?? ""}
                       onChange={e => updateAssessmentMeta(pane.index, { Lighting: e.target.value })}
>
<option value=""></option>
                       {LIGHTING_OPTIONS.map(opt => (
<option key={opt} value={opt}>
                           {opt}
</option>
                       ))}
</select>
</div>
<div className="dm-pane-field">
<label>Contrast</label>
<select
                       value={am.Contrast ?? ""}
                       onChange={e => updateAssessmentMeta(pane.index, { Contrast: e.target.value })}
>
<option value=""></option>
                       {CONTRAST_OPTIONS.map(opt => (
<option key={opt} value={opt}>
                           {opt}
</option>
                       ))}
</select>
</div>
</>
               )}
               {/* Bioslit */}
               {isBioslit && (
<>
<div className="dm-pane-field">
<label>Specify</label>
<select
                       value={am.Specify_Bioslit ?? ""}
                       onChange={e => updateAssessmentMeta(pane.index, { Specify_Bioslit: e.target.value })}
>
<option value=""></option>
                       {BIOSLIT_SPECIFY.map(opt => (
<option key={opt} value={opt}>
                           {opt}
</option>
                       ))}
</select>
</div>
<div className="dm-pane-field">
<label>Metadata</label>
<div className="dm-multi-dropdown">
<div
                         className="dm-multi-dropdown-control"
                         onClick={() =>
                           setOpenBioSlitMenuIndex(openBioSlitMenuIndex === pane.index ? null : pane.index)
                         }
>
                         {am.Metadata_Bioslit && am.Metadata_Bioslit.length > 0 && (
<div className="dm-tags-row">
                             {am.Metadata_Bioslit.map(tag => (
<span
                                 key={tag}
                                 className="dm-tag"
                                 onClick={e => {
                                   e.stopPropagation();
                                   const current = am.Metadata_Bioslit || [];
                                   const next = current.filter(x => x !== tag);
                                   updateAssessmentMeta(pane.index, { Metadata_Bioslit: next });
                                 }}
>
                                 {tag}
<span className="dm-tag-x">×</span>
</span>
                             ))}
</div>
                         )}
<div className="dm-select-row">
<span className="dm-select-text">Select</span>
</div>
<span className="dm-caret">▾</span>
</div>
                       {openBioSlitMenuIndex === pane.index && (
<div className="dm-multi-dropdown-menu">
                           {BIOSLIT_METADATA_MULTISELECT.map(opt => {
                             const selected = (am.Metadata_Bioslit || []).includes(opt);
                             return (
<div
                                 key={opt}
                                 className={"dm-multi-dropdown-item" + (selected ? " dm-selected" : "")}
                                 onClick={e => {
                                   e.stopPropagation();
                                   const current = am.Metadata_Bioslit || [];
                                   const exists = current.includes(opt);
                                   const next = exists ? current.filter(x => x !== opt) : [...current, opt];
                                   updateAssessmentMeta(pane.index, { Metadata_Bioslit: next });
                                 }}
>
                                 {opt}
</div>
                             );
                           })}
</div>
                       )}
</div>
</div>
</>
               )}
</>
           )}
           {/* Footer buttons */}
<div className="dm-pane-footer dm-pane-footer-split">
<button
               type="button"
               className="dm-secondary"
               onClick={() => {
                 // ✅ toggle custom assessment mode
                 if (customModeRowIndex === pane.index) {
                   // turning off custom mode
                   setCustomModeRowIndex(null);
                   setCustomAssessmentText("");
                 } else {
                   setCustomModeRowIndex(pane.index);
                   setAssessmentDropdownOpen(false);
                   setOpenBioSlitMenuIndex(null);
                   // preload current row header if user already had something
                   const currentHeader = rows[pane.index]?.RowHeader ?? "";
                   setCustomAssessmentText(currentHeader);
                 }
               }}
>
               Enter Custom Assessment
</button>
<button
               type="button"
               onClick={() => {
                 // ✅ If in custom mode, save custom value into meta + row header
                 if (customModeRowIndex === pane.index) {
                   updateAssessmentMeta(pane.index, {
                     IsCustom: true,
                     CustomAssessment: customAssessmentText
                   });
                   setCustomModeRowIndex(null);
                   setCustomAssessmentText("");
                 }
                 setPane(null);
                 setAssessmentDropdownOpen(false);
               }}
>
               Save & Close
</button>
</div>
</div>
</div>
     );
   }
   return null;
 };
 // Close search dropdown when clicking outside
 React.useEffect(() => {
   const onDocClick = () => setAssessmentDropdownOpen(false);
   if (!assessmentDropdownOpen) return;
   document.addEventListener("click", onDocClick);
   return () => document.removeEventListener("click", onDocClick);
 }, [assessmentDropdownOpen]);
 // -------------------- Main render --------------------
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
<th key={i} className={selectedColIndex === i ? "dm-col-selected" : ""}>
<div className="dm-col-header-wrapper">
<input
                     value={c}
                     readOnly
                     onClick={() => {
                       setPane({ mode: "column", index: i });
                       setCustomModeRowIndex(null);
                     }}
                     className={
                       "dm-input dm-col-header dm-clickable" +
                       (selectedColIndex === i ? " dm-selected-cell" : "")
                     }
                   />
<div className="dm-header-buttons">
<button type="button" className="dm-small" onClick={() => moveColumn(i, i - 1)} title="Move left">
                       ←
</button>
<button type="button" className="dm-small" onClick={() => moveColumn(i, i + 1)} title="Move right">
                       →
</button>
<button type="button" className="dm-danger dm-small" onClick={() => removeColumn(i)} title="Delete column">
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
<tr key={ri} className={selectedRowIndex === ri ? "dm-row-selected" : ""}>
<td className={selectedRowIndex === ri ? "dm-selected-cell" : ""}>
<div className="dm-row-head">
<div
                     className={
                       "dm-row-header-display dm-clickable" + (selectedRowIndex === ri ? " dm-selected-cell" : "")
                     }
                     onClick={() => {
                       setPane({ mode: "row", index: ri });
                       setAssessmentDropdownOpen(false);
                       setAssessmentSearch("");
                       setOpenBioSlitMenuIndex(null);
                     }}
>
                     {r.RowHeader}
</div>
<div className="dm-header-buttons">
<button type="button" className="dm-small" onClick={() => moveRow(ri, ri - 1)} title="Move up">
                       ↑
</button>
<button type="button" className="dm-small" onClick={() => moveRow(ri, ri + 1)} title="Move down">
                       ↓
</button>
<button type="button" className="dm-danger dm-small" onClick={() => removeRow(ri)} title="Delete row">
                       ×
</button>
</div>
</div>
</td>
               {columns.map((_, ci) => (
<td
                   key={ci}
                   className={
                     (selectedRowIndex === ri ? "dm-row-selected" : "") +
                     (selectedColIndex === ci ? " dm-col-selected" : "")
                   }
>
<input
                     value={r.Cells[ci] ?? ""}
                     onChange={e => setCell(ri, ci, e.target.value)}
                     className={
                       "dm-input dm-cell" +
                       (selectedRowIndex === ri || selectedColIndex === ci ? " dm-selected-cell" : "")
                     }
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