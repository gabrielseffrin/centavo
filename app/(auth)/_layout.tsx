import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
      <Tabs.Screen
        name="(home)/home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(categories)/index"
        options={{
          title: 'Categorias',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="money" color={color} />,
        }}
      />
    </Tabs>
  );
}
