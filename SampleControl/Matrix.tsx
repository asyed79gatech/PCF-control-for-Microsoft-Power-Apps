import * as React from "react";

type Row = { RowHeader: string; Cells: string[] };

type VisitMeta = {
  VisitNumber?: string;
  VisitName?: string;
  Lens?: string;
  TimepointUnit?: string;
  TimepointValue?: string;
  WindowSign?: string;
  WindowValue?: string;
  WindowUnit?: string;
  CustomWindowText?: string;
  Exit?: boolean;
};

type AssessmentMeta = {
  AssessmentName?: string;
  Eye?: string;
  Correction?: string;
  Notation?: string;
  Distance?: string;
  Lighting?: string;
  Contrast?: string;
  BioSlitSpecify?: string[];
  BioSlitMetadata?: string[];
  HabitualMetadata?: string[];
  RefractionAllThatApply?: string[];
  RefractionMetadata?: string[];
  ROVMethod?: string[];
  ROVRange?: string;
  SubjectiveRatingsSubCat?: string;
  SubjectiveRatingsAllThatApply?: string[];
  SPCMetadata?: string[];
  LensFitSubCat?: string[];
  LensFitAllThatApply?: string[];
  CSMethod?: string;
  CSMethodCustom?: string;
  CSCorrection?: string;
  CSLighting?: string;
  CataractMehod?: string;
  CataractParameters?: string[];
  VFMethod?: string;
  SurgicalReportAllThatApply?: string[];
  SeverityscoreParameter?: string;
  SeverityScoreCustomParameter?: string;
  OCTSegmentOptions?: string;
  AxisTimepointCustom?: string,
  MedicalConcomitantCollectionDetails?: string
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

// -------------------- Multi-select Dropdown --------------------
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
  const displayText = selected.length === 0 ? "Select..." : selected.join(", ");

  return (
    <div className="dm-pane-field">
      <label>{label}</label>
      <div className="dm-multi-dropdown" onClick={() => setOpen(o => !o)}>
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

// -------------------- Searchable Select (Assessment Name) --------------------
type SearchableSelectProps = {
  label: string;
  options: string[];
  value?: string;
  onChange: (next: string) => void;
};

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange
}) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const wrapRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(opt => opt.toLowerCase().includes(q));
  }, [options, query]);

  const displayText = value && value.trim() !== "" ? value : "Select...";

  return (
    <div className="dm-pane-field" ref={wrapRef}>
      <label>{label}</label>

      <div
        className="dm-search-select"
        onClick={() => {
          setOpen(true);
        }}
      >
        <input
          className="dm-search-select-input"
          value={open ? query : displayText}
          placeholder="Type to search..."
          onFocus={() => setOpen(true)}
          onChange={e => {
            setOpen(true);
            setQuery(e.target.value);
          }}
        />
        <span className="dm-search-select-caret">▾</span>
      </div>

      {open && (
        <div className="dm-search-select-menu">
          {filtered.length === 0 ? (
            <div className="dm-search-select-empty">No matches</div>
          ) : (
            filtered.map(opt => (
              <div
                key={opt}
                className={
                  "dm-search-select-option" + (opt === value ? " is-selected" : "")
                }
                onClick={() => {
                  onChange(opt);
                  setQuery("");
                  setOpen(false);
                }}
              >
                {opt}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ---------- CONSTANTS ----------
const ASSESSMENT_OPTIONS: string[] = [
  "Aberrometry",
  "Adverse Event(s)",
  "Anterior Chamber Depth",
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
  "Concomitant Medications",
  "Cycloplegic Refraction",
  "Defocus Curve",
  "Demographics",
  "Depth of Focus",
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
  "Habitual Lens Usage",
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
  "Iris Color",
  "Keratometry",
  "Lens Fit Assessments",
  "Lens Oscillation",
  "Lens Rotational Recovery",
  "Lens Settling Time",
  "Lens Wear Time",
  "Lens Surface Assessments (Wettability, Deposits)",
  "Lissamine Green Circumlimbal Conjunctival Staining",
  "Manifest Refraction (MRSE)",
  "McCarty Symptom Questionnaire",
  "McMonnies Questionnaire",
  "Medical History",
  "Meibomian Gland Functionality Assessment",
  "Misallocation",
  "National Eye Institute Visual Function Questionnaire-25 (NEI-VFQ25)",
  "Noninvasive Keratography Break-Up Time (NIKBUT)",
  "Noninvasive Tear Break-Up Time (NITBUT)",
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
  "Predicted Residual Astigmatism",
  "Pregnancy Test",
  "Pupil Size",
  "Quality of Vision (QoV)",
  "Questionnaire for Visual Disturbances (QUVID)",
  "Real-World Subjective Questions",
  "Randomization",
  "Range of Vision",
  "Reading Speed",
  "Rewetting Drop Usage",
  "Severity Score",
  "Secondary Surgical Interventions",
  "Schein Questionnaire",
  "Scribe Mark Visibility",
  "Slit Lamp Examination",
  "Standard Patient Evaluation of Eye Dryness Questionnaire (SPEED)",
  "Stereopsis Test",
  "Stimulus-Based Subjective Questions",
  "Study Lens Power",
  "Subject Diary",
  "Subjective Likert Questionnaire (5-Point Scale)",
  "Subjective Likert (10-Point Scale)",
  "Subjective Ratings",
  "Subjective Ratings (1-10 Scale)",
  "Surgical Report",
  "Symptom Assessment In Dry Eye (SANDE)",
  "Symptomatology Questionnaire",
  "Symptoms, Problems, and Complaints",
  "Target Residual Refractive Error",
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
  "Vital Signs"
];

const ASSESSMENTS_WITH_EYE: string[] = [
  "Aberrometry",
  "Autorefractometry",
  "Axial Length",
  "Axis Orientation",
  "Biometry",
  "Biomicroscopy",
  "Slit Lamp Examination",
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
  "Iris Color",
  "Keratometry",
  "Lens Oscillation",
  "Lens Rotational Recovery",
  "Lens Settling Time",
  "Lens Surface Assessments (Wettability, Deposits)",
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
  "Uncorrected Visual Acuity (UCVA)",
  "Visual Acuity"
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

const NOTATION_OPTIONS: string[] = ["Snellen", "logMAR", "Decimal", "Letters Read"];

const DISTANCE_OPTIONS: string[] = ["6m", "4m", "2m", "1m", "120cm", "66cm", "60cm", "40cm", "33cm"];

const LIGHTING_OPTIONS: string[] = ["Photopic", "Mesopic", "Scotopic", "Bright Light"];
const CONTRAST_OPTIONS: string[] = ["High Contrast", "Low Contrast"];

const BIO_SLIT_ASSESSMENTS: string[] = ["Biomicroscopy", "Slit Lamp Examination"];
const BIO_SLIT_SPECIFY_OPTIONS: string[] = [
  "(Change in Corneal Signs)",
  "(Corneal Haze)",
  "(Epithelial Defect)",
  "(Epithelial Ingrowth)",
  "(Lens Opacification)",
  "(Retroillumination)",
  "(Targeted)",
  "(Posterior Capsule Opacification)",
  "(Posterior Capsulotomy Evaluation)"
];
const BIO_SLIT_METADATA_OPTIONS: string[] = [
  "Anterior Capsule Phimosis",
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

const HABITUAL_ASSESSMENTS: string[] = ["Habitual Lens Usage"];
const HABITUAL_METADATA: string[] = ["Brand", "Lens Care Brand", "Manufacturer", "Modality", "Power", "Wear Success"];

const REFRACTION_ASSESSMENTS: string[] = ["Manifest Refraction (MRSE)", "Cycloplegic Refraction", "Objective Refraction"];
const REFRACTION_ALL_THAT_APPLY: string[] = [
  "Pre-fogging",
  "Post-fogging",
  "Jackson Cross Cylinder (JCC)",
  "Duochrome (Red-Green)",
  "Alternate Occlusion",
  "with Binocular Balancing (Prism)"
];
const REFRACTION_METADATA: string[] = ["Sphere", "Cylinder", "Axis", "ADD Power"];

const ROV_ASSESSMENTS: string[] = ["Range of Vision", "Defocus Curve", "Depth of Focus"];
const ROV_METHOD_OPTIONS: string[] = ["Pre-fogging", "Post-fogging", "(Negative Defocus Range Only)"];

const SUBJECTIVE_RATINGS_ASSESSMENTS: string[] = [
  "Subjective Likert Questionnaire (5-Point Scale)",
  "Subjective Likert (10-Point Scale)",
  "Subjective Ratings",
  "Subjective Ratings (1-10 Scale)",
  "Visual Analog Scale (VAS)",
  "Subject Diary"
];
const SUBJECTIVE_RATINGS_SUBCAT: string[] = ["Agreement", "Ocular Comfort", "Satisfaction", "Preference"];
const SUBJECTIVE_RATINGS_ALL_THAT_APPLY: string[] = [
  "All Day Confort",
  "Corneal Pain",
  "Ease of Insertion",
  "Ease of Removal",
  "End of Day Comfort",
  "Insertion Comfort",
  "Insertion Handling",
  "Insertion Vision",
  "Overall Comfort",
  "Overall Impression",
  "Overall Preference",
  "Overall Vision",
  "Quality of Vision",
  "Removal Handling",
  "Ghosting"
];

const SPC_ASSESSMENTS: string[] = ["Symptomatology Questionnaire", "Symptoms, Problems, and Complaints"];
const SPC_METADATA_ALL_THAT_APPLY: string[] = [
  "Drop Burning",
  "Drop Stinging",
  "Burning",
  "Halo",
  "Stinging",
  "Itching",
  "Lens Awareness",
  "Dryness",
  "Discomfort",
  "Blurred Vision",
  "Fluctuating/Variable Vision",
  "Lens Needs Cleaning",
  "Redness",
  "Excessive Tearing",
  "Secretions",
  "Photophobia",
  "Other"
];

const LENS_FIT_ASSESSMENTS: string[] = ["Lens Fit Assessments"];
const LENS_FIT_SUBCAT: string[] = ["Primary Gaze", "Peripheral Gazes"];
const LENS_FIT_ALL_THAT_APPLY: string[] = ["Lens movement (overall fit)", "Lens position (centration)"];

const CS_ASSESSMNETS: string[] = ["Contrast Sensitivity"];
const CS_METHOD: string[] = ["Pelli-Robson", "Small Letter", "CSV 1000", "Add Custom", "Large Letter"];
const CS_CORRECTION_OPTIONS: string[] = ["Best Corrected", "Uncorrected", "Corrected"];

const CATARACT_ASSESSMENTS: string[] = ["Cataract Grading"];
const CATARACT_METHOD: string[] = [
  "Lens Opacities Classification System (LOCS)",
  "Wisconsin Grading System (WGS)",
  "Age-Related Eye Disease Study (AREDS)",
  "Simple Pre-Operative Nuclear Classification Score (SPONCS)",
  "Wilmer System",
  "Oxford System",
  "World Health Organization (WHO) Criteria",
  "Objective (Scheimpflug/OCT/SFR)"
];
const CATARACT_PARAMETERS: string[] = [
  "Nuclear Opalescence (NO)",
  "Nuclear Color (NC)",
  "Cortical Catarat (C)",
  "Posterior Subcapsular Cataracts (PSC)",
  "Vacoles"
];

const VF_ASSESSMENTS: string[] = ["Visual Field Test"];
const VF_METHODS: string[] = ["(Humphrey Field Analyzer (HFA))", "(HS Octopus)", "(OCULUS)", "(Topcon)"];

const SURGICAL_REPORT_ASSESSMENTS: string[] = ["Surgical Report"];
const SURGICAL_REPORT_ALL_THAT_APPLY: string[] = [
  "Operating Eye",
  "Implanting Surgeon",
  "Lens Information",
  "Implant Success",
  "Surgical Problems",
  "Other Procedures at Surgery"
];

const SEVERITY_SCORE_ASSESSMENTS: string[] = ["Severity Score"];
const SEVERITY_SCORE_PARAMETER: string[] = ["Halo", "Starbursts", "Glare", "Add Custom"];

const MEDICAL_CONCOMITANT_ASSESSMENTS: string[] = ["Medical History", "Concomitant Medications"]
const MEDICAL_CONCOMITANT_COLLECTION_OPTIONS: string[] = ["Source Only", "Targeted CRF: All ocular and targeted systemic", "Full data in source CRF"]

const OCT_ASSESSMENTS: string[] = ["Optical Coherence Tomography (OCT)"];
const OCT_SEGMENT_OPTIONS: string[] = ["Posterior", "Anterior"]

const VISIT_NAME_OPTIONS: string[] = [
  "Baseline",
  "Baseline/Dispense",
  "Baseline/Exposure",
  "Dispense",
  "Early Exit Visit",
  "Exposure",
  "Follow-Up",
  "Follow-Up Lens #/Dispense Lens #",
  "Follow-Up with Test",
  "Pre-Operative",
  "Operative",
  "Post-Operative",
  "Screen/Baseline",
  "Screen/Baseline/Dispense",
  "Screen/Baseline/Dispense",
  "Screen/Baseline/Exposure",
  "Screen/Baseline/Fitting",
  "Screen/Baseline/In-Chair Comparison",
  "Screen/Exposure",
  "Screen/Trial Lens Fitting & Evaluation",
  "Screening",
  "Unscheduled Visit"
];

const AXIS_OR_ASSESSMENTS: string[] = ["Axis Orientation"]

const LENS_OPTIONS: string[] = ["Lens 1", "Lens 2", "Lens 3", "Lens 4", "Lens 5", "1st Eye", "2nd Eye", "Both Eyes"];
const TIMEPOINT_UNIT_OPTIONS: string[] = ["Hour", "Day", "Week", "Month"];

const TIMEPOINT_VALUE_OPTIONS: string[] = [];
for (let i = -1; i <= 100; i++) TIMEPOINT_VALUE_OPTIONS.push(i.toString());

const WINDOW_SIGN_OPTIONS: string[] = ["(+)", "(-)", "(+/-)"];
const WINDOW_VALUE_OPTIONS: string[] = TIMEPOINT_VALUE_OPTIONS.slice();
const WINDOW_UNIT_OPTIONS: string[] = ["Minute(s)", "Hour(s)", "Day(s)", "Week(s)", "Month(s)"];

// ---------- Predicates ----------
const hasEyeDropdown = (name?: string): boolean =>
  !!name &&
  (ASSESSMENTS_WITH_EYE.includes(name) ||
    VISUAL_ACUITY_ASSESSMENTS.includes(name) ||
    REFRACTION_ASSESSMENTS.includes(name) ||
    ROV_ASSESSMENTS.includes(name) ||
    SUBJECTIVE_RATINGS_ASSESSMENTS.includes(name) ||
    SPC_ASSESSMENTS.includes(name) ||
    CS_ASSESSMNETS.includes(name) ||
    CATARACT_ASSESSMENTS.includes(name) ||
    VF_ASSESSMENTS.includes(name) ||
    SURGICAL_REPORT_ASSESSMENTS.includes(name) ||
    OCT_ASSESSMENTS.includes(name) ||
    AXIS_OR_ASSESSMENTS.includes(name)
  );

const isVisualAcuityAssessment = (name?: string): boolean => !!name && VISUAL_ACUITY_ASSESSMENTS.includes(name);
const isBioSlitAssessment = (name?: string): boolean => !!name && BIO_SLIT_ASSESSMENTS.includes(name);
const isHabitualAssessment = (name?: string): boolean => !!name && HABITUAL_ASSESSMENTS.includes(name);
const isRefractionAssessment = (name?: string): boolean => !!name && REFRACTION_ASSESSMENTS.includes(name);
const isROVAssessment = (name?: string): boolean => !!name && ROV_ASSESSMENTS.includes(name);
const isSubjectiveAssessment = (name?: string): boolean => !!name && SUBJECTIVE_RATINGS_ASSESSMENTS.includes(name);
const isSPCAssessment = (name?: string): boolean => !!name && SPC_ASSESSMENTS.includes(name);
const isLensFitAssessment = (name?: string): boolean => !!name && LENS_FIT_ASSESSMENTS.includes(name);
const isCSAssessment = (name?: string): boolean => !!name && CS_ASSESSMNETS.includes(name);
const isCataractAssessment = (name?: string): boolean => !!name && CATARACT_ASSESSMENTS.includes(name);
const isVFAssessment = (name?: string): boolean => !!name && VF_ASSESSMENTS.includes(name);
const isSurgicalReportAssessment = (name?: string): boolean => !!name && SURGICAL_REPORT_ASSESSMENTS.includes(name);
const isSeverityScoreAssessment = (name?: string): boolean => !!name && SEVERITY_SCORE_ASSESSMENTS.includes(name);
const isOCTAssessment = (name?: string): boolean => !!name && OCT_ASSESSMENTS.includes(name);
const isAxisORAssessment = (name?: string): boolean => !!name && AXIS_OR_ASSESSMENTS.includes(name);
const isMedicalConcomitantAssessment = (name?: string): boolean => !!name && MEDICAL_CONCOMITANT_ASSESSMENTS.includes(name)


// ---------- Header formatters ----------
const formatAssessmentHeader = (meta: AssessmentMeta): string => {
  if (!meta.AssessmentName) return "";
  const parts: string[] = [];

  if (meta.SurgicalReportAllThatApply && meta.SurgicalReportAllThatApply.length) parts.push(meta.SurgicalReportAllThatApply.join(", "));
  if (meta.VFMethod) parts.push(meta.VFMethod);
  if (meta.CataractMehod) parts.push(meta.CataractMehod);
  if (meta.CataractParameters && meta.CataractParameters.length) parts.push(meta.CataractParameters.join(", "));
  if (meta.SubjectiveRatingsSubCat) parts.push(meta.SubjectiveRatingsSubCat);
  if (meta.SubjectiveRatingsAllThatApply && meta.SubjectiveRatingsAllThatApply.length) parts.push(meta.SubjectiveRatingsAllThatApply.join(", "));
  if (meta.Eye) parts.push(meta.Eye);
  if (meta.BioSlitSpecify && meta.BioSlitSpecify.length) parts.push(meta.BioSlitSpecify.join(", "));
  if (meta.RefractionAllThatApply && meta.RefractionAllThatApply.length) parts.push(meta.RefractionAllThatApply.join(", "));
  if (meta.ROVMethod && meta.ROVMethod.length) parts.push(meta.ROVMethod.join(", "));
  if (meta.ROVRange) parts.push(meta.ROVRange);

  if (meta.CSMethod === "Add Custom" && meta.CSMethodCustom) parts.push(meta.CSMethodCustom);
  else if (meta.CSMethod) parts.push(meta.CSMethod);

  if (meta.SeverityscoreParameter === "Add Custom" && meta.SeverityScoreCustomParameter) parts.push(meta.SeverityScoreCustomParameter);
  else if (meta.SeverityscoreParameter) parts.push(meta.SeverityscoreParameter);

  if (meta.Correction) parts.push(meta.Correction);
  if (meta.Notation) parts.push(meta.Notation);
  if (meta.Distance) parts.push(meta.Distance);
  if (meta.Lighting) parts.push(meta.Lighting);
  if (meta.Contrast) parts.push(meta.Contrast);

  if (meta.LensFitSubCat && meta.LensFitSubCat.length) parts.push(meta.LensFitSubCat.join(", "));
  if (meta.LensFitAllThatApply && meta.LensFitAllThatApply.length) parts.push(meta.LensFitAllThatApply.join(", "));
  if (meta.OCTSegmentOptions) parts.push(meta.OCTSegmentOptions);
  if(meta.AxisTimepointCustom) parts.push(meta.AxisTimepointCustom)
  if(meta.MedicalConcomitantCollectionDetails) parts.push(meta.MedicalConcomitantCollectionDetails)

  return parts.length === 0 ? meta.AssessmentName : `${meta.AssessmentName} ${parts.join(", ")}`;
};

const formatVisitHeader = (meta: VisitMeta): string => {
  const lines: string[] = [];
  if (meta.VisitNumber) lines.push(meta.VisitNumber);
  if (meta.VisitName) lines.push(meta.VisitName);
  if (meta.Lens) lines.push(`${meta.Lens}`);
  if (meta.TimepointUnit && meta.TimepointValue) lines.push(`${meta.TimepointUnit} ${meta.TimepointValue}`);
  if (meta.WindowSign && meta.WindowValue && meta.WindowUnit) lines.push(`${meta.WindowSign} ${meta.WindowValue} ${meta.WindowUnit}`);
  if (meta.CustomWindowText && meta.CustomWindowText.trim()) {
    lines.push(meta.CustomWindowText.trim());
  }
  const exitSuffix = meta.Exit ? "/Exit" : "";
  lines.push(exitSuffix);

  return lines.join("\n");
};

// ---------- DEFAULT TABLE & PARSING ----------
const DEFAULT_COLUMNS = ["", ""];

// Requirement #6 defaults (first time only)
const DEFAULT_ASSESSMENT_SEED: string[] = [
  "Adverse Event(s)",
  "Demographics",
  "Inclusion / Exclusion Criteria",
  "Informed Consent",
  "Medical History",
  "Concomitant Medications"
];

const makeBlankAssessmentMeta = (name?: string): AssessmentMeta => ({
  AssessmentName: name,
  Eye: undefined,
  Correction: undefined,
  Notation: undefined,
  Distance: undefined,
  Lighting: undefined,
  Contrast: undefined,
  BioSlitSpecify: [],
  BioSlitMetadata: [],
  HabitualMetadata: [],
  RefractionAllThatApply: [],
  RefractionMetadata: [],
  ROVMethod: [],
  ROVRange: undefined,
  SubjectiveRatingsSubCat: undefined,
  SubjectiveRatingsAllThatApply: [],
  SPCMetadata: [],
  LensFitSubCat: undefined,
  LensFitAllThatApply: [],
  CSMethod: undefined,
  CSMethodCustom: undefined,
  CataractMehod: undefined,
  CataractParameters: [],
  VFMethod: undefined,
  SurgicalReportAllThatApply: [],
  SeverityScoreCustomParameter: undefined,
  SeverityscoreParameter: undefined,
  OCTSegmentOptions: undefined,
  AxisTimepointCustom: undefined,
  MedicalConcomitantCollectionDetails: undefined
});

const makeSeededDefaultTable = (): TablePayload => {
  const cols = [...DEFAULT_COLUMNS];
  const visitMeta: VisitMeta[] = cols.map(() => ({}));
  const assessmentMeta: AssessmentMeta[] = DEFAULT_ASSESSMENT_SEED.map(n => makeBlankAssessmentMeta(n));

  const rows: Row[] = DEFAULT_ASSESSMENT_SEED.map((n) => ({
    RowHeader: formatAssessmentHeader({ AssessmentName: n }),
    Cells: Array(cols.length).fill("")
  }));

  return {
    Columns: cols,
    Rows: rows,
    VisitMeta: visitMeta,
    AssessmentMeta: assessmentMeta,
    AssessmentNames: DEFAULT_ASSESSMENT_SEED.slice()
  };
};

function normalizePayload(obj: Partial<TablePayload>): TablePayload {
  const cols = Array.isArray(obj.Columns) && obj.Columns.length > 0 ? obj.Columns : DEFAULT_COLUMNS;

  const rows: Row[] =
    Array.isArray(obj.Rows) && obj.Rows.length > 0
      ? obj.Rows.map(r => ({
          RowHeader: r.RowHeader ?? "",
          Cells: Array.isArray(r.Cells) ? r.Cells : Array(cols.length).fill("")
        }))
      : makeSeededDefaultTable().Rows;

  const normRows = rows.map(r => ({
    RowHeader: r.RowHeader ?? "",
    Cells: (r.Cells || []).slice(0, cols.length).concat(
      Array(Math.max(cols.length - (r.Cells ? r.Cells.length : 0), 0)).fill("")
    )
  }));

  const visitMetaRaw = Array.isArray(obj.VisitMeta) ? obj.VisitMeta : [];
  const visitMeta = [...visitMetaRaw];
  while (visitMeta.length < cols.length) visitMeta.push({});
  if (visitMeta.length > cols.length) visitMeta.length = cols.length;

  const assessmentMetaRaw = Array.isArray(obj.AssessmentMeta) ? obj.AssessmentMeta : [];
  const assessmentMeta = [...assessmentMetaRaw];
  while (assessmentMeta.length < normRows.length) assessmentMeta.push({});
  if (assessmentMeta.length > normRows.length) assessmentMeta.length = normRows.length;

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
  // First-time / empty → seeded table
  if (!raw || raw.trim() === "") return makeSeededDefaultTable();

  try {
    const obj = JSON.parse(raw) as Partial<TablePayload>;
    if (!obj || typeof obj !== "object") return makeSeededDefaultTable();
    return normalizePayload(obj);
  } catch {
    return makeSeededDefaultTable();
  }
}

type PaneState =
  | { mode: "column"; index: number }
  | { mode: "row"; index: number }
  | null;

// ---------- COMPONENT ----------
export const Matrix: React.FC<MatrixProps> = ({ initialJson, onChange }) => {
  const [columns, setColumns] = React.useState<string[]>(DEFAULT_COLUMNS);
  const [rows, setRows] = React.useState<Row[]>([]);
  const [visitMeta, setVisitMeta] = React.useState<VisitMeta[]>([]);
  const [assessmentMeta, setAssessmentMeta] = React.useState<AssessmentMeta[]>([]);
  const [pane, setPane] = React.useState<PaneState>(null);

  // enhancement #3 - custom assessment entry mode (for row pane)
  const [customRowMode, setCustomRowMode] = React.useState(false);
  const [customRowText, setCustomRowText] = React.useState("");

  // hydrate from incoming JSON whenever it changes
  React.useEffect(() => {
    const parsed = parsePayload(initialJson);

    setColumns(parsed.Columns);
    setRows(parsed.Rows);
    setVisitMeta(parsed.VisitMeta || []);
    setAssessmentMeta(parsed.AssessmentMeta || []);

    // reset custom mode on load
    setCustomRowMode(false);
    setCustomRowText("");
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

    // keep highlight index aligned if pane is on a column
    setPane(p => {
      if (!p || p.mode !== "column") return p;
      if (p.index === from) return { mode: "column", index: to };
      return p;
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

    // keep highlight index aligned if pane is on a row
    setPane(p => {
      if (!p || p.mode !== "row") return p;
      if (p.index === from) return { mode: "row", index: to };
      return p;
    });
  };

  const updateVisitMeta = (index: number, patch: Partial<VisitMeta>) => {
    setVisitMeta(prev => {
      const arr = [...prev];
      const current = arr[index] || {};
      const updated: VisitMeta = { ...current, ...patch };
      arr[index] = updated;

      const headerText = formatVisitHeader(updated);
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
        updated = makeBlankAssessmentMeta(patch.AssessmentName);
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
              <h3>Visit Details</h3>
              <button
                type="button"
                className="dm-pane-close"
                onClick={() => setPane(null)}
              >
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
                {Array.from({ length: 22 }, (_, k) => k - 1)
                  .filter(x => x >= 0)
                  .map(n => (
                    <option key={n} value={n === 0 ? "Visit 0" : `Visit ${n}`}>
                      {n === 0 ? "Visit 0" : `Visit ${n}`}
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
                {VISIT_NAME_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="dm-pane-field">
              <label>Lens/Eye</label>
              <select
                value={vm.Lens ?? ""}
                onChange={e => updateVisitMeta(pane.index, { Lens: e.target.value })}
              >
                <option value=""></option>
                {LENS_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="dm-pane-field">
              <label>Timepoint</label>
              <div className="dm-inline-group">
                <select
                  value={vm.TimepointUnit ?? ""}
                  onChange={e => updateVisitMeta(pane.index, { TimepointUnit: e.target.value })}
                >
                  <option value=""></option>
                  {TIMEPOINT_UNIT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <select
                  value={vm.TimepointValue ?? ""}
                  onChange={e => updateVisitMeta(pane.index, { TimepointValue: e.target.value })}
                >
                  <option value=""></option>
                  {TIMEPOINT_VALUE_OPTIONS.map(v => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="dm-pane-field">
              <label>Window</label>
              <div className="dm-inline-group">
                <select
                  value={vm.WindowSign ?? ""}
                  onChange={e => updateVisitMeta(pane.index, { WindowSign: e.target.value })}
                >
                  <option value=""></option>
                  {WINDOW_SIGN_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <select
                  value={vm.WindowValue ?? ""}
                  onChange={e => updateVisitMeta(pane.index, { WindowValue: e.target.value })}
                >
                  <option value=""></option>
                  {WINDOW_VALUE_OPTIONS.map(v => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <select
                  value={vm.WindowUnit ?? ""}
                  onChange={e => updateVisitMeta(pane.index, { WindowUnit: e.target.value })}
                >
                  <option value=""></option>
                  {WINDOW_UNIT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              
                {/* ✅ custom window input now on its own line, under the dropdowns */}
                <input
                  type="text"
                  className="dm-input"
                  placeholder="Add Custom Window"
                  value={vm.CustomWindowText ?? ""}
                  onChange={e =>
                    updateVisitMeta(pane.index, { CustomWindowText: e.target.value })
                  }
                  style={{ marginTop: 6 }}
                />

            </div>
            

            <div className="dm-pane-field">
              <label>Exit?</label>
              <label className="dm-toggle">
                <input
                  type="checkbox"
                  checked={!!vm.Exit}
                  onChange={e => updateVisitMeta(pane.index, { Exit: e.target.checked })}
                />
                <span className="dm-toggle-slider" />
              </label>
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

    // ROW PANE
    if (pane.mode === "row") {
      const am = assessmentMeta[pane.index] || {};

      const showEye = hasEyeDropdown(am.AssessmentName);
      const isVA = isVisualAcuityAssessment(am.AssessmentName);
      const isBioSlit = isBioSlitAssessment(am.AssessmentName);
      const isHabitual = isHabitualAssessment(am.AssessmentName);
      const isRefraction = isRefractionAssessment(am.AssessmentName);
      const isROV = isROVAssessment(am.AssessmentName);
      const isSubjective = isSubjectiveAssessment(am.AssessmentName);
      const isSPC = isSPCAssessment(am.AssessmentName);
      const isLensFit = isLensFitAssessment(am.AssessmentName);
      const isCS = isCSAssessment(am.AssessmentName);
      const isCataract = isCataractAssessment(am.AssessmentName);
      const isVF = isVFAssessment(am.AssessmentName);
      const isSurgicalReport = isSurgicalReportAssessment(am.AssessmentName);
      const isSeverityScore = isSeverityScoreAssessment(am.AssessmentName);
      const isOCT = isOCTAssessment(am.AssessmentName);
      const isAxisOR = isAxisORAssessment(am.AssessmentName);
      const isMediCon = isMedicalConcomitantAssessment(am.AssessmentName)

      return (
        <div className="dm-pane">
          <div className="dm-pane-content">
            <div className="dm-pane-header">
              <h3>Assessment Details</h3>
              <button type="button" className="dm-pane-close" onClick={() => setPane(null)}>
                ×
              </button>
            </div>

            {/*Custom Assessment mode */}
            {customRowMode ? (
              <div className="dm-pane-field">
                <label>Custom Assessment Name</label>
                <input
                  type="text"
                  className="dm-input"
                  placeholder="Type your custom assessment..."
                  value={customRowText}
                  onChange={e => setCustomRowText(e.target.value)}
                />
                <div className="dm-custom-hint">
                  This will overwrite the Assessment Name for this row.
                </div>
              </div>
            ) : (
              <>
                {/* Searchable Assessment Name */}
                <SearchableSelect
                  label="Assessment Name"
                  options={ASSESSMENT_OPTIONS}
                  value={am.AssessmentName ?? ""}
                  onChange={(next) => updateAssessmentMeta(pane.index, { AssessmentName: next })}
                />

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
                    <MultiSelect
                      label="Select All that Apply"
                      options={REFRACTION_ALL_THAT_APPLY}
                      selected={am.RefractionAllThatApply || []}
                      onChange={next => updateAssessmentMeta(pane.index, { RefractionAllThatApply: next })}
                    />
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
                    <MultiSelect
                      label="Specify"
                      options={BIO_SLIT_SPECIFY_OPTIONS}
                      selected={am.BioSlitSpecify}
                      onChange={next => updateAssessmentMeta(pane.index, { BioSlitSpecify: next })}
                    />

                    <MultiSelect
                      label="Metadata"
                      options={BIO_SLIT_METADATA_OPTIONS}
                      selected={am.BioSlitMetadata}
                      onChange={next => updateAssessmentMeta(pane.index, { BioSlitMetadata: next })}
                    />
                  </>
                )}

                {isHabitual && (
                  <MultiSelect
                    label="Metadata"
                    options={HABITUAL_METADATA}
                    selected={am.HabitualMetadata}
                    onChange={next => updateAssessmentMeta(pane.index, { HabitualMetadata: next })}
                  />
                )}

                {isROV && (
                  <>
                    <MultiSelect
                      label="Method – Select all that apply"
                      options={ROV_METHOD_OPTIONS}
                      selected={am.ROVMethod || []}
                      onChange={next => updateAssessmentMeta(pane.index, { ROVMethod: next })}
                    />

                    <div className="dm-pane-field">
                      <label>Enter Range</label>
                      <input
                        type="text"
                        className="dm-input"
                        placeholder="Ex: -5.00 to +0.25 DS"
                        value={am.ROVRange ?? ""}
                        onChange={e => updateAssessmentMeta(pane.index, { ROVRange: e.target.value })}
                      />
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
                  </>
                )}

                {isSubjective && (
                  <>
                    <div className="dm-pane-field">
                      <label>Sub Category</label>
                      <select
                        value={am.SubjectiveRatingsSubCat ?? ""}
                        onChange={e => updateAssessmentMeta(pane.index, { SubjectiveRatingsSubCat: e.target.value })}
                      >
                        <option value=""></option>
                        {SUBJECTIVE_RATINGS_SUBCAT.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <MultiSelect
                      label="Select all that apply"
                      options={SUBJECTIVE_RATINGS_ALL_THAT_APPLY}
                      selected={am.SubjectiveRatingsAllThatApply || []}
                      onChange={next => updateAssessmentMeta(pane.index, { SubjectiveRatingsAllThatApply: next })}
                    />
                  </>
                )}

                {isSPC && (
                  <MultiSelect
                    label="Metadata"
                    options={SPC_METADATA_ALL_THAT_APPLY}
                    selected={am.SPCMetadata}
                    onChange={next => updateAssessmentMeta(pane.index, { SPCMetadata: next })}
                  />
                )}

                {isLensFit && (
                  <>
                  <MultiSelect
                    label="Gaze"
                    options={LENS_FIT_SUBCAT}
                    selected={am.LensFitSubCat || []}
                    onChange={next => updateAssessmentMeta(pane.index, { LensFitSubCat: next })}
                  />

                  <MultiSelect
                    label="Select all that apply"
                    options={LENS_FIT_ALL_THAT_APPLY}
                    selected={am.LensFitAllThatApply || []}
                    onChange={next => updateAssessmentMeta(pane.index, { LensFitAllThatApply: next })}
                  />
                  </>
                )}

                {isCS && (
                  <>
                    <div className="dm-pane-field">
                      <label>Method</label>
                      <select
                        value={am.CSMethod ?? ""}
                        onChange={e => {
                          const value = e.target.value;
                          if (value !== "Add Custom") {
                            updateAssessmentMeta(pane.index, { CSMethod: value, CSMethodCustom: undefined });
                          } else {
                            updateAssessmentMeta(pane.index, { CSMethod: value });
                          }
                        }}
                      >
                        <option value=""></option>
                        {CS_METHOD.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {am.CSMethod === "Add Custom" && (
                      <div className="dm-pane-field">
                        <label>Add Custom</label>
                        <input
                          type="text"
                          className="dm-input"
                          placeholder="Enter custom method"
                          value={am.CSMethodCustom ?? ""}
                          onChange={e => updateAssessmentMeta(pane.index, { CSMethodCustom: e.target.value })}
                        />
                      </div>
                    )}

                    <div className="dm-pane-field">
                      <label>Correction</label>
                      <select
                        value={am.Correction ?? ""}
                        onChange={e => updateAssessmentMeta(pane.index, { Correction: e.target.value })}
                      >
                        <option value=""></option>
                        {CS_CORRECTION_OPTIONS.map(opt => (
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
                  </>
                )}

                {isCataract && (
                  <>
                    <div className="dm-pane-field">
                      <label>Method</label>
                      <select
                        value={am.CataractMehod ?? ""}
                        onChange={e => updateAssessmentMeta(pane.index, { CataractMehod: e.target.value })}
                      >
                        <option value=""></option>
                        {CATARACT_METHOD.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <MultiSelect
                      label="Parameters (All that Apply)"
                      options={CATARACT_PARAMETERS}
                      selected={am.CataractParameters || []}
                      onChange={next => updateAssessmentMeta(pane.index, { CataractParameters: next })}
                    />
                  </>
                )}

                {isVF && (
                  <div className="dm-pane-field">
                    <label>Method</label>
                    <select
                      value={am.VFMethod ?? ""}
                      onChange={e => updateAssessmentMeta(pane.index, { VFMethod: e.target.value })}
                    >
                      <option value=""></option>
                      {VF_METHODS.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {isOCT && (
                  <div className="dm-pane-field">
                    <label>Segment</label>
                    <select
                      value={am.OCTSegmentOptions ?? ""}
                      onChange={e => updateAssessmentMeta(pane.index, { OCTSegmentOptions: e.target.value })}
                    >
                      <option value=""></option>
                      {OCT_SEGMENT_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {isSurgicalReport && (
                  <MultiSelect
                    label="Select All that Apply"
                    options={SURGICAL_REPORT_ALL_THAT_APPLY}
                    selected={am.SurgicalReportAllThatApply || []}
                    onChange={next => updateAssessmentMeta(pane.index, { SurgicalReportAllThatApply: next })}
                  />
                )}

                {isSeverityScore && (
                  <>
                    <div className="dm-pane-field">
                      <label>Parameter</label>
                      <select
                        value={am.SeverityscoreParameter ?? ""}
                        onChange={e => {
                          const value = e.target.value;
                          if (value !== "Add Custom") {
                            updateAssessmentMeta(pane.index, {
                              SeverityscoreParameter: value,
                              SeverityScoreCustomParameter: undefined
                            });
                          } else {
                            updateAssessmentMeta(pane.index, { SeverityscoreParameter: value });
                          }
                        }}
                      >
                        <option value=""></option>
                        {SEVERITY_SCORE_PARAMETER.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {am.SeverityscoreParameter === "Add Custom" && (
                      <div className="dm-pane-field">
                        <label>Add Custom</label>
                        <input
                          type="text"
                          className="dm-input"
                          placeholder="Enter Custom Parameter"
                          value={am.SeverityScoreCustomParameter ?? ""}
                          onChange={e => updateAssessmentMeta(pane.index, { SeverityScoreCustomParameter: e.target.value })}
                        />
                      </div>
                    )}
                  </>
                )}

                {isAxisOR && (
                    <div className="dm-pane-field">
                      <label>Timepoint</label>
                      <input
                        type ="text"
                        className="dm-imput"
                        placeholder="Enter Timepoint (Custom)"
                        value = {am.AxisTimepointCustom ?? ""}
                        onChange={e =>
                          updateAssessmentMeta(pane.index, {AxisTimepointCustom: e.target.value})
                        }
                      />
                    </div>
                )}

                {isMediCon && (
                  <div className="dm-pane-field">
                    <label>Collection Details</label>
                    <select
                      value={am.MedicalConcomitantCollectionDetails ?? ""}
                      onChange={e => updateAssessmentMeta(pane.index, { MedicalConcomitantCollectionDetails: e.target.value })}
                    >
                      <option value=""></option>
                      {MEDICAL_CONCOMITANT_COLLECTION_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              </>
            )}

            {/* add button next to Save & Close */}
            <div className="dm-pane-footer dm-pane-footer--split">
              <button
                type="button"
                className="dm-secondary"
                onClick={() => {
                  // toggle custom mode
                  if (!customRowMode) {
                    setCustomRowMode(true);
                    setCustomRowText(rows[pane.index]?.RowHeader || "");
                  } else {
                    // already custom mode -> apply custom text now
                    setCustomRowMode(false);
                    setCustomRowText("");
                  }
                }}
              >
                {customRowMode ? "Add Standard Assessment" : "Enter Custom Assessment"}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (customRowMode) {
                    // Save & Clsoe from custom mode should still apply the custom text
                    const text = (customRowText || "").trim();
                    updateAssessmentMeta(pane.index, { AssessmentName: text });
                    setCustomRowMode(false);
                    setCustomRowText("");
                  }
                  setPane(null);
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

  // ---------- MAIN RENDER ----------
  // Enhancement #1 - highlight selected row/column
  const selectedRowIndex = pane?.mode === "row" ? pane.index : null;
  const selectedColIndex = pane?.mode === "column" ? pane.index : null;

  return (
    <div className="dm-container">
      <div className="dm-toolbar">
        <button type="button" onClick={addRow}>
          + Add Assessment
        </button>
        <button type="button" onClick={addColumn}>
          + Add Visit
        </button>
      </div>

      <div className="dm-table-wrapper">
        <table className="dm-table" cellPadding={4} cellSpacing={0}>
          <thead>
            <tr>
              <th style={{ minWidth: 180 }}>Procedure/Assessment</th>
              {columns.map((c, i) => (
                <th key={i} className={selectedColIndex === i ? "dm-th-selected" : ""}>
                  <div className="dm-col-header-wrapper">
                    <button
                      type="button"
                      className={
                        "dm-col-header-display dm-clickable" +
                        (selectedColIndex === i ? " dm-selected" : "")
                      }
                      onClick={() => {
                        setPane({ mode: "column", index: i });
                        setCustomRowMode(false);
                        setCustomRowText("");
                      }}
                    >
                      {c}
                    </button>

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
              <tr key={ri} className={selectedRowIndex === ri ? "dm-tr-selected" : ""}>
                <td className={selectedRowIndex === ri ? "dm-td-selected" : ""}>
                  <div className="dm-row-head">
                    <div
                      className={
                        "dm-row-header-display dm-clickable" +
                        (selectedRowIndex === ri ? " dm-selected" : "")
                      }
                      onClick={() => {
                        setPane({ mode: "row", index: ri });
                        setCustomRowMode(false);
                        setCustomRowText("");
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
                      (selectedRowIndex === ri ? "dm-td-row-selected " : "") +
                      (selectedColIndex === ci ? "dm-td-col-selected " : "")
                    }
                  >
                    <input
                      value={r.Cells[ci] ?? ""}
                      onChange={e => setCell(ri, ci, e.target.value)}
                      className={
                        "dm-input dm-cell" +
                        (selectedColIndex === ci ? " dm-cell-selected" : "")
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