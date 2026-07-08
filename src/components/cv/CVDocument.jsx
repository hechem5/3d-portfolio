import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register standard premium fonts for rendering (Requires remote fetching in production, using standard Helvetica for robust fallback)
// Font.register({ family: 'Open Sans', src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    fontFamily: 'Helvetica',
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#0F0920', // Dark premium background matching site
    color: '#FFFFFF',
    padding: 30,
    display: 'flex',
    flexDirection: 'column'
  },
  rightColumn: {
    width: '65%',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  role: {
    fontSize: 14,
    color: '#00E5FF', // Teal highlight
    marginBottom: 30,
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  sectionTitleLeft: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottom: '1px solid #5227FF',
    paddingBottom: 5,
    letterSpacing: 1
  },
  sectionTitleRight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F0920',
    marginBottom: 15,
    textTransform: 'uppercase',
    borderBottom: '2px solid #5227FF',
    paddingBottom: 5,
    letterSpacing: 1
  },
  skillPill: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    border: '1px solid #00E5FF',
    borderRadius: 4,
    padding: '4px 8px',
    marginBottom: 8,
    marginRight: 8,
    fontSize: 10,
    color: '#00E5FF'
  },
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  },
  itemBlock: {
    marginBottom: 15
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F0920'
  },
  itemSubtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 2
  },
  itemCompany: {
    fontSize: 11,
    color: '#5227FF',
    fontWeight: 'bold'
  },
  itemDate: {
    fontSize: 10,
    color: '#888888',
    fontStyle: 'italic'
  },
  itemText: {
    fontSize: 10,
    color: '#444444',
    lineHeight: 1.5,
    marginBottom: 3
  },
  contactText: {
    fontSize: 10,
    color: '#CCCCCC',
    marginBottom: 5
  }
});

export const CVDocument = ({ data }) => {
  const safeData = data || { name: '', role: '', skills: [], experience: [], education: [] };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* LEFT COLUMN - DARK */}
        <View style={styles.leftColumn}>
          <Text style={styles.name}>{safeData.name || 'Hechem Klai'}</Text>
          <Text style={styles.role}>{safeData.role || 'Full Stack Developer'}</Text>

          <Text style={styles.sectionTitleLeft}>Contact</Text>
          <Text style={styles.contactText}>{safeData.email || 'hechem.klai@gmail.com'}</Text>
          <Text style={styles.contactText}>Tunisia</Text>

          {safeData.skills && safeData.skills.length > 0 && (
            <View>
              <Text style={styles.sectionTitleLeft}>Skills</Text>
              <View style={styles.skillsContainer}>
                {safeData.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillPill}>{skill}</Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* RIGHT COLUMN - LIGHT */}
        <View style={styles.rightColumn}>
          
          {/* EXPERIENCE */}
          {safeData.experience && safeData.experience.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionTitleRight}>Professional Experience</Text>
              {safeData.experience.map((exp, i) => (
                <View key={i} style={styles.itemBlock}>
                  <Text style={styles.itemTitle}>{exp.title}</Text>
                  <View style={styles.itemSubtitleContainer}>
                    <Text style={styles.itemCompany}>{exp.company}</Text>
                    <Text style={styles.itemDate}>{exp.date}</Text>
                  </View>
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
              <Text style={styles.sectionTitleRight}>Education</Text>
              {safeData.education.map((edu, i) => (
                <View key={i} style={styles.itemBlock}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <View style={styles.itemSubtitleContainer}>
                    <Text style={styles.itemCompany}>{edu.school}</Text>
                    <Text style={styles.itemDate}>{edu.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          
        </View>

      </Page>
    </Document>
  );
};
