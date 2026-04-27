export interface CleaningMethod {
  title: string;
  instructions: string[];
  ingredients: string[];
  tip: string;
}

export interface AncientSecret {
  civilization: string;
  ingredients: string;
  howToUse: string;
  whyItWorked: string;
}

export interface CleaningGuidance {
  problemAnalysis: string;
  naturalMethods: CleaningMethod[];
  ancientSecrets: AncientSecret[];
  safetyTip: string;
}
