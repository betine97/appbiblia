import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'aprender', title: 'APRENDER', icon: 'book-outline', active: true },
  { id: 'trilhas', title: 'TRILHAS', icon: 'trail-sign-outline' },
  { id: 'jornada', title: 'JORNADA', icon: 'map-outline' },
  { id: 'praticar', title: 'PRATICAR', icon: 'fitness-outline' },
  { id: 'conhecimento', title: 'CONHECIMENTO', icon: 'bulb-outline' },
  { id: 'testamentos', title: 'TESTAMENTOS', icon: 'library-outline' },
  { id: 'versiculos', title: 'VERSÍCULOS', icon: 'heart-outline' },
  { id: 'reflexoes', title: 'REFLEXÕES', icon: 'chatbubble-outline' },
  { id: 'celulas', title: 'CÉLULAS', icon: 'people-outline' },
  { id: 'ligas', title: 'LIGAS', icon: 'trophy-outline' },
  { id: 'feed', title: 'FEED SOCIAL', icon: 'newspaper-outline' },
  { id: 'eucristao', title: 'EU CRISTÃO', icon: 'person-outline' },
  { id: 'perfil', title: 'PERFIL', icon: 'person-circle-outline' },
];

export function Sidebar({ visible, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.sidebar}>
        <ScrollView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>shalom</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menu}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, item.active && styles.menuItemActive]}
                onPress={() => {}}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={20} 
                  color={item.active ? '#1f2937' : '#6b7280'} 
                />
                <Text style={[styles.menuText, item.active && styles.menuTextActive]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>SAIR DA CONTA</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: 280,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  menu: {
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: '#f3f4f6',
    borderRightWidth: 3,
    borderRightColor: '#3b82f6',
  },
  menuText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  menuTextActive: {
    color: '#1f2937',
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  logoutText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
  },
});