import * as ActionTypes from "./ActionTypes";

export const updateRecordings = (newRecording) => ({
	type: ActionTypes.UPDATE_RECORDINGS,
	payload: newRecording,
});
