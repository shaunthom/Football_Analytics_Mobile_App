import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/*  style property controls how the <view> element looks like
style property in view is an array that has:
1. styles.container : A predefined style set for the view element. It has styling rules like border width, size, etc
2. margintop : sets the top margin
<TEXT> element is styled by styles.textstyle which sets it font size and font weight
*/

const Box = (props) => {

    return (
        <View style={[styles.container, {marginTop: props.marginTop}]}>
            <Text style={styles.textStyle}>{props.text}</Text>
        </View>
    )
}

/*
Here, StyleSheet.create is used to define a styles object. This object has two properties:
container and textStyle, which are then used in the Box component to style the <View> and <Text> elements, respectively.
container: Defines the style for the View. It sets a border, aligns the content to the center, etc.
textStyle: Defines the style for the Text. It sets the font to bold and specifies the font size.

These properties (borderwidth, justifycontent,etc.) are called style properties, and they're specific to React Native's layout
and styling engine.

*/

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: "center",
        width: "80%",
        height: 50,
        marginVertical: 5,
        borderRadius: 5
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 20,
	},
})

export default Box
