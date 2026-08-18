import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';

interface AIMessage { id: string; role: 'user' | 'assistant'; content: string; timestamp: string; }

const initialMessages: AIMessage[] = [
  { id: '1', role: 'assistant', content: 'Hello! I\'m your AI Receptionist assistant. I can help you with:\n\n• Scheduling appointments\n• Answering patient queries\n• Finding available doctors\n• Checking appointment status\n\nHow can I help you today?', timestamp: '10:00 AM' },
];

const quickActions = [
  { label: 'Schedule Appointment', icon: 'calendar' as const },
  { label: 'Check Availability', icon: 'search' as const },
  { label: 'Patient Registration', icon: 'person-add' as const },
  { label: 'View Today\'s Schedule', icon: 'list' as const },
];

export default function AIReceptionistScreen({ navigation }: { navigation: any }) {
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const sendMessage = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;
    const userMsg: AIMessage = { id: `msg-${messages.length + 1}`, role: 'user', content: messageText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setTimeout(() => {
      let response = 'I understand your query. Let me help you with that. Based on our hospital system, I can assist with scheduling, patient information, doctor availability, and more. Could you provide more specific details?';
      const lower = messageText.toLowerCase();
      if (lower.includes('schedule') || lower.includes('appointment')) response = 'I can help you schedule an appointment. Here are the available slots for today:\n\n📅 Dr. Michael Chen (Cardiology)\n  • 2:00 PM - Available\n  • 3:30 PM - Available\n\n📅 Dr. Emily Roberts (Neurology)\n  • 1:00 PM - Available\n\nWhich doctor and time would you prefer?';
      else if (lower.includes('available') || lower.includes('doctor')) response = 'Here are the currently available doctors:\n\n✅ Dr. Michael Chen - Cardiology\n✅ Dr. Emily Roberts - Neurology\n✅ Dr. James Park - Pediatrics\n\n❌ Dr. Sarah Kim - In Surgery\n\nWould you like to book with any of the available doctors?';
      else if (lower.includes('today') || lower.includes('schedule')) response = 'Today\'s Schedule Summary:\n\n📊 Total Appointments: 48\n✅ Completed: 12\n🔄 In Progress: 3\n⏰ Upcoming: 28\n❌ Cancelled: 5\n\nNext appointment: Sarah Johnson at 2:00 PM with Dr. Chen.';
      const aiMsg: AIMessage = { id: `msg-${messages.length + 2}`, role: 'assistant', content: response, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: AIMessage }) => (
    <View style={[styles.messageBubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
      {item.role === 'assistant' && <View style={styles.aiAvatar}><Ionicons name="sparkles" size={16} color={colors.accent} /></View>}
      <View style={[styles.messageContent, item.role === 'user' ? styles.userContent : styles.aiContent]}>
        <Text style={[styles.messageText, item.role === 'user' && styles.userText]}>{item.content}</Text>
        <Text style={[styles.timestamp, item.role === 'user' && styles.userTimestamp]}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <View style={styles.headerInfo}><Text style={styles.headerTitle}>AI Receptionist</Text><View style={styles.onlineIndicator}><View style={styles.onlineDot} /><Text style={styles.onlineText}>Online • Powered by OpenAI</Text></View></View>
        <View style={{ width: 40 }} />
      </View>
      <KeyboardAvoidingView style={styles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList data={messages} renderItem={renderMessage} keyExtractor={item => item.id} contentContainerStyle={styles.messagesList} showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={styles.quickActions}>{quickActions.map((action, index) => (<TouchableOpacity key={index} style={styles.quickActionBtn} onPress={() => sendMessage(action.label)}><Ionicons name={action.icon} size={14} color={colors.accent} /><Text style={styles.quickActionText}>{action.label}</Text></TouchableOpacity>))}</View>}
        />
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={inputText} onChangeText={setInputText} placeholder="Ask the AI assistant..." placeholderTextColor={colors.gray400} multiline />
          <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage()}><Ionicons name="send" size={20} color={colors.white} /></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.headerBg, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: Spacing.xs },
  headerInfo: { flex: 1, marginLeft: Spacing.sm },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: colors.text },
  onlineIndicator: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success, marginRight: 4 },
  onlineText: { fontSize: FontSize.xs, color: colors.success },
  chatContainer: { flex: 1 },
  messagesList: { padding: Spacing.xl },
  messageBubble: { flexDirection: 'row', marginBottom: Spacing.md },
  userBubble: { justifyContent: 'flex-end' },
  aiBubble: { justifyContent: 'flex-start' },
  aiAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
  messageContent: { maxWidth: '80%', padding: Spacing.md, borderRadius: BorderRadius.lg },
  userContent: { backgroundColor: colors.accent, borderBottomRightRadius: 4 },
  aiContent: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.cardBorder, borderBottomLeftRadius: 4 },
  messageText: { fontSize: FontSize.sm, lineHeight: 20, color: colors.text },
  userText: { color: colors.white },
  timestamp: { fontSize: FontSize.xs, marginTop: 4, color: colors.gray400 },
  userTimestamp: { color: 'rgba(255,255,255,0.7)', textAlign: 'right' },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: Spacing.md },
  quickActionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full, borderWidth: 1, borderColor: colors.accent, gap: 4 },
  quickActionText: { fontSize: FontSize.xs, color: colors.accent, fontWeight: FontWeight.medium },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: Spacing.lg, backgroundColor: colors.headerBg, borderTopWidth: 1, borderTopColor: colors.border },
  input: { flex: 1, backgroundColor: colors.inputBg, borderRadius: BorderRadius.lg, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, fontSize: FontSize.md, maxHeight: 100, color: colors.text },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginLeft: Spacing.sm },
});
