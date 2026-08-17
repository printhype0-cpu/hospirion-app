import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Shadows, BorderRadius, Spacing, FontSize, FontWeight } from '../lib/theme';
import { mockConversations, mockMessages } from '../lib/data';
import { Conversation, Message } from '../lib/types';
import SearchBar from '../components/SearchBar';

export default function MessagesScreen({ navigation }: { navigation: any }) {
  const [search, setSearch] = useState('');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const filteredConversations = mockConversations.filter(c => c.participantName.toLowerCase().includes(search.toLowerCase()));

  const sendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg: Message = { id: `M${messages.length + 1}`, senderId: 'me', senderName: 'Me', senderRole: 'admin', content: messageText, timestamp: 'Just now', read: true, conversationId: activeConversation?.id || 'C1' };
    setMessages([...messages, newMsg]);
    setMessageText('');
  };

  if (activeConversation) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setActiveConversation(null)} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
            <View style={styles.chatHeaderInfo}>
              <View style={styles.chatAvatar}><Text style={styles.chatAvatarText}>{activeConversation.participantName.split(' ').map(n => n[0]).join('').slice(0, 2)}</Text></View>
              <View><Text style={styles.chatName}>{activeConversation.participantName}</Text><Text style={[styles.chatStatus, { color: activeConversation.online ? colors.success : colors.gray400 }]}>{activeConversation.online ? 'Online' : 'Offline'}</Text></View>
            </View>
          </View>
          <FlatList data={messages} renderItem={({ item }) => (<View style={[styles.messageBubble, item.senderId === 'me' ? styles.myMessage : styles.theirMessage]}><Text style={[styles.messageText, item.senderId === 'me' && styles.myMessageText]}>{item.content}</Text><Text style={[styles.messageTime, item.senderId === 'me' && styles.myMessageTime]}>{item.timestamp}</Text></View>)} keyExtractor={item => item.id} contentContainerStyle={styles.messagesList} showsVerticalScrollIndicator={false} />
          <View style={styles.inputContainer}>
            <TextInput style={styles.messageInput} value={messageText} onChangeText={setMessageText} placeholder="Type a message..." placeholderTextColor={colors.gray400} multiline />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}><Ionicons name="send" size={20} color={colors.white} /></TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  const renderConversation = ({ item }: { item: Conversation }) => (
    <TouchableOpacity style={styles.conversationCard} onPress={() => setActiveConversation(item)} activeOpacity={0.7}>
      <View style={styles.convAvatarContainer}>
        <View style={styles.convAvatar}><Text style={styles.convAvatarText}>{item.participantName.split(' ').map(n => n[0]).join('').slice(0, 2)}</Text></View>
        {item.online && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.convContent}>
        <View style={styles.convTopRow}><Text style={styles.convName}>{item.participantName}</Text><Text style={styles.convTime}>{item.lastMessageTime}</Text></View>
        <View style={styles.convBottomRow}>
          <Text style={styles.convLastMsg} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unreadCount > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadBadgeText}>{item.unreadCount}</Text></View>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity><Ionicons name="create-outline" size={24} color={colors.primary} /></TouchableOpacity>
      </View>
      <View style={styles.searchSection}><SearchBar value={search} onChangeText={setSearch} placeholder="Search messages..." /></View>
      <FlatList data={filteredConversations} renderItem={renderConversation} keyExtractor={item => item.id} contentContainerStyle={styles.list} showsVerticalScrollIndicator={false} />
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  backBtn: { padding: Spacing.xs },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.text },
  searchSection: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.md },
  list: { padding: Spacing.xl, paddingTop: 0 },
  conversationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm, borderWidth: 1, borderColor: colors.cardBorder },
  convAvatarContainer: { position: 'relative', marginRight: Spacing.md },
  convAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primaryBg, alignItems: 'center', justifyContent: 'center' },
  convAvatarText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: colors.primary },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.success, borderWidth: 2, borderColor: colors.surface },
  convContent: { flex: 1 },
  convTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  convName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  convTime: { fontSize: FontSize.xs, color: colors.gray400 },
  convBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  convLastMsg: { fontSize: FontSize.sm, color: colors.textSecondary, flex: 1 },
  unreadBadge: { backgroundColor: colors.primary, borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, marginLeft: Spacing.sm },
  unreadBadgeText: { fontSize: FontSize.xs, color: colors.white, fontWeight: FontWeight.bold },
  chatContainer: { flex: 1 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, backgroundColor: colors.headerBg, borderBottomWidth: 1, borderBottomColor: colors.border },
  chatHeaderInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: Spacing.sm },
  chatAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryBg, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  chatAvatarText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: colors.primary },
  chatName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: colors.text },
  chatStatus: { fontSize: FontSize.xs },
  messagesList: { padding: Spacing.xl, paddingBottom: Spacing.xxl },
  messageBubble: { maxWidth: '80%', padding: Spacing.md, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm },
  myMessage: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.cardBorder, borderBottomLeftRadius: 4 },
  messageText: { fontSize: FontSize.sm, lineHeight: 20, color: colors.text },
  myMessageText: { color: colors.white },
  messageTime: { fontSize: FontSize.xs, marginTop: 4, color: colors.gray400 },
  myMessageTime: { color: 'rgba(255,255,255,0.7)', textAlign: 'right' },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: Spacing.lg, backgroundColor: colors.headerBg, borderTopWidth: 1, borderTopColor: colors.border },
  messageInput: { flex: 1, backgroundColor: colors.inputBg, borderRadius: BorderRadius.lg, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, fontSize: FontSize.md, maxHeight: 100, color: colors.text },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: Spacing.sm },
});
