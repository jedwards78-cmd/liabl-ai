export type ActivityKey = 'kayak' | 'hike' | 'atv' | 'climb'
export type HealthStatus = 'none' | 'cardiac' | 'injury'

export interface ParticipantAnswers {
  fullName:       string
  dob:            string
  email:          string
  activityKey:    ActivityKey
  healthStatus:   HealthStatus
  isMinor:        boolean
  guardianName?:  string
}

export interface WaiverClause {
  id:          string
  title:       string
  body:        string
  highlight?:  boolean
  required:    boolean
}

export const ACTIVITY_LABELS: Record<ActivityKey, string> = {
  kayak: 'Whitewater Kayaking',
  hike:  'Canyon Hiking',
  atv:   'ATV Tour',
  climb: 'Rock Climbing',
}

function baseClauses(name: string, activity: string, date: string): WaiverClause[] {
  return [
    {
      id: 'assumption', title: 'Assumption of Risk', required: true,
      body: `I, ${name}, acknowledge that ${activity} involves inherent risks and hazards. I voluntarily assume full responsibility for all risks of loss, property damage, or personal injury, including death, that may be sustained as a result of my participation.`,
    },
    {
      id: 'release', title: 'Release of Liability', required: true,
      body: `I hereby release, waive, and discharge the operator, its owners, officers, employees, and agents from any and all liability, claims, and actions arising out of or related to any loss, damage, or injury sustained while participating in ${activity} on ${date}.`,
    },
    {
      id: 'emergency', title: 'Emergency Medical Authorization', required: true,
      body: `In the event of an emergency, I authorize operator staff to secure emergency medical services on my behalf. I accept financial responsibility for any emergency medical treatment rendered.`,
    },
    {
      id: 'equipment', title: 'Equipment & Safety Briefing', required: true,
      body: `I confirm receipt of a full safety briefing and proper fitting of all required safety equipment prior to activity commencement. I agree to follow all operator guidelines throughout the activity.`,
    },
    {
      id: 'governing_law', title: 'Governing Law', required: true,
      body: `This agreement shall be governed by the laws of the State of Arizona. Any disputes shall be resolved in the courts of Maricopa County, Arizona.`,
    },
  ]
}

const activityClauses: Record<ActivityKey, WaiverClause> = {
  kayak: {
    id: 'water_hazards', title: 'Water Hazards Acknowledgment', highlight: true, required: true,
    body: 'I understand that whitewater kayaking involves exposure to fast-moving water, submerged obstacles, and potential for capsize. I confirm I am a capable swimmer. I acknowledge that Class III–IV rapids present serious risk of injury or death even to experienced paddlers.',
  },
  hike: {
    id: 'terrain_hazards', title: 'Terrain & Environmental Hazards', highlight: true, required: true,
    body: 'I understand that canyon hiking involves uneven terrain, exposure to extreme temperatures, flash flood risk, and limited emergency access. I confirm I am physically capable of completing the stated route.',
  },
  atv: {
    id: 'vehicle_operation', title: 'Motor Vehicle Operation', highlight: true, required: true,
    body: 'I understand that ATV operation involves risk of rollover, collision, and ejection. I confirm I will comply with all speed limits and route restrictions and will not operate the vehicle under the influence of any substance.',
  },
  climb: {
    id: 'fall_hazards', title: 'Fall & Equipment Hazards', highlight: true, required: true,
    body: 'I understand that rock climbing involves risk of falls and equipment failure. I confirm I have received and understood the safety briefing for all anchor systems, belay devices, and harness equipment.',
  },
}

export function generateClauses(answers: ParticipantAnswers): WaiverClause[] {
  const date     = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const activity = ACTIVITY_LABELS[answers.activityKey]
  const clauses  = [...baseClauses(answers.fullName, activity, date), activityClauses[answers.activityKey]]

  if (answers.healthStatus === 'cardiac') {
    clauses.splice(2, 0, {
      id: 'cardiac', title: 'Physician Clearance — Cardiovascular Condition', highlight: true, required: true,
      body: `${answers.fullName} has disclosed a cardiovascular or respiratory condition. Participant confirms they have received written clearance from a licensed physician within the past 30 days. Participation without valid clearance voids this waiver.`,
    })
  }

  if (answers.healthStatus === 'injury') {
    clauses.splice(2, 0, {
      id: 'injury', title: 'Recent Injury or Surgery Disclosure', highlight: true, required: true,
      body: `${answers.fullName} has disclosed a recent injury or surgical procedure. Participant confirms their physician has cleared them for physical activity of this intensity and accepts full responsibility for any aggravation of the disclosed condition.`,
    })
  }

  if (answers.isMinor && answers.guardianName) {
    clauses.push({
      id: 'minor', title: 'Minor Participant — Guardian Authorization', highlight: true, required: true,
      body: `${answers.guardianName} (legal guardian) grants permission for minor ${answers.fullName} to participate and agrees to all terms of this waiver on the minor's behalf.`,
    })
  }

  return clauses
}
