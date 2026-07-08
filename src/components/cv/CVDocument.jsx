import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// We can define custom fonts if needed, but for simplicity we'll use standard fonts first
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #5227FF',
    paddingBottom: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5
  },
  role: {
    fontSize: 14,
    color: '#5227FF',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5227FF',
    marginTop: 15,
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  itemBlock: {
    marginBottom: 10
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000'
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 4
  },
  itemText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4
  },
  skillsList: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5
  }
});

export const CVDocument = ({ data }) => {
  // Defensive checks in case data isn't perfectly structured yet
  const safeData = data || { name: 'Hechem Klai', role: 'Full Stack Developer', skills: [], experience: [], education: [] };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{safeData.name || 'Hechem Klai'}</Text>
          <Text style={styles.role}>{safeData.role || 'Full Stack Developer'}</Text>
        </View>

        {/* EXPERIENCE */}
        {safeData.experience && safeData.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {safeData.experience.map((exp, i) => (
              <View key={i} style={styles.itemBlock}>
                <Text style={styles.itemTitle}>{exp.title}</Text>
                <Text style={styles.itemSubtitle}>{exp.company} | {exp.date}</Text>
                {exp.points && exp.points.map((pt, j) => (
                  <Text key={j} style={styles.itemText}>• {pt}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {safeData.education && safeData.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {safeData.education.map((edu, i) => (
              <View key={i} style={styles.itemBlock}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemSubtitle}>{edu.school} | {edu.date}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {safeData.skills && safeData.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsList}>
              {safeData.skills.join(' • ')}
            </Text>
          </View>
        )}

      </Page>
    </Document>
  );
};
