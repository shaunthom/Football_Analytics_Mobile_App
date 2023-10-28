import * as ActionTypes from "../actions/actionTypes";

const recordings = (recordings = { recordingHistory: [] }, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_RECORDINGS:
			let newRecording = action.payload;
			let newRecordingHistory = [...recordings.recordingHistory];
			newRecordingHistory.push(newRecording);
			return { recordingHistory: newRecordingHistory };
		default:
			return recordings;
	}
};

export default combineReducers({ recordings });
