import { useContext } from "react";
import { WizardContext } from "./VanillaWizard";
// was getting a linting error when I defined useWizardContext in the same file as VanillaWizard.tsx, so I'm splitting it into
// another file. Error in question:
// Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.

// custom hook to use in our various forms for pre-populating input fields from context, as well as updating the
// context values on form submissions
export function useWizardContext() {
  const { wizardValues, updateWizardValues } = useContext(WizardContext);

  return { wizardValues, updateWizardValues };
}
