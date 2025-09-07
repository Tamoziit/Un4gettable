import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ProjectDetails = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Text>{id}</Text>
		</View>
	)
}

export default ProjectDetails;