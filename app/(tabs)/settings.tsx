import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '../../hooks/useSettings';

export default function SettingsScreen() {
  const { focusTimeTotal, breakTimeTotal, loadSettings, saveSettings } = useSettings();
  const [focusTime, setFocusTime] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Load and set initial local state
    loadSettings().then((settings) => {
      setFocusTime(String(settings.focusTimeTotal / 60));
      setBreakTime(String(settings.breakTimeTotal / 60));
    });
  }, [loadSettings]);

  const handleSave = async () => {
    const success = await saveSettings(focusTime, breakTime);
    if (success) {
      setSaveMessage('Settings Saved!');
      setTimeout(() => {
        setSaveMessage('');
        router.navigate('/');
      }, 500); 
    } else {
      setSaveMessage('Error saving.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Focus Time (Minutes)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={focusTime}
          onChangeText={setFocusTime}
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Break Time (Minutes)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={breakTime}
          onChangeText={setBreakTime}
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      {saveMessage ? <Text style={styles.saveMessage}>{saveMessage}</Text> : null}

      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          Focus Timer v1.0{'\n'}
          Pomodoro Technique inspired.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    fontSize: 18,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  saveButton: {
    backgroundColor: '#4ECCA3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    boxShadow: '0px 4px 8px rgba(78, 204, 163, 0.3)',
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveMessage: {
    color: '#4ECCA3',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    marginTop: 'auto',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
});
