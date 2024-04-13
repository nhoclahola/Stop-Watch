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
	FlatList,
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
import Lap from './Lap';

type SectionProps = PropsWithChildren<{
	title: string;
}>;

function Stopwatch(): React.JSX.Element {
	const [isRunning, setIsRunning] = useState(false);
	const [time, setTime] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout>();

	const [minLap, setMinLap] = useState<ILap | null>(null);
	const [maxLap, setMaxLap] = useState<ILap | null>(null);
	
	interface ILap {
		index: number,
		time: string,
	}
	const [lapList, setLapList] = useState<ILap[]>([])

	const formatTime = (milliseconds: number): string => {
		const mins = Math.floor(milliseconds / 60000);
		const secs = Math.floor((milliseconds % 60000) / 1000);
		const miliSecs = Math.floor((milliseconds % 1000) / 10);

		return `${mins.toString().padStart(2, '0')}:${secs
			.toString()
			.padStart(2, '0')},${miliSecs.toString().padStart(2, '0')}`;
	};

	const startStop = () => {
		setIsRunning((prevState) => {
			if (!prevState) {
				const startTime = Date.now() - time;
				intervalRef.current = setInterval(() => {
					setTime(Date.now() - startTime);
				}, 10);
			} else {
				clearInterval(intervalRef.current as NodeJS.Timeout);
			}
			return !prevState;
		});
	};

	// Sau khi thêm Lap mới, cập nhật thông tin của Lap có thời gian nhỏ nhất và thời gian nhiều nhất
	useEffect(() => {
		const currentLap = lapList[lapList.length - 1];
		if (!minLap || currentLap.time < minLap.time) {
		setMinLap(currentLap);
		}
		if (!maxLap || currentLap.time > maxLap.time) {
		setMaxLap(currentLap);
		}
	}, [lapList]);
	

	const reset = () => {
		clearInterval(intervalRef.current as NodeJS.Timeout);
		setIsRunning(false);
		setTime(0);
	};

	const handleAddLap = (lap : ILap) => {
		if (isRunning) {
			setLapList([...lapList, {index: lapList.length + 1, time: formatTime(time)}])		//Copy lại array cũ và thêm array mới
		}
		// Truyền luôn index và time vào, nếu truyền trong component nó sẽ bị tự cập nhật theo time
		else {
			reset()
			setLapList([])
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.timeTextWrapper}>
				<Text style={styles.timeText}>{formatTime(time)}</Text>
			</View>
			<View style={styles.buttonAndLapWrapper}>
				<View style={styles.buttonWrapper}>
					<TouchableOpacity onPress={handleAddLap} disabled = {!isRunning}>
						<View style={{...styles.button, backgroundColor: isRunning ? '#4a4c4f' : '#3D3D3D'}}>
							<Text style={{color: 'gray'}}>{isRunning ? 'Lap' : 'Reset'}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={startStop}>
						<View style={{...styles.button, borderColor: isRunning ? 'red' : 'green', backgroundColor: isRunning ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.3)'}}>
							<Text style={{color: 'gray'}}>{isRunning ? 'Stop' : 'Start'}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<ScrollView style={styles.lapList}>
				{isRunning ? <Lap index={lapList.length + 1} time={formatTime(time)} fontColor='white'></Lap> : null}
				{
					lapList.slice().reverse().map((item, index) => {
					const reversedIndex = lapList.length - index;
					const fontColor =
							item === minLap
							? 'red'
							: item === maxLap
							? 'green'
							: 'white';
					return <Lap key={index} index={reversedIndex} time={item.time} fontColor={fontColor}/>
					})
				}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black'
	},

	timeTextWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},

	timeText: {
		fontSize: 60,
		color: 'white',
		alignSelf: 'center',
		fontFamily: 'monospace',
	},

	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},

	button: {
		borderWidth: 3,
		width: 84,
		height: 84,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 60,
		borderColor: 'white',
		marginHorizontal: 20,
	},

	lapList: {
	},

	buttonAndLapWrapper: {
		flex: 2,
	}
});

export default Stopwatch;
