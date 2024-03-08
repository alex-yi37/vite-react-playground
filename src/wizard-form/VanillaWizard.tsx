import { useReducer, createContext } from "react";

import { wizardController as wizardReducer } from "./wizard-controller";
// import { useWizardForm } from "./useWizardForm";
import { PersonalInfoForm } from "./views/PersonalInfoForm";
import { AddressInfoForm } from "./views/AddressInfoForm";
import { BillingInfoForm } from "./views/BillingInfoForm";
import { ConfirmationScreen } from "./views/ConfirmationScreen";

interface WizardContextData {
  name: string;
  email: string;
}

type WizardContextEvents = { type: "update" } | { type: "reset" };

const contextObj: WizardContextData = { name: "", email: "" };

function wizardDataReducer(
  state: WizardContextData,
  event: WizardContextEvents
) {
  console.log("wizard context event", event);
  return {
    ...state,
  };
}

export function useWizardContext() {
  const [state, send] = useReducer(wizardDataReducer, contextObj);
}

const WizardContext = createContext({});

export function VanillaWizard() {
  const [state, send] = useReducer(wizardReducer, { status: "personalInfo" });

  return (
    <WizardContext.Provider value={contextObj}>
      <div style={{ background: "yellow" }}>
        <h2>Vanilla Wizard Form</h2>
        <PersonalInfoForm />
      </div>
    </WizardContext.Provider>
  );
}
