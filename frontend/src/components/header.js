import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

/*
{props.title}: This is a JavaScript expression that fetches the title from the props object and inserts its value as 
the content or "children" of the Text component.
By placing {props.title} between the opening and closing tags, you're setting the displayed content of the Text 
component to whatever string is passed in as the title prop. If, for example, you used the Header component like this:
<Header title="Welcome!" />
Then the Text component in the Header would render the string "Welcome!" on the screen.
*/

export default function Header(props) {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontWeight: "700",
        fontSize: 17,
        textAlign: "center"
    }
})

/*
To use this Header component in another component or screen, you would typically do something like:
<Header title="My App's Header" />
This would render a header with the text "My App's Header" centered both horizontally and vertically within a bordered container.
*/