import React, { useEffect, useState, Fragment } from "react";
import "./style.css";

function useDelayUnmount(isMounted, delayTime) {
	const [showDiv, setShowDiv] = useState(false);

	useEffect(() => {
		let timeoutId;
		if (isMounted && !showDiv) {
			setShowDiv(true);
		} else if (!isMounted && showDiv) {
			timeoutId = setTimeout(() => setShowDiv(false), delayTime); //delay our unmount
		}
		return () => clearTimeout(timeoutId); // cleanup mechanism for effects, the use of setTimeout generate a sideEffect
	}, [isMounted, delayTime, showDiv]);

	return showDiv;
}

const Index = ({ children, isMounted }) => {
	const showDiv = useDelayUnmount(isMounted, 200);
	const mountedStyle = { animation: "inAnimation 200ms ease-in" };
	const unmountedStyle = {
		animation: "outAnimation 200ms ease-out",
		animationFillMode: "forwards"
	};

	return (
		<Fragment>
			{showDiv && (
				<div style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>
			)}
		</Fragment>
	);
};

export default Index;
