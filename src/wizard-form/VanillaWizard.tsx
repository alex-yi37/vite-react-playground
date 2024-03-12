import { useReducer, createContext } from "react";

import {
  wizardController as wizardReducer,
  newWizardController,
} from "./wizard-controller";
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
  // const [state, send] = useReducer(wizardReducer, { status: "personalInfo" });
  const [state, send] = useReducer(newWizardController, {
    status: "personalInfo",
  });

  console.log("current state:", state);
  return (
    <WizardContext.Provider value={contextObj}>
      <div style={{ background: "yellow" }}>
        <h2>Vanilla Wizard Form</h2>
        {state.status === "personalInfo" ? (
          <PersonalInfoForm
            handleSubmit={(formData) => {
              console.log("what is our data?", formData.get("firstName"));
              send({ type: "next" });
            }}
          />
        ) : null}
        {state.status === "addressInfo" ? (
          <AddressInfoForm
            handleSubmit={(formData) => {
              console.log("what is address 1?", formData.get("address-1"));
              console.log("submitted the address");
            }}
          />
        ) : null}
      </div>
    </WizardContext.Provider>
  );
}
