import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors, Spacing } from '@/shared/constants/theme';
import { ScriptureCategory, ShlokaItem, Translation } from '@/features/scriptures/types/scripture.types';
import {
  getAllScriptures,
  getScripturesByCategory,
  searchScriptures,
} from '@/features/scriptures/services/scripture-service';

export const ScriptureLibraryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ScriptureCategory | 'all'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');

  const filteredItems = useMemo(() => {
    let items: ShlokaItem[] = [];
    if (searchQuery.trim()) {
      items = searchScriptures(searchQuery);
      if (selectedCategory !== 'all') {
        items = items.filter((item) => item.category === selectedCategory);
      }
    } else if (selectedCategory === 'all') {
      items = getAllScriptures();
    } else {
      items = getScripturesByCategory(selectedCategory);
    }
    return items;
  }, [searchQuery, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />

      {/* Top Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📖 Shlokas & Scripture Library</Text>

        {/* Language Switcher Toggle */}
        <View style={styles.langToggleRow}>
          <Pressable
            onPress={() => setSelectedLanguage('en')}
            style={[
              styles.langChip,
              selectedLanguage === 'en' && styles.langChipActive,
            ]}>
            <Text
              style={[
                styles.langChipText,
                selectedLanguage === 'en' && styles.langChipTextActive,
              ]}>
              English
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedLanguage('hi')}
            style={[
              styles.langChip,
              selectedLanguage === 'hi' && styles.langChipActive,
            ]}>
            <Text
              style={[
                styles.langChipText,
                selectedLanguage === 'hi' && styles.langChipTextActive,
              ]}>
              हिन्दी
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Gita, Stotras, Mantras..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Navigation Pills */}
      <View style={styles.categoriesBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          <Pressable
            onPress={() => setSelectedCategory('all')}
            style={[
              styles.categoryPill,
              selectedCategory === 'all' && styles.categoryPillActive,
            ]}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === 'all' && styles.categoryTextActive,
              ]}>
              All Scriptures
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedCategory('gita')}
            style={[
              styles.categoryPill,
              selectedCategory === 'gita' && styles.categoryPillActive,
            ]}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === 'gita' && styles.categoryTextActive,
              ]}>
              Bhagavad Gita
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedCategory('stotra')}
            style={[
              styles.categoryPill,
              selectedCategory === 'stotra' && styles.categoryPillActive,
            ]}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === 'stotra' && styles.categoryTextActive,
              ]}>
              Stotras
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSelectedCategory('mantra')}
            style={[
              styles.categoryPill,
              selectedCategory === 'mantra' && styles.categoryPillActive,
            ]}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === 'mantra' && styles.categoryTextActive,
              ]}>
              Veda Mantras
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Shlokas List */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => {
          const translation =
            item.translations.find((t: Translation) => t.language === selectedLanguage) ||
            item.translations[0];

          return (
            <View key={item.id} style={styles.shlokaCard}>
              <View style={styles.shlokaCardHeader}>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{item.category.toUpperCase()}</Text>
                </View>
                <Text style={styles.sourceText}>{item.source}</Text>
              </View>

              <Text style={styles.shlokaTitle}>
                {selectedLanguage === 'hi' ? item.title.sanskrit : item.title.english}
              </Text>

              {/* Sanskrit Text */}
              <View style={styles.sanskritBox}>
                <Text style={styles.sanskritText}>{item.sanskrit_text}</Text>
              </View>

              {/* IAST Transliteration */}
              <View style={styles.iastBox}>
                <Text style={styles.iastText}>{item.iast_transliteration}</Text>
              </View>

              {/* Translation */}
              <View style={styles.translationBox}>
                <Text style={styles.translationLabel}>
                  Translation ({translation.author}):
                </Text>
                <Text style={styles.translationText}>{translation.text}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: '#FFF8F2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.navyDark,
  },
  langToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#EDE7DA',
    borderRadius: 20,
    padding: 2,
  },
  langChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  langChipActive: {
    backgroundColor: Colors.saffron,
  },
  langChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  langChipTextActive: {
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: Spacing.three,
    marginBottom: Spacing.two,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.navyDark,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoriesBar: {
    marginBottom: Spacing.two,
  },
  categoryScroll: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.one,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryPillActive: {
    backgroundColor: Colors.navyDark,
    borderColor: Colors.navyDark,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: Spacing.three,
    paddingBottom: Spacing.six,
  },
  shlokaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.three,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  shlokaCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  categoryTag: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.saffronDark,
    letterSpacing: 0.5,
  },
  sourceText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  shlokaTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.navyDark,
    marginBottom: Spacing.two,
  },
  sanskritBox: {
    backgroundColor: '#FFF8F2',
    borderLeftWidth: 4,
    borderLeftColor: Colors.saffron,
    padding: Spacing.two,
    borderRadius: 8,
    marginBottom: Spacing.two,
  },
  sanskritText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1C1917',
    lineHeight: 28,
  },
  iastBox: {
    marginBottom: Spacing.two,
  },
  iastText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#475569',
    lineHeight: 20,
  },
  translationBox: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: Spacing.two,
  },
  translationLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  translationText: {
    fontSize: 13,
    color: Colors.navyDark,
    lineHeight: 20,
  },
});
