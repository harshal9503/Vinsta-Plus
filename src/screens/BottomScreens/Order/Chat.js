// File: screens/Chat.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColor } from '../../../util/ColorSwitcher';

const { width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;

const Chat = () => {
  const navigation = useNavigation();
  const { bgColor } = useColor();
  const scrollViewRef = useRef(null);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm on my way with your order. I'll reach in about 10 minutes.",
      time: '10:55 AM',
      isUser: false,
    },
    {
      id: 2,
      text: 'Okay, thanks for the update!',
      time: '10:56 AM',
      isUser: true,
    },
    {
      id: 3,
      text: 'Could you please share your exact location?',
      time: '10:57 AM',
      isUser: false,
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: "Sure, I'll be waiting at the main gate.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
      };
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: bgColor, paddingTop: STATUS_BAR_HEIGHT + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.agentName}>Mann Sharma</Text>
          <Text style={styles.agentStatus}>Delivery Partner • Online</Text>
        </View>

        <TouchableOpacity style={styles.callButton}>
          <Image source={require('../../../assets/call.png')} style={styles.callIcon} />
        </TouchableOpacity>
      </View>

      {/* CHAT */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.isUser
                  ? [styles.userBubble, { backgroundColor: bgColor }]
                  : styles.agentBubble,
              ]}
            >
              <Text style={[styles.messageText, msg.isUser && styles.userText]}>
                {msg.text}
              </Text>
              <Text style={[styles.messageTime, msg.isUser && styles.userTime]}>
                {msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* INPUT */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: message.trim() ? bgColor : '#ccc' },
            ]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Image
              source={require('../../../assets/send.png')}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: { padding: 5 },
  backIcon: { width: 22, height: 22, tintColor: '#fff' },
  headerInfo: { flex: 1, marginLeft: 15 },
  agentName: { color: '#fff', fontSize: 16, fontWeight: '700' },
  agentStatus: { color: '#fff', fontSize: 12, marginTop: 2 },
  callButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  callIcon: { width: 20, height: 20, tintColor: '#fff' },

  chatContainer: { flex: 1 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 20, paddingBottom: 10 },

  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 15,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  agentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 5,
  },
  messageText: { fontSize: 14, lineHeight: 20, color: '#000' },
  userText: { color: '#fff' },
  messageTime: { fontSize: 10, marginTop: 5, opacity: 0.7 },
  userTime: { color: '#fff', textAlign: 'right' },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    maxHeight: 100,
    marginRight: 10,
    fontSize: 14,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: { width: 20, height: 20, tintColor: '#fff' },
});
