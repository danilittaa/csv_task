import { STATE_ABREVIATIONS } from "./constants/constants";

const formatLicenseStates = (states: string[]) => {
  const abbreviatedStates = states.map((state) => {
    const abbreviation = state.length > 2 ? STATE_ABREVIATIONS[state] : state;
    return abbreviation ? abbreviation : state;
  });

  const formattedStates = abbreviatedStates.join(" | ");
  return formattedStates;
};

export { formatLicenseStates };
