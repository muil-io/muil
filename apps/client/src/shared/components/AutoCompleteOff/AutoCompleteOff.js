import React from 'react';

// add this component inside form to avoid autocomplete of chrome
const AutoCompleteOff = () => (
	<>
		<input type="text" name="username" style={{ opacity: '0', position: 'absolute', zIndex: -999 }} />
		<input type="password" name="password" style={{ opacity: '0', position: 'absolute', zIndex: -999 }} />
	</>
);

export default AutoCompleteOff;
