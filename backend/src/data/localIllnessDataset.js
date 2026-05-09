export const datasetMetadata = {
  name: "Symptom2Disease clinical symptom reference",
  source: "Kaggle Symptom2Disease public dataset",
  sourceUrl: "https://www.kaggle.com/datasets/niyarrbarman/symptom2disease",
  license: "CC0: Public Domain",
  records: 24,
  intendedUse:
    "Educational triage support and demo prediction fallback. Not a clinical diagnosis engine.",
  privacy:
    "Contains disease-symptom associations only; no patient identifiers or protected health information."
};

export const localIllnessDataset = [
  {
    id: "common-cold",
    illness: "Common Cold",
    category: "Respiratory",
    symptoms: ["cough", "runny nose", "sneezing", "sore throat", "congestion", "mild fever"],
    aliases: ["cold", "upper respiratory infection", "uri"],
    riskLevel: "Low",
    response:
      "Your symptoms match public symptom-disease records for a common cold pattern. Rest, fluids, and monitoring are usually appropriate, but get medical advice if symptoms worsen or breathing changes.",
    nextSteps: [
      "Track fever, cough, and breathing comfort.",
      "Use fluids and rest while symptoms are mild.",
      "Seek care for chest pain, shortness of breath, or persistent high fever."
    ]
  },
  {
    id: "pneumonia",
    illness: "Pneumonia",
    category: "Respiratory",
    symptoms: ["fever", "cough", "chills", "chest pain", "shortness of breath", "fatigue"],
    aliases: ["lung infection", "breathing discomfort"],
    riskLevel: "High",
    response:
      "The symptom pattern overlaps with pneumonia records. Pneumonia can become serious, especially with chest pain, breathing difficulty, high fever, or low oxygen symptoms.",
    nextSteps: [
      "Arrange prompt medical review.",
      "Seek urgent care for breathing difficulty, bluish lips, confusion, or severe chest pain.",
      "Do not delay care if symptoms are worsening."
    ]
  },
  {
    id: "bronchial-asthma",
    illness: "Bronchial Asthma",
    category: "Respiratory",
    symptoms: ["wheezing", "shortness of breath", "cough", "chest tightness", "breathing difficulty"],
    aliases: ["asthma", "asthma attack"],
    riskLevel: "High",
    response:
      "Your symptoms match asthma-like records, especially wheezing, cough, chest tightness, and breathing difficulty. Severe or worsening breathing symptoms need urgent care.",
    nextSteps: [
      "Use prescribed rescue medication if available.",
      "Avoid smoke, dust, cold air, or known triggers.",
      "Seek emergency care if speech, walking, or breathing becomes difficult."
    ]
  },
  {
    id: "migraine",
    illness: "Migraine",
    category: "Neurology",
    symptoms: ["headache", "nausea", "vomiting", "light sensitivity", "sound sensitivity", "dizziness"],
    aliases: ["severe headache"],
    riskLevel: "Medium",
    response:
      "The symptom pattern matches migraine records when headache appears with nausea, dizziness, or light sensitivity. Sudden or unusually severe headache should be treated as urgent.",
    nextSteps: [
      "Rest in a quiet room.",
      "Track pain severity and duration.",
      "Seek urgent care for sudden severe headache, weakness, confusion, or vision loss."
    ]
  },
  {
    id: "gastroesophageal-reflux-disease",
    illness: "Gastroesophageal Reflux Disease",
    category: "Digestive",
    symptoms: ["heartburn", "acid reflux", "chest burning", "sour taste", "burping", "nausea"],
    aliases: ["gerd", "reflux", "acidity"],
    riskLevel: "Low",
    response:
      "Your symptoms match reflux-like records, especially heartburn, acid taste, burping, or chest burning after meals. Chest pain should still be evaluated carefully.",
    nextSteps: [
      "Avoid heavy meals, late meals, alcohol, and trigger foods.",
      "Seek care if swallowing is difficult, weight loss occurs, or symptoms persist.",
      "Treat severe chest pain as urgent."
    ]
  },
  {
    id: "peptic-ulcer-disease",
    illness: "Peptic Ulcer Disease",
    category: "Digestive",
    symptoms: ["stomach pain", "abdominal pain", "burning pain", "nausea", "vomiting", "bloating"],
    aliases: ["ulcer", "gastric ulcer"],
    riskLevel: "Medium",
    response:
      "The symptom pattern overlaps with peptic ulcer disease records. Persistent burning abdominal pain, vomiting, black stool, or blood needs medical review.",
    nextSteps: [
      "Avoid NSAIDs and alcohol unless a clinician says otherwise.",
      "Book medical review for persistent pain.",
      "Seek urgent care for black stool, vomiting blood, or severe abdominal pain."
    ]
  },
  {
    id: "typhoid",
    illness: "Typhoid",
    category: "Infectious Disease",
    symptoms: ["prolonged fever", "headache", "stomach pain", "diarrhea", "constipation", "weakness"],
    aliases: ["enteric fever"],
    riskLevel: "High",
    response:
      "Your symptoms match typhoid-like records when prolonged fever appears with abdominal symptoms and weakness. Testing and clinician-directed treatment may be needed.",
    nextSteps: [
      "Arrange medical review and diagnostic testing.",
      "Maintain hydration.",
      "Seek urgent care for confusion, severe weakness, or persistent high fever."
    ]
  },
  {
    id: "dengue",
    illness: "Dengue",
    category: "Infectious Disease",
    symptoms: ["high fever", "severe headache", "joint pain", "muscle pain", "rash", "eye pain"],
    aliases: ["breakbone fever"],
    riskLevel: "High",
    response:
      "The symptoms overlap with dengue records, especially high fever with severe body pain, rash, or eye pain. Dengue warning signs need urgent medical attention.",
    nextSteps: [
      "Arrange medical review and testing.",
      "Avoid aspirin or ibuprofen unless a clinician approves.",
      "Seek urgent care for bleeding, severe abdominal pain, persistent vomiting, or drowsiness."
    ]
  },
  {
    id: "malaria",
    illness: "Malaria",
    category: "Infectious Disease",
    symptoms: ["fever", "chills", "sweating", "headache", "body ache", "nausea"],
    aliases: ["malarial fever"],
    riskLevel: "High",
    response:
      "Your symptom pattern matches malaria-like records when fever, chills, sweating, headache, and body aches occur together. Testing is important.",
    nextSteps: [
      "Seek medical testing promptly, especially after mosquito exposure or travel.",
      "Maintain fluids while waiting for care.",
      "Seek urgent care for confusion, seizures, severe weakness, or breathing difficulty."
    ]
  },
  {
    id: "chicken-pox",
    illness: "Chicken Pox",
    category: "Infectious Disease",
    symptoms: ["fever", "itchy rash", "blisters", "tiredness", "loss of appetite", "body ache"],
    aliases: ["varicella", "chickenpox"],
    riskLevel: "Medium",
    response:
      "The symptoms match chicken pox records when fever and itchy blister-like rash occur together. Contagion and complications are important considerations.",
    nextSteps: [
      "Avoid close contact with pregnant people, newborns, and immunocompromised people.",
      "Keep rash clean and avoid scratching.",
      "Seek care for breathing issues, severe headache, confusion, or infected rash."
    ]
  },
  {
    id: "jaundice",
    illness: "Jaundice",
    category: "Hepatology",
    symptoms: ["yellow skin", "yellow eyes", "dark urine", "pale stool", "itching", "fatigue"],
    aliases: ["icterus"],
    riskLevel: "High",
    response:
      "Your symptoms match jaundice records, especially yellow eyes or skin with dark urine. Jaundice can reflect liver, bile duct, or blood conditions and needs evaluation.",
    nextSteps: [
      "Arrange medical review and liver-related testing.",
      "Avoid alcohol and unnecessary medications until assessed.",
      "Seek urgent care for confusion, severe abdominal pain, fever, or bleeding."
    ]
  },
  {
    id: "diabetes",
    illness: "Diabetes",
    category: "Endocrine",
    symptoms: ["increased thirst", "frequent urination", "increased hunger", "weight loss", "fatigue", "blurred vision"],
    aliases: ["high blood sugar", "hyperglycemia"],
    riskLevel: "Medium",
    response:
      "The symptoms match diabetes-like records when frequent urination, increased thirst, fatigue, weight change, or blurred vision appear together. Blood glucose testing is needed for confirmation.",
    nextSteps: [
      "Book medical review for blood sugar testing.",
      "Seek urgent care for vomiting, confusion, severe weakness, or deep rapid breathing.",
      "Track symptom duration and family history."
    ]
  },
  {
    id: "hypertension",
    illness: "Hypertension",
    category: "Cardiovascular",
    symptoms: ["high blood pressure", "headache", "dizziness", "chest pain", "shortness of breath", "blurred vision"],
    aliases: ["high bp", "high pressure"],
    riskLevel: "Medium",
    response:
      "The symptom pattern can appear with hypertension records, but blood pressure measurement is required. Severe chest pain, breathlessness, weakness, or vision changes are urgent.",
    nextSteps: [
      "Measure blood pressure with a reliable cuff.",
      "Book review for repeated high readings.",
      "Seek emergency care for chest pain, neurological symptoms, or severe breathlessness."
    ]
  },
  {
    id: "allergy",
    illness: "Allergy",
    category: "Allergy",
    symptoms: ["sneezing", "runny nose", "itching", "rash", "watery eyes", "swelling"],
    aliases: ["allergic reaction", "hay fever"],
    riskLevel: "Low",
    response:
      "The symptoms match allergy records when sneezing, itching, rash, watery eyes, or swelling occur after a trigger. Breathing trouble or facial swelling is urgent.",
    nextSteps: [
      "Avoid dust, pollen, or suspected food triggers.",
      "Track rash, swelling, and breathing changes.",
      "Seek urgent help for facial swelling or breathing trouble."
    ]
  },
  {
    id: "drug-reaction",
    illness: "Drug Reaction",
    category: "Allergy",
    symptoms: ["rash", "itching", "swelling", "fever", "hives", "breathing difficulty"],
    aliases: ["medicine allergy", "medication reaction"],
    riskLevel: "High",
    response:
      "Your symptoms overlap with drug reaction records, especially rash, hives, swelling, or breathing changes after medication exposure. Severe reactions need urgent care.",
    nextSteps: [
      "Stop non-essential suspected medication only after clinician guidance when possible.",
      "Seek urgent care for facial swelling, wheezing, fainting, or breathing difficulty.",
      "Record the medication name, dose, and timing."
    ]
  },
  {
    id: "fungal-infection",
    illness: "Fungal Infection",
    category: "Dermatology",
    symptoms: ["itching", "skin rash", "red patches", "scaling", "peeling skin", "ring shaped rash"],
    aliases: ["ringworm", "tinea"],
    riskLevel: "Low",
    response:
      "The symptoms match fungal skin infection records when itchy, scaly, ring-like, or spreading patches are present. Confirmation may need a clinician or dermatologist.",
    nextSteps: [
      "Keep the area clean and dry.",
      "Avoid sharing towels or clothing.",
      "Seek care if the rash spreads, becomes painful, or does not improve."
    ]
  },
  {
    id: "impetigo",
    illness: "Impetigo",
    category: "Dermatology",
    symptoms: ["skin sores", "blisters", "honey colored crust", "itching", "red sores", "rash"],
    aliases: ["bacterial skin infection"],
    riskLevel: "Medium",
    response:
      "The pattern matches impetigo-like records when red sores, blisters, and honey-colored crusts appear. It can spread easily and may require treatment.",
    nextSteps: [
      "Avoid touching or scratching sores.",
      "Do not share towels or clothing.",
      "Book medical review for spreading sores, fever, or pain."
    ]
  },
  {
    id: "psoriasis",
    illness: "Psoriasis",
    category: "Dermatology",
    symptoms: ["scaly patches", "itching", "dry skin", "red plaques", "skin flakes", "joint pain"],
    aliases: ["plaque psoriasis"],
    riskLevel: "Medium",
    response:
      "The symptoms match psoriasis-like records when dry, scaly plaques recur, sometimes with itching or joint pain. A clinician can distinguish it from infection or eczema.",
    nextSteps: [
      "Avoid scratching and note triggers.",
      "Use gentle skin care and moisturization.",
      "Seek review for painful joints, spreading plaques, or infection signs."
    ]
  },
  {
    id: "acne",
    illness: "Acne",
    category: "Dermatology",
    symptoms: ["pimples", "blackheads", "whiteheads", "oily skin", "skin bumps", "face rash"],
    aliases: ["acne vulgaris"],
    riskLevel: "Low",
    response:
      "Your symptoms match acne records, especially pimples, blackheads, whiteheads, or oily skin. Severe, painful, or scarring acne benefits from clinician review.",
    nextSteps: [
      "Use gentle cleansing and avoid picking lesions.",
      "Track products that worsen irritation.",
      "Seek dermatology review for painful cysts or scarring."
    ]
  },
  {
    id: "urinary-tract-infection",
    illness: "Urinary Tract Infection",
    category: "Urinary",
    symptoms: ["burning urine", "frequent urination", "urine pain", "lower abdomen pain", "cloudy urine", "back pain"],
    aliases: ["uti", "urinary infection"],
    riskLevel: "Medium",
    response:
      "The public symptom dataset finds a urinary infection pattern when burning urine, frequent urination, cloudy urine, or lower abdominal pain are reported. Testing may be needed.",
    nextSteps: [
      "Drink water unless restricted by a clinician.",
      "Note fever, back pain, and urine color changes.",
      "Book medical review if symptoms persist."
    ]
  },
  {
    id: "arthritis",
    illness: "Arthritis",
    category: "Musculoskeletal",
    symptoms: ["joint pain", "joint stiffness", "swelling", "reduced movement", "morning stiffness", "warm joint"],
    aliases: ["joint inflammation"],
    riskLevel: "Medium",
    response:
      "The symptoms match arthritis-like records when joint pain, stiffness, swelling, or reduced movement persist. Sudden hot swollen joints need prompt review.",
    nextSteps: [
      "Track which joints are affected and morning stiffness duration.",
      "Book medical review for persistent or worsening joint symptoms.",
      "Seek urgent care for fever with a hot swollen joint."
    ]
  },
  {
    id: "cervical-spondylosis",
    illness: "Cervical Spondylosis",
    category: "Musculoskeletal",
    symptoms: ["neck pain", "stiff neck", "shoulder pain", "arm numbness", "tingling", "headache"],
    aliases: ["neck arthritis", "cervical pain"],
    riskLevel: "Medium",
    response:
      "The symptoms match cervical spondylosis-like records when neck stiffness, shoulder pain, headache, or arm tingling occur together. Neurological symptoms should be assessed.",
    nextSteps: [
      "Avoid heavy lifting during symptom flares.",
      "Book review if pain or tingling persists.",
      "Seek urgent care for weakness, loss of balance, or bladder or bowel changes."
    ]
  },
  {
    id: "varicose-veins",
    illness: "Varicose Veins",
    category: "Vascular",
    symptoms: ["visible veins", "leg swelling", "leg pain", "heaviness", "itching legs", "skin discoloration"],
    aliases: ["swollen leg veins"],
    riskLevel: "Low",
    response:
      "Your symptoms match varicose vein records when visible enlarged veins occur with leg heaviness, swelling, itching, or skin color changes.",
    nextSteps: [
      "Elevate legs and avoid long standing when possible.",
      "Book review for persistent pain, swelling, or skin changes.",
      "Seek urgent care for sudden one-sided swelling, redness, or severe pain."
    ]
  },
  {
    id: "hemorrhoids",
    illness: "Hemorrhoids",
    category: "Digestive",
    symptoms: ["rectal pain", "rectal bleeding", "itching anus", "painful stool", "swelling anus", "blood in stool"],
    aliases: ["piles", "hemorrhoid"],
    riskLevel: "Medium",
    response:
      "The symptoms match hemorrhoid-like records when rectal pain, itching, swelling, or bright blood with stool occurs. Bleeding should be evaluated if persistent or heavy.",
    nextSteps: [
      "Avoid straining and maintain hydration and fiber intake.",
      "Book medical review for repeated bleeding or pain.",
      "Seek urgent care for heavy bleeding, black stool, dizziness, or severe pain."
    ]
  },
  {
    id: "tuberculosis",
    illness: "Tuberculosis",
    category: "Infectious Disease",
    symptoms: ["persistent cough", "weight loss", "night sweats", "fever", "chest pain", "blood in sputum"],
    aliases: ["tb", "pulmonary tuberculosis"],
    riskLevel: "High",
    response:
      "The pattern overlaps with tuberculosis records, especially persistent cough for over 3 weeks, night sweats, and weight loss. TB is serious and requires long-term treatment.",
    nextSteps: [
      "Arrange immediate medical evaluation and sputum testing.",
      "Inform healthcare providers of cough duration.",
      "Follow infection control measures to protect others."
    ]
  },
  {
    id: "hypothyroidism",
    illness: "Hypothyroidism",
    category: "Endocrine",
    symptoms: ["fatigue", "weight gain", "cold intolerance", "dry skin", "constipation", "depression"],
    aliases: ["underactive thyroid"],
    riskLevel: "Medium",
    response:
      "Symptoms match records for hypothyroidism (underactive thyroid). Slow metabolism can cause weight gain, cold intolerance, and fatigue. Thyroid function tests are needed.",
    nextSteps: [
      "Book a blood test for TSH and T4 levels.",
      "Track energy levels and weight changes.",
      "A clinician can determine if hormone replacement is needed."
    ]
  },
  {
    id: "hyperthyroidism",
    illness: "Hyperthyroidism",
    category: "Endocrine",
    symptoms: ["weight loss", "rapid heartbeat", "anxiety", "heat intolerance", "tremor", "sweating"],
    aliases: ["overactive thyroid"],
    riskLevel: "Medium",
    response:
      "Your pattern overlaps with hyperthyroidism records, where the thyroid produces too much hormone. Fast metabolism, tremors, and heat intolerance are common signs.",
    nextSteps: [
      "Arrange thyroid function testing (TSH, T4, T3).",
      "Monitor resting heart rate.",
      "Seek care for chest pain or very rapid heart rate."
    ]
  },
  {
    id: "hepatitis-a",
    illness: "Hepatitis A",
    category: "Hepatology",
    symptoms: ["nausea", "vomiting", "stomach pain", "jaundice", "dark urine", "fever"],
    aliases: ["viral hepatitis", "liver inflammation"],
    riskLevel: "High",
    response:
      "Symptoms match viral hepatitis patterns. Liver inflammation often causes jaundice, dark urine, and abdominal pain. It is highly contagious through food and water.",
    nextSteps: [
      "Book blood tests for liver function and hepatitis markers.",
      "Maintain hydration and rest.",
      "Avoid alcohol and follow strict hygiene to prevent spreading."
    ]
  },
  {
    id: "anemia",
    illness: "Anemia",
    category: "Hematology",
    symptoms: ["fatigue", "pale skin", "shortness of breath", "dizziness", "cold hands", "brittle nails"],
    aliases: ["iron deficiency", "low hemoglobin"],
    riskLevel: "Medium",
    response:
      "The pattern matches anemia records, where the blood lacks enough healthy red cells. Fatigue and shortness of breath are primary indicators. A CBC test is needed.",
    nextSteps: [
      "Book a Complete Blood Count (CBC) and iron studies.",
      "Increase iron-rich foods if deficiency is suspected.",
      "Seek care for severe weakness or fainting."
    ]
  },
  {
    id: "kidney-stone",
    illness: "Kidney Stones",
    category: "Urology",
    symptoms: ["severe side pain", "back pain", "blood in urine", "nausea", "frequent urination", "burning urine"],
    aliases: ["renal calculi", "nephrolithiasis"],
    riskLevel: "High",
    response:
      "Your symptoms match kidney stone records, especially intense, sharp pain in the side and back that may radiate to the lower abdomen. Blood in urine is common.",
    nextSteps: [
      "Seek prompt medical review for pain management and imaging.",
      "Maintain high fluid intake unless advised otherwise.",
      "Seek emergency care for high fever with pain or inability to pass urine."
    ]
  },
  {
    id: "hypoglycemia",
    illness: "Hypoglycemia",
    category: "Endocrine",
    symptoms: ["shakiness", "sweating", "confusion", "dizziness", "rapid heartbeat", "hunger"],
    aliases: ["low blood sugar"],
    riskLevel: "High",
    response:
      "The pattern overlaps with hypoglycemia (low blood sugar). This can be life-threatening if it leads to loss of consciousness. Immediate sugar intake is often the first step.",
    nextSteps: [
      "Consume fast-acting sugar (juice, candy) immediately.",
      "Test blood glucose levels if a meter is available.",
      "Seek emergency care for confusion, seizures, or fainting."
    ]
  },
  {
    id: "bronchitis",
    illness: "Bronchitis",
    category: "Respiratory",
    symptoms: ["cough", "mucus production", "fatigue", "shortness of breath", "slight fever", "chest discomfort"],
    aliases: ["chest cold", "acute bronchitis"],
    riskLevel: "Medium",
    response:
      "Symptoms match records for bronchitis, an inflammation of the bronchial tubes. Persistent cough with mucus is the most common symptom.",
    nextSteps: [
      "Rest and increase fluid intake.",
      "Avoid irritants like smoke or strong fumes.",
      "Seek care for high fever, bloody mucus, or severe wheezing."
    ]
  },
  {
    id: "appendicitis",
    illness: "Appendicitis",
    category: "Digestive",
    symptoms: ["lower right abdomen pain", "nausea", "vomiting", "loss of appetite", "fever", "abdominal swelling"],
    aliases: ["inflamed appendix"],
    riskLevel: "Urgent",
    response:
      "The pattern matches appendicitis records, especially pain starting near the navel and moving to the lower right abdomen. This is a medical emergency.",
    nextSteps: [
      "Seek emergency medical care immediately.",
      "Do not eat or drink anything until evaluated.",
      "Do not use laxatives or heating pads."
    ]
  },
  {
    id: "gallstones",
    illness: "Gallstones",
    category: "Digestive",
    symptoms: ["sudden upper right abdomen pain", "back pain", "nausea", "vomiting", "shoulder pain"],
    aliases: ["cholelithiasis"],
    riskLevel: "High",
    response:
      "Symptoms match gallstone records, where hardened deposits in the gallbladder cause sudden, intense pain in the upper right abdomen or between shoulder blades.",
    nextSteps: [
      "Book a medical review and ultrasound.",
      "Monitor if pain occurs after fatty meals.",
      "Seek urgent care for yellowing of skin/eyes or high fever with pain."
    ]
  },
  {
    id: "heart-attack",
    illness: "Heart Attack",
    category: "Cardiovascular",
    symptoms: ["chest pain", "shortness of breath", "nausea", "sweating", "arm pain", "jaw pain"],
    aliases: ["myocardial infarction", "cardiac arrest"],
    riskLevel: "Urgent",
    response:
      "Your symptoms overlap with critical heart attack records. Sudden chest pressure, pain radiating to the arm or jaw, and cold sweats are emergency signs.",
    nextSteps: [
      "Call emergency services immediately (911 or local emergency number).",
      "Do not drive yourself to the hospital.",
      "Sit or lie down and try to remain calm until help arrives."
    ]
  },
  {
    id: "stroke",
    illness: "Stroke",
    category: "Neurology",
    symptoms: ["facial drooping", "arm weakness", "speech difficulty", "sudden confusion", "vision loss", "severe headache"],
    aliases: ["cva", "brain attack"],
    riskLevel: "Urgent",
    response:
      "The pattern matches stroke records. Sudden weakness on one side of the body, slurred speech, or facial drooping requires immediate medical intervention.",
    nextSteps: [
      "Call emergency services immediately (911).",
      "Note the time when symptoms first started.",
      "Do not take any medication (like aspirin) until evaluated by a professional."
    ]
  },
  {
    id: "sepsis",
    illness: "Sepsis",
    category: "Infectious Disease",
    symptoms: ["high fever", "shivering", "confusion", "extreme pain", "shortness of breath", "clammy skin"],
    aliases: ["blood poisoning", "septic shock"],
    riskLevel: "Urgent",
    response:
      "Symptoms match sepsis-like records. Sepsis is a life-threatening reaction to an infection. Rapid heartbeat, confusion, and extreme shivering are critical warnings.",
    nextSteps: [
      "Seek emergency medical care immediately.",
      "Mention any recent infections, surgeries, or wounds to the doctors.",
      "This is a time-sensitive medical emergency."
    ]
  },
  {
    id: "copd",
    illness: "COPD",
    category: "Respiratory",
    symptoms: ["shortness of breath", "wheezing", "chronic cough", "chest tightness", "mucus production"],
    aliases: ["emphysema", "chronic bronchitis"],
    riskLevel: "High",
    response:
      "Your pattern matches COPD records (Chronic Obstructive Pulmonary Disease). Long-term breathing difficulty and chronic cough often require specialist management.",
    nextSteps: [
      "Book an appointment for lung function testing (spirometry).",
      "Avoid smoking or exposure to air pollutants.",
      "Seek care for worsening breathlessness or blue-tinted lips."
    ]
  },
  {
    id: "gout",
    illness: "Gout",
    category: "Musculoskeletal",
    symptoms: ["sudden joint pain", "big toe pain", "swelling", "redness", "warmth in joint"],
    aliases: ["uric acid arthritis", "hyperuricemia"],
    riskLevel: "Medium",
    response:
      "The symptoms match gout records, a type of arthritis caused by uric acid crystals. Intense pain and redness, often in the big toe, are classic signs.",
    nextSteps: [
      "Arrange a medical review for uric acid blood testing.",
      "Elevate the affected joint and stay hydrated.",
      "Avoid high-purine foods like red meat and alcohol during flares."
    ]
  },
  {
    id: "pcos",
    illness: "Polycystic Ovary Syndrome",
    category: "Endocrine",
    symptoms: ["irregular periods", "excess facial hair", "acne", "weight gain", "thinning hair"],
    aliases: ["pcos", "hormonal imbalance"],
    riskLevel: "Medium",
    response:
      "Your pattern overlaps with PCOS records, a common hormonal disorder. Irregular cycles and physical changes like acne or hair growth are key indicators.",
    nextSteps: [
      "Book an appointment with a gynecologist or endocrinologist.",
      "Arrange for pelvic ultrasound and hormone blood tests.",
      "Track your menstrual cycle and any skin changes."
    ]
  },
  {
    id: "glaucoma",
    illness: "Glaucoma",
    category: "Ophthalmology",
    symptoms: ["eye pain", "blurred vision", "halos around lights", "headache", "red eye"],
    aliases: ["high eye pressure"],
    riskLevel: "High",
    response:
      "Symptoms match glaucoma records. Increased pressure in the eye can damage the optic nerve. Sudden vision loss or severe eye pain is a medical emergency.",
    nextSteps: [
      "Arrange an urgent eye examination (tonometry).",
      "Seek emergency care for sudden blurred vision or severe eye pain with nausea.",
      "Note any family history of glaucoma."
    ]
  },
  {
    id: "sle",
    illness: "Systemic Lupus Erythematosus",
    category: "Rheumatology",
    symptoms: ["butterfly rash", "joint pain", "fatigue", "fever", "photosensitivity", "chest pain"],
    aliases: ["lupus", "sle"],
    riskLevel: "High",
    response:
      "The pattern matches lupus records, an autoimmune disease. A butterfly-shaped rash on the face and joint pain are common indicators.",
    nextSteps: [
      "Arrange a rheumatology consultation.",
      "Request blood tests for ANA (Antinuclear Antibody).",
      "Avoid direct sun exposure if photosensitivity is present."
    ]
  },
  {
    id: "pneumothorax",
    illness: "Pneumothorax",
    category: "Respiratory",
    symptoms: ["sudden chest pain", "shortness of breath", "rapid breathing", "dry cough", "fatigue"],
    aliases: ["collapsed lung"],
    riskLevel: "Urgent",
    response:
      "Symptoms match records for a collapsed lung (Pneumothorax). Sudden, sharp chest pain and increasing difficulty breathing require immediate imaging and care.",
    nextSteps: [
      "Seek emergency medical care immediately.",
      "Avoid any physical exertion.",
      "Inform the medical team of exactly when the pain started."
    ]
  },
  {
    id: "meningitis",
    illness: "Meningitis",
    category: "Neurology",
    symptoms: ["stiff neck", "high fever", "severe headache", "light sensitivity", "confusion", "rash"],
    aliases: ["brain membrane inflammation"],
    riskLevel: "Urgent",
    response:
      "Symptoms match meningitis-like records. Inflammation of the brain membranes is a critical emergency. A stiff neck combined with fever and headache is a major warning sign.",
    nextSteps: [
      "Seek emergency medical care immediately.",
      "Note any sudden light sensitivity or confusion.",
      "This condition requires rapid diagnostic testing and treatment."
    ]
  },
  {
    id: "pancreatitis",
    illness: "Pancreatitis",
    category: "Digestive",
    symptoms: ["upper abdomen pain", "pain radiating to back", "nausea", "vomiting", "fever", "tender abdomen"],
    aliases: ["inflamed pancreas"],
    riskLevel: "High",
    response:
      "The pattern overlaps with pancreatitis records, where the pancreas becomes inflamed. Severe abdominal pain that radiates to the back after eating is a key indicator.",
    nextSteps: [
      "Arrange immediate medical evaluation.",
      "Fast from food and drink until assessed.",
      "Seek urgent care for severe pain, rapid pulse, or fever."
    ]
  },
  {
    id: "panic-attack",
    illness: "Panic Attack",
    category: "Psychiatry",
    symptoms: ["rapid heartbeat", "shortness of breath", "trembling", "sweating", "fear of dying", "chest tightness"],
    aliases: ["anxiety attack", "panic disorder"],
    riskLevel: "Medium",
    response:
      "Your symptoms match panic attack records. While these symptoms can feel like a heart attack, they are often driven by intense anxiety. Physical evaluation is needed to rule out other causes.",
    nextSteps: [
      "Practice deep, slow breathing.",
      "Seek medical review to rule out physical heart/lung issues.",
      "Note triggers or patterns of these episodes."
    ]
  },
  {
    id: "shingles",
    illness: "Shingles",
    category: "Infectious Disease",
    symptoms: ["painful rash", "burning sensation", "blisters on one side", "itching", "fever", "headache"],
    aliases: ["herpes zoster"],
    riskLevel: "Medium",
    response:
      "The pattern matches shingles records, a viral infection causing a painful, blistering rash that usually appears on one side of the body or face.",
    nextSteps: [
      "Arrange medical review for antiviral treatment within 72 hours.",
      "Keep the rash clean and dry.",
      "Avoid contact with people who haven't had chickenpox or the vaccine."
    ]
  },
  {
    id: "eczema",
    illness: "Eczema",
    category: "Dermatology",
    symptoms: ["itchy skin", "dry skin", "red patches", "small bumps", "thickened skin"],
    aliases: ["atopic dermatitis"],
    riskLevel: "Low",
    response:
      "Symptoms match records for eczema (atopic dermatitis). Chronic itchy and inflamed skin patches are common, often triggered by environmental factors or allergies.",
    nextSteps: [
      "Keep skin moisturized with fragrance-free creams.",
      "Identify and avoid personal triggers (soaps, fabrics, etc.).",
      "Seek review for signs of infection (pus, yellow crusting)."
    ]
  },
  {
    id: "influenza",
    illness: "Influenza",
    category: "Infectious Disease",
    symptoms: ["fever", "chills", "muscle aches", "cough", "congestion", "fatigue", "headache"],
    aliases: ["flu"],
    riskLevel: "Medium",
    response:
      "The symptoms overlap with influenza records. The flu is more severe than a common cold and often includes high fever, intense muscle aches, and extreme fatigue.",
    nextSteps: [
      "Rest and maintain high fluid intake.",
      "Consider antiviral medication if within 48 hours of symptom onset.",
      "Seek care for breathing trouble, chest pain, or confusion."
    ]
  },
  {
    id: "diverticulitis",
    illness: "Diverticulitis",
    category: "Digestive",
    symptoms: ["lower left abdomen pain", "fever", "nausea", "constipation", "diarrhea", "bloating"],
    aliases: ["inflamed diverticula"],
    riskLevel: "High",
    response:
      "Symptoms match diverticulitis records, where small pouches in the colon become inflamed. Persistent pain in the lower left abdomen is the most common sign.",
    nextSteps: [
      "Book a medical review for diagnostic imaging or testing.",
      "Switch to a liquid diet temporarily if advised.",
      "Seek urgent care for severe pain, high fever, or rectal bleeding."
    ]
  },
  {
    id: "osteoporosis",
    illness: "Osteoporosis",
    category: "Musculoskeletal",
    symptoms: ["back pain", "loss of height", "stooped posture", "easily broken bones"],
    aliases: ["brittle bones"],
    riskLevel: "Low",
    response:
      "The pattern overlaps with osteoporosis records, where bones become weak and brittle. It is often 'silent' until a fracture occurs or posture changes.",
    nextSteps: [
      "Book a Bone Density Test (DEXA scan).",
      "Ensure adequate Calcium and Vitamin D intake.",
      "Discuss fall prevention and weight-bearing exercises with a clinician."
    ]
  },
  {
    id: "mono",
    illness: "Mononucleosis",
    category: "Infectious Disease",
    symptoms: ["extreme fatigue", "sore throat", "fever", "swollen lymph nodes", "swollen tonsils", "headache"],
    aliases: ["mono", "kissing disease", "glandular fever"],
    riskLevel: "Medium",
    response:
      "Your symptoms match mononucleosis records, a viral infection often causing severe fatigue and a very sore throat. It requires significant rest for recovery.",
    nextSteps: [
      "Prioritize rest and hydration.",
      "Avoid contact sports to prevent spleen injury.",
      "Seek care for difficulty swallowing or abdominal pain."
    ]
  }
];

export const fallbackIllnessResult = {
  id: "general-guidance",
  illness: "General patient guidance",
  category: "General",
  symptoms: [],
  aliases: [],
  riskLevel: "Unknown",
  response:
    "The local medical dataset does not have a strong match yet. Describe symptoms in simple words like fever, cough, headache, stomach pain, nausea, rash, urine pain, wheezing, itching, or joint pain for a better local response.",
  nextSteps: [
    "Add more symptom details.",
    "Mention duration and severity.",
    "Use the chatbot for a guided follow-up."
  ]
};
