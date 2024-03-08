// want to use this as a finite state machine for making simple transitions in a wizard form
// trying to model this based on David K article: https://dev.to/davidkpiano/you-don-t-need-a-library-for-state-machines-k7h
interface Event {
  type: "next" | "back" | "submit" | "reset";
}

interface State {
  status: "personalInfo" | "addressInfo" | "billingInfo" | "confirmation";
}

interface StateNode {
  on: Event;
}

// guarded transition seems necessary here to make sure we can only move forward if the current form is valid
// or has already been submitted

// per the article, guarded transitions are a feature of state charts, not finite state machines so maybe can't really
// use them here. Regardless, I want to try implementing the vanilla finite state machine (and just not have the guards)

/* 
  NOTE: I could maybe get away without using guarded transitions for this simple state machine if I want to prevent
  advancing the form due to validation errors, but it would involve creating many mostly identical finite states. See this
  article: https://statecharts.dev/state-machine-state-explosion.html

  would I have to have states like personalInfoValid, personalInfoInvalid, addressInfoValid, addressInfoInvalid, etc to
  represent cases when the current form has validaiton errors? If so, I'd try implementing it just for practice, but 
  at that point would be nicer to just use XState or some other state chart library

  NOTE: at the moment, Typescript is giving me some errors I don't entirely understand when working with the object
  representation of a state machine. Maybe using switch statements would be easier to type? David touches on this
  implementation in his article but opts to use the configuration object style that XState itself uses
*/

const machine = {
  initial: "personalInfo",
  states: {
    personalInfo: { on: { next: { target: "addressInfo" } } },
    addressInfo: {
      on: { next: { target: "billingInfo" }, back: { target: "billingInfo" } },
    },
    billingInfo: {
      on: {
        next: { target: "confirmation" },
        back: { target: "addressInfo" },
      },
    },
    confirmation: {
      on: {
        reset: { target: "personalInfo" },
        back: { target: "billingInfo" },
      },
    },
  },
};

type MachineType = typeof machine;

export function wizardController(state: State, event: Event): State {
  // based on the current state and received event, we determine what the next state to transition to should be
  const nextStateNode: StateNode = machine.states[state.status].on?.[
    event.type
  ] ?? { target: state.status };

  console.log(state, event);

  return { ...state, status: "personalInfo" };
}
