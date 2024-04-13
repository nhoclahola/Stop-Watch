/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
	Alert,
	Button,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	useColorScheme,
	View,
} from 'react-native';

import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = {
	index: number,
    time: string,
	fontColor: string,
};

function Lap({index, time, fontColor} : SectionProps): React.JSX.Element {
	return (
		<View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={{...styles.text, color: fontColor}}>Lap {index}</Text>
                <Text style={{...styles.text, color: fontColor}}>{time}</Text>
            </View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
        padding: 10,
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 10,
	},

    textWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },

    text: {
        fontSize: 16,
    },
});

export default Lap;
