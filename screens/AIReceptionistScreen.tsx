import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Spacing, FontSize, FontWeight, BorderRadius } from '../lib/theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function AIReceptionistScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I am Hospirion AI, your virtual receptionist. How can I assist you today?', sender: 'ai', timestamp: '09:00 AM' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I've received your request and am processing it. Since I'm a demo AI, I can't book anything real yet!",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>AI Receptionist</Text>
        <TouchableOpacity onPress={() => setMessages([{ id: '1', text: 'Hello! How can I assist you?', sender: 'ai', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])}>
          <Ionicons name="refresh" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.chatContainer} showsVerticalScrollIndicator={false}>
          {messages.map(msg => (
            <View key={msg.id} style={[styles.messageWrapper, msg.sender === 'user' ? styles.messageUser : styles.messageAi]}>
              <View style={[styles.bubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAi]}>
                <Text style={[styles.messageText, msg.sender === 'user' ? styles.textUser : styles.textAi]}>{msg.text}</Text>
              </View>
              <Text style={styles.timestamp}>{msg.timestamp}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput 
            style={styles.input} 
            value={input} 
            onChangeText={setInput} 
            placeholder="Type your message..." 
            placeholderTextColor={colors.gray400}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Ionicons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: Spacing.xs },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  chatContainer: { padding: Spacing.xl, flexGrow: 1, justifyContent: 'flex-end' },
  messageWrapper: { marginBottom: Spacing.lg, maxWidth: '80%' },
  messageUser: { alignSelf: 'flex-end' },
  messageAi: { alignSelf: 'flex-start' },
  bubble: { padding: Spacing.md, borderRadius: BorderRadius.lg },
  bubbleUser: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleAi: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderBottomLeftRadius: 4 },
  messageText: { fontSize: FontSize.md, lineHeight: 20 },
  textUser: { color: colors.white },
  textAi: { color: colors.text },
  timestamp: { fontSize: FontSize.xs, color: colors.gray400, marginTop: 4, alignSelf: 'flex-end' },
  inputArea: { flexDirection: 'row', padding: Spacing.md, paddingBottom: Spacing.xl, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center' },
  input: { flex: 1, backgroundColor: colors.background, borderRadius: BorderRadius.full, paddingHorizontal: Spacing.lg, height: 48, fontSize: FontSize.md, color: colors.text, borderWidth: 1, borderColor: colors.border, marginRight: Spacing.md },
  sendBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
