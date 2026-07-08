import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Use standard Helvetica for this exact match, as it closely resembles the provided PDF's clean sans-serif.
// A deep professional navy blue color from the screenshot
const PRIMARY_BLUE = '#1A3A73'; 

const styles = StyleSheet.create({
  page: {
    padding: '30px 40px', // Standard resume padding
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  
  // HEADER
  headerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerRole: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 4,
  },
  headerContact: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 2,
  },
  headerLanguages: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 8,
  },
  headerLine: {
    borderBottomWidth: 1.5,
    borderBottomColor: PRIMARY_BLUE,
    marginBottom: 10,
  },

  // SECTION TITLES
  sectionTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_BLUE,
    marginBottom: 8,
    marginTop: 12,
    paddingBottom: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: PRIMARY_BLUE,
    textTransform: 'uppercase',
  },

  // SUMMARY
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#000000',
    textAlign: 'justify'
  },

  // SKILLS
  skillRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  skillCategory: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#000000',
  },
  skillList: {
    fontSize: 9.5,
    color: '#000000',
  },

  // ITEMS (Projects, Experience, Education)
  itemBlock: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  itemTitleLeft: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1, // take remaining space
  },
  itemTitleRight: {
    fontSize: 9.5,
    color: '#000000',
    textAlign: 'right',
  },
  itemSubtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemSubtitleLeft: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#333333',
  },
  itemSubtitleRight: {
    fontSize: 9.5,
    color: '#000000',
    textAlign: 'right',
  },
  
  // BULLET POINTS
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 10,
    fontSize: 9.5,
    color: '#000000',
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.3,
    color: '#000000',
  }
});

export const CVDocument = ({ data }) => {
  const d = data || {};

  // Helper to format contact string
  const contactParts = [];
  if (d.location) contactParts.push(d.location);
  if (d.phone) contactParts.push(d.phone);
  if (d.email) contactParts.push(d.email);
  if (d.linkedin) contactParts.push(d.linkedin.replace(/^https?:\/\//, ''));
  const contactString = contactParts.join(' | ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View>
          <Text style={styles.headerName}>{d.name || 'HECHEM KLAI'}</Text>
          <Text style={styles.headerRole}>{d.role || 'Full Stack Developer'}</Text>
          {contactString && <Text style={styles.headerContact}>{contactString}</Text>}
          {d.languages && <Text style={styles.headerLanguages}>{d.languages}</Text>}
          <View style={styles.headerLine} />
        </View>

        {/* SUMMARY */}
        {d.summary && (
          <View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>SUMMARY</Text>
            </View>
            <Text style={styles.summaryText}>{d.summary}</Text>
          </View>
        )}

        {/* TECHNICAL SKILLS */}
        {d.skills && d.skills.length > 0 && (
          <View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
            </View>
            {d.skills.map((skillString, i) => {
              // Assumes format "Category: Skill 1, Skill 2"
              const parts = skillString.split(':');
              if (parts.length > 1) {
                return (
                  <View key={i} style={styles.skillRow}>
                    <Text style={styles.skillCategory}>{parts[0]}:</Text>
                    <Text style={styles.skillList}> {parts.slice(1).join(':').trim()}</Text>
                  </View>
                );
              }
              // Fallback if no colon
              return (
                <View key={i} style={styles.skillRow}>
                  <Text style={styles.skillList}>• {skillString}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* KEY PROJECT */}
        {d.keyProjects && d.keyProjects.length > 0 && (
          <View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>KEY PROJECT</Text>
            </View>
            {d.keyProjects.map((proj, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitleLeft}>{proj.title}</Text>
                  <Text style={styles.itemTitleRight}>{proj.subtitle}</Text>
                </View>
                {(proj.location || proj.date) && (
                  <View style={styles.itemSubtitleContainer}>
                    <Text style={styles.itemSubtitleLeft}></Text>
                    <Text style={styles.itemTitleRight}>{proj.location ? proj.location + '  ' : ''}{proj.date}</Text>
                  </View>
                )}
                {proj.points && proj.points.map((pt, j) => (
                  <View key={j} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{pt}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* EXPERIENCE */}
        {d.experience && d.experience.length > 0 && (
          <View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            </View>
            {d.experience.map((exp, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitleLeft}>{exp.title} {exp.company ? `| ${exp.company}` : ''}</Text>
                  <Text style={styles.itemTitleRight}>{exp.date}</Text>
                </View>
                {exp.points && exp.points.map((pt, j) => (
                  <View key={j} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{pt}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {d.education && d.education.length > 0 && (
          <View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
            </View>
            {d.education.map((edu, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitleLeft}>{edu.degree} {edu.school ? `| ${edu.school}` : ''}</Text>
                  <Text style={styles.itemTitleRight}>{edu.date}</Text>
                </View>
                {edu.subtitle && (
                  <Text style={styles.itemSubtitleLeft}>{edu.subtitle}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS & AWARDS */}
        {d.certifications && d.certifications.length > 0 && (
          <View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>CERTIFICATIONS & AWARDS</Text>
            </View>
            {d.certifications.map((cert, i) => (
              <View key={i} style={styles.itemBlock}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitleLeft}>{cert.title}</Text>
                  <Text style={styles.itemTitleRight}>{cert.date}</Text>
                </View>
                {cert.issuer && (
                  <Text style={styles.itemSubtitleLeft}>{cert.issuer}</Text>
                )}
                {cert.points && cert.points.map((pt, j) => (
                  <View key={j} style={styles.bulletRow}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{pt}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
};
