interface VacationRule {
  minAge: number;
  extraDays: number;
}

const BASE_VACATION_DAYS = 20;

// A szabályok sorrendje fontos - a legmagasabb kortól a legalacsonyabbig kell rendezni
const AGE_BASED_VACATION_RULES: VacationRule[] = [
  { minAge: 45, extraDays: 10 }, // 30 nap összesen
  { minAge: 43, extraDays: 9 },  // 29 nap összesen
  { minAge: 41, extraDays: 8 },  // 28 nap összesen
  { minAge: 39, extraDays: 7 },  // 27 nap összesen
  { minAge: 37, extraDays: 6 },  // 26 nap összesen
  { minAge: 35, extraDays: 5 },  // 25 nap összesen
  { minAge: 33, extraDays: 4 },  // 24 nap összesen
  { minAge: 31, extraDays: 3 },  // 23 nap összesen
  { minAge: 28, extraDays: 2 },  // 22 nap összesen
  { minAge: 25, extraDays: 1 },  // 21 nap összesen
  { minAge: 0, extraDays: 0 },   // 20 nap összesen (alap)
];

export function calculateAge(birthDate: string | Date): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // Ha még nem volt idén születésnap, akkor eggyel kevesebb az életkor
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function calculateBaseVacationDays(birthDate: string | Date): number {
  const age = calculateAge(birthDate);
  
  // Megkeressük az első szabályt, ami illeszkedik az életkorra
  const rule = AGE_BASED_VACATION_RULES.find(rule => age >= rule.minAge);
  
  // Ha nincs illeszkedő szabály (ez nem fordulhat elő a 0 éves minimum miatt), 
  // akkor visszaadjuk az alapszabadságot
  return BASE_VACATION_DAYS + (rule?.extraDays || 0);
}

// Helper function a teljes szabadság kiszámításához (alap + extra napok)
export function calculateTotalVacationDays(
  birthDate: string | Date,
  extraDays: number = 0
): number {
  return calculateBaseVacationDays(birthDate) + extraDays;
} 