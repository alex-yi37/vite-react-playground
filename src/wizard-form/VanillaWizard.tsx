import { useReducer, createContext } from "react";

import { newWizardController } from "./wizard-controller";
// import { useWizardForm } from "./useWizardForm";
import { PersonalInfoForm } from "./views/PersonalInfoForm";
import { AddressInfoForm } from "./views/AddressInfoForm";
import { BillingInfoForm } from "./views/BillingInfoForm";
import { ConfirmationScreen } from "./views/ConfirmationScreen";

const wizardData = {
  firstName: "",
  lastName: "",
  email: "",
  addressOne: "",
  addressTwo: "",
};

type WizardContextData = typeof wizardData;

type WizardContextEvents =
  | { type: "update"; payload: Partial<WizardContextData> }
  | { type: "reset" };

function wizardDataReducer(
  state: WizardContextData,
  event: WizardContextEvents
) {
  if (event.type === "update") {
    return { ...state, ...event.payload };
  } else if (event.type === "reset") {
    return wizardData;
  } else {
    throw new Error("couldn't process event");
  }
}

// function aggregateFormDataEntries<FormEntries>(formData: FormData) {
//   const result = {};

//   for (const entry of formData.entries()) {
//     result[entry[0]] = entry[1];
//   }

//   return result;
// }

export const WizardContext = createContext<{
  wizardValues: WizardContextData;
  updateWizardValues: React.Dispatch<WizardContextEvents>;
}>({
  wizardValues: wizardData,
  updateWizardValues: () => null,
});

export function VanillaWizard() {
  const [state, send] = useReducer(newWizardController, {
    status: "personalInfo",
  });

  const [wizardValues, updateWizardValues] = useReducer(
    wizardDataReducer,
    wizardData
  );

  // maybe I didn't need to use context since there's only one level of nesting at the moment between where
  // state is defined and where it's read in the forms, but overall was a good exercise bc I forgot how
  // to use it, and especially didn't use it much with Typescript
  // so I will keep this
  const contextValues = { wizardValues, updateWizardValues };

  console.log("current state:", state);
  return (
    <WizardContext.Provider value={contextValues}>
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
            handleBack={() => send({ type: "back" })}
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
