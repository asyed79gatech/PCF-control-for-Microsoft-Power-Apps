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
 BioSlitSpecify?: string;
 BioSlitMetadata?: string[];
 HabitualMetadata?: string[];
 RefractionAllThatApply?: string[];
 RefractionMetadata?: string[];
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

//-----------Multi-select Dropdown----
type MultiSelectProps = {
 label: string;
 options: string[];
 selected?: string[];
 onChange: (next: string[]) => void;
};
const MultiSelect: React.FC<MultiSelectProps> = ({
 label,
 options,
 selected = [],
 onChange
}) => {
 const [open, setOpen] = React.useState(false);
 const toggleOption = (opt: string) => {
   const exists = selected.includes(opt);
   const next = exists ? selected.filter(x => x !== opt) : [...selected, opt];
   onChange(next);
 };
 const displayText =
   selected.length === 0 ? "Select..." : selected.join(", ");
 return (
<div className="dm-pane-field">
<label>{label}</label>
<div
       className="dm-multi-dropdown"
       onClick={() => setOpen(o => !o)}
>
<span className={selected.length === 0 ? "dm-multi-placeholder" : ""}>
         {displayText}
</span>
<span className="dm-multi-caret">▾</span>
</div>
     {open && (
<div className="dm-multi-dropdown-menu">
         {options.map(opt => {
           const isSelected = selected.includes(opt);
           return (
<div
               key={opt}
               className={
                 "dm-multi-dropdown-option" +
                 (isSelected ? " dm-multi-dropdown-option--selected" : "")
               }
               onClick={e => {
                 e.stopPropagation();
                 toggleOption(opt);
               }}
>
<input type="checkbox" readOnly checked={isSelected} />
<span>{opt}</span>
</div>
           );
         })}
</div>
     )}
</div>
 );
};

// ---------- CONSTANTS ----------
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
 "Manifest Refraction (MRSE)",
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
 "Randomization",
 "Habitual Lens Usage"
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

// Bio-Slit assessments
const BIO_SLIT_ASSESSMENTS: string[] = [
 "Biomicroscopy",
 "Slit Lamp Examination"
];
const BIO_SLIT_SPECIFY_OPTIONS: string[] = [
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
const BIO_SLIT_METADATA_OPTIONS: string[] = [
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

// Habitual Assessments
const HABITUAL_ASSESSMENTS: string[] = [
  "Habitual Lens Usage"
];

const HABITUAL_METADATA: string[] = [
"brand",
"lens care brand",
"manufacturer",
"modality",
"power",
"wear success"
]

const REFRACTION_ASSESSMENTS: string[] = [
"Manifest Refraction (MRSE)",
"Cycloplegic Refraction",
"Objective Refraction"
]

const REFRACTION_ALL_THAT_APPLY: string [] = [
"Pre-fogging",
"Post-fogging",
"Jackson Cross Cylinder (JCC)",
"Duochrome (Red-Green)",
"Alternate Occlusion",
"with Binocular Balancing (Prism)"
]

const REFRACTION_METADATA: string [] = [
"Sphere",
"Cylinder",
"Axis",
"ADD Power"
]


const hasEyeDropdown = (name?: string): boolean =>
 !!name &&
 (
   ASSESSMENTS_WITH_EYE.includes(name) ||
   VISUAL_ACUITY_ASSESSMENTS.includes(name) ||
   REFRACTION_ASSESSMENTS.includes(name)      
 );
const isVisualAcuityAssessment = (name?: string): boolean =>
 !!name && VISUAL_ACUITY_ASSESSMENTS.includes(name);
const isBioSlitAssessment = (name?: string): boolean =>
 !!name && BIO_SLIT_ASSESSMENTS.includes(name);
const isHabitualAssessment = (name?: string): boolean =>
 !!name && HABITUAL_ASSESSMENTS.includes(name);
const isRefractionAssessment = (name?: string): boolean =>
 !!name && REFRACTION_ASSESSMENTS.includes(name);

const formatAssessmentHeader = (meta: AssessmentMeta): string => {
 if (!meta.AssessmentName) return "";
 const parts: string[] = [];
 // Order: Eye, Correction, Notation, Distance, Lighting, Contrast

 if (meta.Eye) parts.push(meta.Eye);
 if (meta.BioSlitSpecify) parts.push(meta.BioSlitSpecify);
 if(meta.RefractionAllThatApply && meta.RefractionAllThatApply.length) {
  parts.push(meta.RefractionAllThatApply.join(", "))
 }
 if (meta.Correction) parts.push(meta.Correction);
 if (meta.Notation) parts.push(meta.Notation);
 if (meta.Distance) parts.push(meta.Distance);
 if (meta.Lighting) parts.push(meta.Lighting);
 if (meta.Contrast) parts.push(meta.Contrast);
 if (parts.length === 0) {
   return meta.AssessmentName;
 }
 // "AssessmentName Eye, Correction, Notation, Distance, Lighting, Contrast"
 return `${meta.AssessmentName} ${parts.join(", ")}`;
};


// ---------- DEFAULT TABLE & PARSING ----------
const DEFAULT_COLUMNS = ["", ""];
const DEFAULT_ROWS: Row[] = [
 { RowHeader: "", Cells: ["", ""] },
 { RowHeader: "", Cells: ["", ""] }
];
const DEFAULT_TABLE: TablePayload = {
 Columns: DEFAULT_COLUMNS,
 Rows: DEFAULT_ROWS,
 VisitMeta: [],
 AssessmentMeta: [],
 AssessmentNames: []
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
// ---------- COMPONENT ----------
export const Matrix: React.FC<MatrixProps> = ({ initialJson, onChange }) => {
 const [columns, setColumns] = React.useState<string[]>(DEFAULT_TABLE.Columns);
 const [rows, setRows] = React.useState<Row[]>(DEFAULT_TABLE.Rows);
 const [visitMeta, setVisitMeta] = React.useState<VisitMeta[]>([]);
 const [assessmentMeta, setAssessmentMeta] = React.useState<AssessmentMeta[]>([]);
 const [pane, setPane] = React.useState<PaneState>(null);
 // hydrate from incoming JSON whenever it changes
 React.useEffect(() => {
   const parsed = parsePayload(initialJson);
   setColumns(parsed.Columns);
   setRows(parsed.Rows);
   setVisitMeta(parsed.VisitMeta || []);
   setAssessmentMeta(parsed.AssessmentMeta || []);
 }, [initialJson]);
 // push changes outward
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
 // --- basic table operations ---
 const addColumn = () => {
   const newColName = "";
   setColumns(prev => [...prev, newColName]);
   setRows(prev => prev.map(r => ({ ...r, Cells: [...r.Cells, ""] })));
   setVisitMeta(prev => [...prev, {}]);
 };
 const addRow = () => {
   setRows(prev => [...prev, { RowHeader: "", Cells: Array(columns.length).fill("") }]);
   setAssessmentMeta(prev => [...prev, {}]);
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
   setPane(p => (p && p.mode === "column" && p.index === i ? null : p));
 };
 const removeRow = (i: number) => {
   setRows(prev => prev.filter((_, idx) => idx !== i));
   setAssessmentMeta(prev => prev.filter((_, idx) => idx !== i));
   setPane(p => (p && p.mode === "row" && p.index === i ? null : p));
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
   let updated: AssessmentMeta = { ...current, ...patch };
   // If AssessmentName changed, reset dependent fields
   if (patch.AssessmentName !== undefined) {
     updated = {
       AssessmentName: patch.AssessmentName,
       Eye: undefined,
       Correction: undefined,
       Notation: undefined,
       Distance: undefined,
       Lighting: undefined,
       Contrast: undefined,
       BioSlitSpecify: undefined,
       BioSlitMetadata: [],
       HabitualMetadata: [],
       RefractionAllThatApply: [],
       RefractionMetadata: []
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
 // ---------- PANE RENDERING ----------
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
     const showEye = hasEyeDropdown(am.AssessmentName);
     const isVA = isVisualAcuityAssessment(am.AssessmentName);
     const isBioSlit = isBioSlitAssessment(am.AssessmentName);
     const isHabitual = isHabitualAssessment(am.AssessmentName);
     const isRefraction = isRefractionAssessment(am.AssessmentName);
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
               {ASSESSMENT_OPTIONS.map(name => (
<option key={name} value={name}>
                   {name}
</option>
               ))}
</select>
</div>
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

     {isRefraction && (
<>
   {/* (a) Select all that apply - Refraction (multi-select, shows in header) */}
<MultiSelect
 label="Select All that Apply"
 options={REFRACTION_ALL_THAT_APPLY}
 selected={am.RefractionAllThatApply || []}
 onChange={next => updateAssessmentMeta(pane.index, { RefractionAllThatApply: next })}
/>
   {/* (c) Metadata – multi-select stored in JSON only, not shown in header */}
   {/* Metadata (multi-select, checkboxes, NOT in header) */}
<MultiSelect
 label="Metadata"
 options={REFRACTION_METADATA}
 selected={am.RefractionMetadata}
 onChange={next => updateAssessmentMeta(pane.index, { RefractionMetadata: next })}
/>
</>
)}  

     {isBioSlit && (
<>
   {/* Specify (single-select, goes into header) */}
<div className="dm-pane-field">
<label>Specify</label>
<select
       value={am.BioSlitSpecify ?? ""}
       onChange={e => updateAssessmentMeta(pane.index, { BioSlitSpecify: e.target.value })}
>
<option value=""></option>
       {BIO_SLIT_SPECIFY_OPTIONS.map(opt => (
<option key={opt} value={opt}>
           {opt}
</option>
       ))}
</select>
</div>
   {/* Metadata (multi-select, checkboxes, NOT in header) */}
<MultiSelect
 label="Metadata"
 options={BIO_SLIT_METADATA_OPTIONS}
 selected={am.BioSlitMetadata}
 onChange={next => updateAssessmentMeta(pane.index, { BioSlitMetadata: next })}
/>
</>
)}

     {isHabitual && (
<>
   {/* Metadata for Habiutal (multi-select, checkboxes, NOT in header) */}
<MultiSelect
 label="Metadata"
 options={HABITUAL_METADATA}
 selected={am.HabitualMetadata}
 onChange={next => updateAssessmentMeta(pane.index, { HabitualMetadata: next })}
/>
</>
)}    

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
 // ---------- MAIN RENDER ----------
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
                     readOnly
                     onClick={() => setPane({ mode: "column", index: i })}
                     className="dm-input dm-col-header dm-clickable"
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
<div
     className="dm-row-header-display dm-clickable"
     onClick={() => setPane({ mode: "row", index: ri })}
>
     {r.RowHeader}
</div>
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