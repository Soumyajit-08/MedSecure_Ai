/**
 * Mock AI Service for MedSecure AI.
 * Used when external AI quota/API access is unavailable.
 */

const hasAny = (query, terms) => terms.some((term) => query.includes(term));

const reportValueLine = (label, meaning, whyItMatters) => `- Finding: ${label}
  Easy meaning: ${meaning}
  Why it matters: ${whyItMatters}`;

export const getMockChatResponse = async (message, file) => {
  const original = message || (file ? `Uploaded ${file.mimetype}` : "Health question");
  const query = original.toLowerCase();
  const findings = [];
  const steps = [];
  const checklist = [];

  if (file) {
    findings.push(reportValueLine(
      "Uploaded report or image",
      "A medical file was attached, so the report should be reviewed carefully.",
      "Report values can show patterns that are not clear from symptoms alone."
    ));
    steps.push("The uploaded file should be checked by the AI service or a doctor for exact values.");
    checklist.push("Keep the original report ready for your doctor.");
  }

  if (hasAny(query, ["hemoglobin", "hb", "anaemia", "anemia", "tired", "fatigue"])) {
    findings.push(reportValueLine(
      "Low hemoglobin or tiredness",
      "Hemoglobin is the part of blood that carries oxygen. If it is low, the body may feel tired or weak.",
      "A doctor may need to check iron, vitamin B12, folate, bleeding history, and diet."
    ));
    steps.push("Low hemoglobin can explain tiredness because less oxygen reaches the body.");
    checklist.push("Write down the exact hemoglobin value and show it to a doctor.");
  }

  if (hasAny(query, ["vitamin d", "vit d", "body pain", "bone pain"])) {
    findings.push(reportValueLine(
      "Low vitamin D or body pain",
      "Vitamin D helps bones and muscles stay healthy. Low vitamin D may cause body pain, muscle weakness, or tiredness.",
      "A doctor may suggest supplements, sunlight exposure guidance, diet changes, or repeat testing."
    ));
    steps.push("Low vitamin D may be one reason for body pain, but other causes may also need checking.");
    checklist.push("Ask your doctor whether vitamin D supplementation or repeat testing is needed.");
  }

  if (hasAny(query, ["fever", "temperature"])) {
    findings.push(reportValueLine(
      "Fever",
      "Fever means the body temperature is higher than normal, often because the body is fighting infection.",
      "The cause depends on duration, temperature level, other symptoms, and examination."
    ));
    steps.push("Monitor temperature and note how many days the fever has continued.");
    checklist.push("Track temperature every 4-6 hours while fever is present.");
  }

  if (hasAny(query, ["cough", "cold", "throat"])) {
    findings.push(reportValueLine(
      "Cough, cold, or throat symptoms",
      "These symptoms may happen with viral infection, allergy, throat irritation, or other respiratory issues.",
      "Breathing difficulty, chest pain, or symptoms lasting many days need medical review."
    ));
    steps.push("Watch whether cough is improving, worsening, or associated with breathing trouble.");
    checklist.push("Note if cough has mucus, blood, wheezing, or shortness of breath.");
  }

  if (hasAny(query, ["headache", "migraine"])) {
    findings.push(reportValueLine(
      "Headache",
      "Headache can come from stress, dehydration, lack of sleep, migraine, eye strain, infection, or high blood pressure.",
      "Sudden severe headache or headache with weakness/confusion needs urgent care."
    ));
    steps.push("Notice the headache location, severity, triggers, and whether it is new or repeated.");
    checklist.push("Record headache timing, severity, and any vomiting, vision change, or fever.");
  }

  if (findings.length === 0) {
    findings.push(reportValueLine(
      "Health concern shared",
      "You described a health question, but more details are needed for a clearer explanation.",
      "Duration, severity, age, report values, medicines, and other symptoms can change the advice."
    ));
    steps.push("The message needs more details before the result can be explained accurately.");
    checklist.push("Share the exact report values, symptom duration, age, and any current medicines.");
  }

  return `### Summary
Here is the easy explanation of your concern: "${original}".
The information suggests a health issue that should be understood step by step.
Some parts may need a doctor review, especially if symptoms are strong, long-lasting, or getting worse.
I will explain what it may mean and what you can do next in simple words.

### Step-by-Step Explanation
1. What you told us: ${original}
2. What it means: ${steps[0] || "Your symptoms or report values need to be connected with your full health history."}
3. Common reasons: This can happen because of diet, infection, vitamin/mineral deficiency, dehydration, poor sleep, stress, or another medical condition. The exact reason depends on your full report and examination.
4. How it connects to symptoms: ${steps[1] || "Symptoms like tiredness, pain, fever, cough, or headache can have more than one cause, so the pattern matters."}
5. What is still needed: Exact report values, symptom duration, age, existing diseases, current medicines, and whether symptoms are improving or worsening.

### Key Findings
${findings.join("\n\n")}

### What You Should Do Now
1. If symptoms are mild, rest, drink enough water, and avoid heavy activity until you feel better.
2. Write down your symptoms, when they started, and what makes them better or worse.
3. Keep your report values ready, including the normal range shown beside each value.
4. Book a doctor visit if the problem is new, repeated, severe, or not improving.
5. Ask the doctor whether follow-up tests are needed based on your report.

### Possible Treatment Direction
Treatment depends on the cause.
A doctor may suggest diet changes, supplements, medicines, repeat blood tests, or further investigation.
Do not start strong medicine or high-dose supplements by yourself.
If a doctor has already prescribed treatment, follow that prescription and ask before changing it.

### When To Seek Urgent Care
Get urgent medical help if you have breathing trouble, chest pain, fainting, confusion, severe weakness, very high fever, uncontrolled bleeding, severe allergic reaction, or symptoms getting worse quickly.

### Simple Checklist
${checklist.map((item) => `- ${item}`).join("\n")}
- Book a doctor appointment if symptoms continue or report values are abnormal.
- Take all reports and current medicine details to the doctor.

This is AI guidance, not a final medical diagnosis. Please consult a qualified doctor for treatment decisions.`;
};

export const getMockVisionResult = async (file) => {
  return {
    "simple_explanation": "The uploaded file is valid, but the external AI scanner is not available right now. Please review the report values with a qualified doctor.",
    "key_findings": ["Medical file uploaded", "Detailed AI scan unavailable in fallback mode", "Doctor review recommended"],
    "medicines": [
      { "name": "Doctor-prescribed treatment only", "purpose": "Final treatment depends on report findings", "caution": "Do not self-medicate from AI guidance." }
    ],
    "specialist_type": "General Physician",
    "doctor_role": "Primary Care Consultant",
    "maps_search_link": "https://www.google.com/maps/search/General+Physician+near+me",
    "urgency_level": "Depends on symptoms",
    "recommendations": ["Share exact report values", "Consult a doctor for final diagnosis and treatment plan"]
  };
};
