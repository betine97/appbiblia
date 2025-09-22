import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bibleData, bibleBooks } from '../../data/bible';

export default function BibliaScreen() {
  const [selectedBook, setSelectedBook] = useState('Gênesis');
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [showBookModal, setShowBookModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [selectedTestament, setSelectedTestament] = useState<'antigoTestamento' | 'novoTestamento'>('antigoTestamento');
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showVerseModal, setShowVerseModal] = useState(false);

  const getCurrentBook = () => {
    const allBooks = [...bibleBooks.antigoTestamento, ...bibleBooks.novoTestamento];
    return allBooks.find(book => book.name === selectedBook) || bibleBooks.antigoTestamento[0];
  };

  const getChapters = () => {
    if (selectedBook === 'Gênesis') {
      // Para Gênesis, vamos simular até 15 capítulos
      return Array.from({ length: 15 }, (_, i) => (i + 1).toString());
    }
    const book = getCurrentBook();
    return Array.from({ length: book.chapters }, (_, i) => (i + 1).toString());
  };

  const getCurrentVerses = () => {
    if (selectedBook === 'Gênesis' && bibleData.chapters[selectedChapter]) {
      const chapterData = bibleData.chapters[selectedChapter];
      return Object.entries(chapterData).map(([number, text]) => ({
        number: parseInt(number),
        text
      }));
    }
    // Para outros capítulos que não temos dados, mostrar uma mensagem
    if (selectedBook === 'Gênesis' && parseInt(selectedChapter) > 2) {
      return [{
        number: 1,
        text: `Conteúdo do capítulo ${selectedChapter} de ${selectedBook} será adicionado em breve.`
      }];
    }
    return [];
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.bookSelector}
          onPress={() => setShowBookModal(true)}
        >
          <Text style={styles.bookName}>{selectedBook}</Text>
          <Ionicons name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.chapterSelector}
          onPress={() => setShowChapterModal(true)}
        >
          <Text style={styles.chapterNumber}>{selectedChapter}</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título do Capítulo */}
        <View style={styles.chapterHeader}>
          <Text style={styles.chapterTitle}>{selectedBook} {selectedChapter}</Text>
          <View style={styles.titleUnderline} />
        </View>

        {/* Versículos */}
        <View style={styles.versesContainer}>
          {getCurrentVerses().map((verse) => (
            <TouchableOpacity 
              key={verse.number} 
              style={styles.verseContainer}
              onPress={() => {
                setSelectedVerse(verse.number);
                setShowVerseModal(true);
              }}
            >
              <Text style={styles.verseNumber}>{verse.number}</Text>
              <Text style={[
                styles.verseText,
                selectedVerse === verse.number && styles.verseTextSelected
              ]}>{verse.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal de Seleção de Livros - Lateral Esquerda */}
      <Modal
        visible={showBookModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            onPress={() => setShowBookModal(false)}
          />
          <View style={styles.leftSideModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Livros da Bíblia</Text>
              <TouchableOpacity onPress={() => setShowBookModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Filtro de Testamento */}
            <View style={styles.testamentFilter}>
              <TouchableOpacity
                style={styles.testamentToggle}
                onPress={() => setSelectedTestament(
                  selectedTestament === 'antigoTestamento' ? 'novoTestamento' : 'antigoTestamento'
                )}
              >
                <Text style={styles.testamentToggleText}>
                  {selectedTestament === 'antigoTestamento' ? 'Antigo Testamento' : 'Novo Testamento'}
                </Text>
                <Ionicons name="swap-horizontal" size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Lista de Livros */}
            <ScrollView style={styles.booksList}>
              {bibleBooks[selectedTestament].map((book) => (
                <TouchableOpacity
                  key={book.name}
                  style={styles.bookItem}
                  onPress={() => {
                    setSelectedBook(book.name);
                    setSelectedChapter('1');
                    setShowBookModal(false);
                  }}
                >
                  <Text style={[
                    styles.bookItemText,
                    selectedBook === book.name && styles.bookItemTextActive
                  ]}>{book.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de Seleção de Capítulos - Lateral Direita */}
      <Modal
        visible={showChapterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowChapterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            onPress={() => setShowChapterModal(false)}
          />
          <View style={styles.rightSideModal}>

            <ScrollView style={styles.chaptersList}>
              {getChapters().map((chapter) => (
                <TouchableOpacity
                  key={chapter}
                  style={styles.chapterItemCompact}
                  onPress={() => {
                    setSelectedChapter(chapter);
                    setShowChapterModal(false);
                  }}
                >
                  <Text style={[
                    styles.chapterItemCompactText,
                    selectedChapter === chapter && styles.chapterItemCompactTextActive
                  ]}>
                    {chapter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de Ações do Versículo */}
      <Modal
        visible={showVerseModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowVerseModal(false)}
      >
        <View style={styles.verseModalOverlay}>
          <TouchableOpacity 
            style={styles.verseModalBackdrop} 
            onPress={() => setShowVerseModal(false)}
          />
          <View style={styles.verseModalContent}>
            <View style={styles.verseModalHeader}>
              <Text style={styles.verseModalTitle}>
                Selecionado: {selectedBook} {selectedChapter}:{selectedVerse}
              </Text>
            </View>
            
            <View style={styles.verseActions}>
              <TouchableOpacity style={styles.verseAction}>
                <Ionicons name="copy-outline" size={24} color="#374151" />
                <Text style={styles.verseActionText}>Salvar Passagem</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.verseAction}>
                <Ionicons name="share-outline" size={24} color="#374151" />
                <Text style={styles.verseActionText}>Compartilhar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.verseAction}>
                <Ionicons name="color-palette-outline" size={24} color="#374151" />
                <Text style={styles.verseActionText}>Grifar Passagem</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.verseAction}>
                <Ionicons name="help-circle-outline" size={24} color="#374151" />
                <Text style={styles.verseActionText}>Explicar Passagem</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.colorPalette}>
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#93C5FD' }]} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FDE68A' }]} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FCA5A5' }]} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#86EFAC' }]} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#F0ABFC' }]} />
              <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#C4B5FD' }]} />
              <TouchableOpacity style={[styles.colorOption, styles.colorOptionClear]}>
                <Ionicons name="close" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  bookSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  chapterSelector: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  chapterNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chapterHeader: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: '#1CB0F6',
  },
  versesContainer: {
    paddingBottom: 40,
    marginTop: 20,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  verseNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1CB0F6',
    marginRight: 8,
    marginTop: 2,
    minWidth: 20,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    flex: 1,
  },
  leftSideModal: {
    backgroundColor: '#ffffff',
    width: '80%',
    maxWidth: 320,
    paddingBottom: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  rightSideModal: {
    backgroundColor: '#ffffff',
    width: 80,
    paddingBottom: 20,
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalHeaderCompact: {
    display: 'none',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  testamentFilter: {
    padding: 20,
  },
  testamentToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  testamentToggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  booksList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  bookItemText: {
    fontSize: 16,
    color: '#64748b',
  },
  bookItemTextActive: {
    color: '#374151',
    fontWeight: '700',
  },
  chaptersList: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 20,
  },
  chapterItemCompact: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  chapterItemCompactText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  chapterItemCompactTextActive: {
    color: '#374151',
    fontWeight: '700',
  },
  verseTextSelected: {
    textDecorationLine: 'underline',
    backgroundColor: '#F3F4F6',
  },
  verseModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  verseModalBackdrop: {
    flex: 1,
  },
  verseModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    minHeight: 300,
  },
  verseModalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  verseModalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  verseActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  verseAction: {
    alignItems: 'center',
    flex: 1,
  },
  verseActionText: {
    fontSize: 12,
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  colorOptionClear: {
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});