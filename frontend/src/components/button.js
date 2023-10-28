import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

/*
<Text style={[styles.textStyle, props.textStyle]}>{props.text}</Text>
is designed to allow for both default styling and custom styling of the <Text> component. 
The styles.textStyle object defines a set of default styles that will be applied to the text. 
The props.textStyle object, on the other hand, allows the parent component to pass in additional styles or override the default styles.

style: This prop accepts an array of style objects. The styles are applied in the order they are listed in the array, so later styles can override
 earlier ones.

styles.container: The default styles for the button.
{ marginTop: props.marginTop }: Inline style to set the top margin, passed via props.
props.buttonStyle: Any additional styles passed as props, which can override the default styles.
onPress: This is an event handler that gets triggered when the button is pressed. The function to be executed is passed via props.onButtonPress.


The reason for the additional curly braces in style={[styles.container, { marginTop: props.marginTop }, props.buttonStyle]} is that this is an 
array of style objects, not a single object.
The outermost square brackets [] define an array.
styles.container is the first object in this array, defining basic styles.
{ marginTop: props.marginTop } is the second object, providing additional inline styles.
props.buttonStyle is the third object, which could further override or extend styles.
So, in short:

The square brackets [] are used to define an array of style objects.
The innermost curly braces {} define a single inline style object.
*/

const Button = (props) => {

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{ marginTop: props.marginTop },
				props.buttonStyle,
			]}
			onPress={props.onButtonPress}
		>
			<Text style={[styles.textStyle, props.textStyle]}>{props.text}</Text>
		</TouchableOpacity>
	);
};


const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
		height: 50,
		marginVertical: 10,
		borderRadius: 15,
	},
	textStyle: {
		fontWeight: "bold",
		fontSize: 20,
	},
});

export default Button;
