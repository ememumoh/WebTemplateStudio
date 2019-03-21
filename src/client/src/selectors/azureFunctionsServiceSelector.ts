import _ from "lodash";
import { createSelector } from "reselect";
import { ISelectedAzureFunctionsService } from "../reducers/wizardSelectionReducers/services/azureFunctionsReducer";

interface ISelectedDropdowns {
    subscription?: IDropDownOptionType;
    resourceGroup?: IDropDownOptionType;
    appName?: IDropDownOptionType;
    runtimeStack?: IDropDownOptionType;
    location?: IDropDownOptionType;
    numFunctions?: IDropDownOptionType;
}

interface ISelectionInformation { 
    dropdownSelection: ISelectedDropdowns
    previousFormData: ISelectedAzureFunctionsService;
}

const getState = (state: any): any => state;
const getServicesSelector = (state: any): any => state.selection.services;

const isAzureFunctionsSelected = (state: any): boolean => {
    return !_.isEmpty(state.selection.services.azureFunctions.selection);
}

const getAzureFunctionsOptions = (state: any, isAzureFunctionsSelected: boolean): any => {
    if (isAzureFunctionsSelected) {
        return state.selection.services.azureFunctions.selection[0];
    }
}
const getAzureFunctionsOptionsSelector = createSelector(
    getState,
    isAzureFunctionsSelected,
    getAzureFunctionsOptions
)

/**
 * Returns the Azure Functions selection made by a developer.
 * Returns undefined if a selection was not made.
 * Currently, only one Azure Functions App can be added, hence
 * the hardcoded value of 0 index.
 * 
 * @param services
 * @param isAzureFunctionsSelected
 */
const getAzureFunctionsSelectionInDropdownForm = (services: any): any => {
    const { selection } = services.azureFunctions;
    if (!_.isEmpty(selection)) {
        const selectionInformation: ISelectionInformation = {
            dropdownSelection: {},
            previousFormData: selection[0]
        };
        for (const selectionKey in selection[0]) {
            if (selectionKey) {
                // @ts-ignore to allow dynamic key selection
                selectionInformation.dropdownSelection[selectionKey] = {
                    value: selection[0][selectionKey],
                    label: selection[0][selectionKey]
                }
            }
        }
        return selectionInformation;
    }
}

const getFunctionsSelection = createSelector(
    getServicesSelector,
    getAzureFunctionsSelectionInDropdownForm
)

export { getFunctionsSelection, getAzureFunctionsOptionsSelector, isAzureFunctionsSelected };