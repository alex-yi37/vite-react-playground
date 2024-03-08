import { useState } from "react";

// use an array with an index to track the step?

// or use a state enum with checks to make sure we only transition to valid states?
export function useWizardForm() {
  const [formOrder, setFormOrder] = useState("");
}
